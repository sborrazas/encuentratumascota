import React from "react";
import _ from "lodash";
import md5 from "md5";
import { connect as routerConnect } from "utils/react-router-extras.js";
import { Component } from "utils/react-extras.js";
import document from "utils/dom/document.js";
import serializer from "utils/serializer.js";
import { connect as apiConnect } from "utils/api.js";
import { connect as translationsConnect } from "utils/translations.js";
import global from "utils/global.js";
// Resources
import auth, {
  fetch as authFetch,
  country as authCountry,
  signout as authSignout,
} from "resources/auth.js";
import publications, {
  fetch as publicationsFetch,
} from "resources/publications.js";
// Components
import MainHeader, {
  Dropdown as MainHeaderDropdown,
  DropdownOption as MainHeaderDropdownOption,
  Nav as MainHeaderNav,
  NavItem as MainHeaderNavItem,
} from "components/Base/MainHeader.jsx";
import Layout, {
  Body as LayoutBody,
  Sidebar as LayoutSidebar,
  Content as LayoutContent,
} from "components/Base/Layout.jsx";
import Dropdown, {
  Option as DropdownOption,
} from "components/Base/Dropdown.jsx";
import Button from "components/Base/Button.jsx";
import SocialButton from "components/Base/SocialButton.jsx";
import SignIn from "components/Pages/modals/SignIn.jsx";
import SignUp from "components/Pages/modals/SignUp.jsx";
import PublicationsMap from "components/shared/PublicationsMap.jsx";

const MAP_RESIZE_ANIMATION_DURATION = 400;

const COUNTRIES = { // TODO: move to config
  "UY": {
    "name": "Uruguay",
    "lat": -34.894802,
    "lng": -56.165034,
  },
  "PE": {
    "name": "Perú",
    "lat": -12.047620,
    "lng": -77.061620,
  },
  "AR": {
    "name": "Argentina",
    "lat": -34.622958,
    "lng": -58.38077,
  },
  "CL": {
    "name": "Chile",
    "lat": -33.46912,
    "lng": -70.641997,
  },
};

const DEFAULT_USER_IMG = "/assets/default_user.png";

class Root extends Component {
  constructor(props) {
    super(props);

    this.state = { sidebarHidden: false };
  }
  render() {
    const {
      auth,
      children,
      currentMarker,
      displayToggler,
      flash,
      query,
      publications,
      onCurrentMarkerSet,
      selectedSlug,
      t,
    } = this.props;
    const { sidebarHidden } = this.state;
    const user = auth.state === "fetched" && auth.data.user;
    const newPublicationTo = user ?
          { name: "publicationsNew" } :
          { q: { sign_in: "1", ...query } };
    const countryCode = auth.state === "fetched" && auth.data.country_code;
    const country = countryCode && COUNTRIES[countryCode];

    let modal;
    let sessionNavEl;
    let userImgSrc;

    if (query.sign_in) {
      modal = (<SignIn />);
    }
    else if (query.sign_up) {
      modal = (<SignUp />);
    }

    if (user) {
      if (user.img) {
        userImgSrc = user.img;
      }
      else {
        const hash = md5(user.email);
        const location = document.location;
        const defaultImg = serializer.encodeURI(
          `${location.protocol}//${location.hostname}/${DEFAULT_USER_IMG}`
        );

        userImgSrc = `//www.gravatar.com/avatar/${hash}?d=${defaultImg}`;
      }

      sessionNavEl = (
        <MainHeaderDropdown imgSrc={userImgSrc} title={user.username}>
          <MainHeaderDropdownOption to="/admin">
            {t("admin.my_publications")}
          </MainHeaderDropdownOption>
          <MainHeaderDropdownOption onClick={this._signOut}>
            {t("general.nav.sign_out")}
          </MainHeaderDropdownOption>
        </MainHeaderDropdown>
      );
    }
    else {
      sessionNavEl = (
        <MainHeaderNavItem to="/?sign_in=1">
          {t("general.nav.sign_in")}
        </MainHeaderNavItem>
      );
    }

    return (
      <Layout
        sidebarHidden={sidebarHidden}
        modal={modal}
        onOverlayClick={this._closeModal}>

        <MainHeader
          logo="/images/logo.png"
          tagline={t("general.tagline")}
          title={t("general.name")}
          toHome={{ name: "home" }}
          user={user}>

          <MainHeaderNav>
            {
              country &&
                (
                  <MainHeaderNavItem block={true}>
                    <Dropdown
                      icon={countryCode}
                      label={country.name}>

                      {
                        _.map(COUNTRIES, (country, code) => {
                          if (code === auth.data.country_code) {
                            return;
                          }
                          else {
                            return (
                              <DropdownOption
                                icon={code}
                                key={code}
                                label={country.name}
                                onClick={this._selectCountry}
                                value={code} />
                            );
                          }
                        })
                      }
                    </Dropdown>
                  </MainHeaderNavItem>
                )
            }
            <MainHeaderNavItem to="/how-it-works">
              {t("general.nav.how_it_works")}
            </MainHeaderNavItem>
            <MainHeaderNavItem
              blank={true}
              to="mailto:encuentratumascotaorg@gmail.com">

              {t("general.nav.contact")}
            </MainHeaderNavItem>
            <MainHeaderNavItem social={true}>
              <SocialButton
                external={true}
                label="general.nav.twitter"
                to="https://twitter.com/ETMUruguay"
                type="twitter" />
            </MainHeaderNavItem>
            <MainHeaderNavItem social={true}>
              <SocialButton
                external={true}
                label="general.nav.facebook"
                to="http://facebook.com/ETMUruguay"
                type="facebook" />
            </MainHeaderNavItem>
          </MainHeaderNav>
          <MainHeaderNav secondary={true}>
            <MainHeaderNavItem action={true}>
              <Button to={newPublicationTo} primary={true}>
                {t("general.nav.new_publication")}
              </Button>
            </MainHeaderNavItem>
            {sessionNavEl}
          </MainHeaderNav>
        </MainHeader>
        <LayoutBody>
          <LayoutSidebar onToggle={displayToggler && this._toggleSidebar}>
            {children}
          </LayoutSidebar>
          <LayoutContent flash={flash}>
            <PublicationsMap
              onMapCreated={this._setMap}
              currentMarker={currentMarker}
              editing={!! onCurrentMarkerSet}
              onCurrentMarkerSet={onCurrentMarkerSet}
              publications={publications}
              selectedSlug={selectedSlug} />
          </LayoutContent>
        </LayoutBody>
      </Layout>
    );
  }
  componentDidUpdate() {
    const { auth, goTo, query, pathname } = this.props;

    if (auth.state === "fetched" &&
        auth.data.signed_in &&
        (query.sign_up || query.sign_in)) {

      goTo(pathname);
    }
  }
  _setMap(map) {
    this.map = map;
  }
  _selectCountry(code) {
    const { auth } = this.props;

    auth.country.submit({ country_code: code });
  }
  _signOut() {
    const { auth } = this.props;

    auth.signout.submit();
  }
  _closeModal() {
    const { goTo, query } = this.props;

    goTo({
      pathname: "/",
      query: _.omit(query, ["sign_in", "sign_up"]),
    });
  }
  _toggleSidebar() {
    this.setState((state) => {
      return { sidebarHidden: !state.sidebarHidden };
    });

    // TODO: HACKS ON HACKS ON HACKS
    global.setTimeout(() => {
      global.google.maps.event.trigger(this.map, "resize");
    }, MAP_RESIZE_ANIMATION_DURATION);
  }
}

Root.propTypes = {
  displayToggler: React.PropTypes.bool,
};

Root = apiConnect(Root, {
  auth: {
    uri: auth,
    actions: {
      fetch: authFetch,
      country: authCountry,
      signout: authSignout,
    },
    autoFetch: true,
  },
  publications: {
    uri: publications,
    actions: {
      fetch: publicationsFetch,
    },
    autoFetch: true,
    variables: (props) => {
      return {
        type: props.query.type,
      };
    },
  },
});

Root = translationsConnect(Root);

Root = routerConnect(Root);

export default Root;
