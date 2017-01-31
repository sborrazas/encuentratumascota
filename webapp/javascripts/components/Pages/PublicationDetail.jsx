import React from "react";
import _ from "lodash";
import { Component } from "utils/react-extras.js";
import { connect as routerConnect } from "utils/react-router-extras.js";
import { connect as apiConnect } from "utils/api.js";
import { connect as translationsConnect } from "utils/translations.js";
// Resources
import publication, {
  fetch as publicationFetch,
  inquiry as publicationInquiry,
} from "resources/publication.js";
import auth, {
  fetch as authFetch,
} from "resources/auth.js";
// Components
import Root from "../Root.jsx";
import TypeTag from "components/Base/TypeTag.jsx";
import Carousel from "components/Base/Carousel.jsx";
import Details, {
  Title as DetailsTitle,
  Description as DetailsDescription,
  Meta as DetailsMeta,
  MetaItem as DetailsMetaItem,
  Social as DetailsSocial,
  SocialItem as DetailsSocialItem,
} from "components/Base/Details.jsx";
import NavBar, {
  Item as NavBarItem,
} from "components/Base/NavBar.jsx";
import Button from "components/Base/Button.jsx";
import Icon from "components/Base/Icon.jsx";
import Section, {
  Content as SectionContent,
} from "components/Base/Section.jsx";
import Link from "components/Base/Link.jsx";
import { DEFAULT_PUBLICATION_IMAGE, ST_USERNAME } from "config/settings.js";

const DEFAULT_ATTACHMENTS = [DEFAULT_PUBLICATION_IMAGE];

class PublicationDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { inquiry: { state: "uninitialized" } };
  }
  render() {
    const {
      publication,
      t,
    } = this.props;
    const { inquiry } = this.state;

    if (publication.state !== "fetched") {
      return (<div>Loading</div>);
    }

    const publicationData = publication.data;
    const attachments = publicationData.attachments.length > 0 ?
          publicationData.attachments :
          DEFAULT_ATTACHMENTS;
    const type = publicationData.publication_type;
    // TODO hardcoded :(
    const url = `http://encuentratumascota.org/p/${publicationData.slug}`;
    const title = _.join([
      publicationData.pet_name,
      `[${t(`models.publication.publication_types.${type}`).toUpperCase()}]`
    ], " ");

    return (
      <Root selectedSlug={publicationData.slug}>
        <Section>
          <SectionContent ignoreHeader={true}>
            <Details>
              <NavBar>
                <NavBarItem>
                  <Link to="/">
                    <Icon name="arrowLeft" /> {t("shared.back")}
                  </Link>
                </NavBarItem>
              </NavBar>

              <Carousel images={attachments} title={publicationData.pet_name} />

              <DetailsTitle>
                {publicationData.pet_name}
                {" "}<TypeTag type={type}>
                  {t(`models.publication.publication_types.${type}`)}
                </TypeTag>
              </DetailsTitle>
              <DetailsDescription>
                {publicationData.description}
              </DetailsDescription>
              <DetailsMeta>
                <DetailsMetaItem
                  label={t("models.publication.breed.label")}
                  value={publicationData.breed} />
                <DetailsMetaItem
                  label={t("models.publication.lost_on.label")}
                  value={publicationData.lost_on} />
                <DetailsMetaItem
                  label={t("models.publication.sex.label")}
                  value={t(`models.publication.sexes.${publicationData.sex}`)} />
                <DetailsMetaItem
                  label={t("models.publication.reward.label")}
                  value={publicationData.reward} />
              </DetailsMeta>
              <DetailsSocial>
                {
                  _.map(["twitter", "facebook", "email"], (service) => {
                    return (
                      <DetailsSocialItem
                        description={publicationData.description}
                        imgSrc={attachments[0]}
                        key={service}
                        service={service}
                        stUsername={ST_USERNAME}
                        title={title}
                        url={url} t />
                    );
                  })
                }
              </DetailsSocial>
              {
                inquiry.state === "fetched" &&
                  (
                    <DetailsTitle>
                      {t("main.index.contact_info")}
                    </DetailsTitle>
                  )
              }
              {
                inquiry.state === "fetched" &&
                  (
                    <DetailsDescription>
                      {inquiry.text}
                    </DetailsDescription>
                  )
              }
              {
                inquiry.state === "uninitialized" &&
                  (
                    <NavBar>
                      <NavBarItem single={true}>
                        <Button
                          important={true}
                          onClick={this._displayContactInfo}
                          secondary={true}>

                         {t("main.index.request_contact_info")}
                        </Button>
                      </NavBarItem>
                    </NavBar>
                  )
              }
            </Details>
          </SectionContent>
        </Section>
      </Root>
    );
  }
  _displayContactInfo() {
    const { auth, goTo, publication } = this.props;
    const { inquiry: { state } } = this.state;

    if (auth.data.signed_in) {
      if (state !== "loading") {
        publication.inquiry.submit({}).then((inquiry) => {
          this.setState({
            inquiry: { text: inquiry.contact, state: "fetched" },
          });
        });
      }
      this.setState({ inquiry: { state: "loading" } });
    }
    else {
      goTo({
        pathname: "/p/${params.publicationSlug}",
        query: { sign_in: "1" },
      })
    }
  }
}

PublicationDetail = translationsConnect(PublicationDetail);

PublicationDetail = apiConnect(PublicationDetail, {
  publication: {
    uri: publication,
    actions: {
      fetch: publicationFetch,
      inquiry: publicationInquiry,
    },
    variables: (props) => {
      return {
        slug: props.params.publicationSlug,
      };
    },
    autoFetch: true,
  },
  auth: {
    uri: auth,
    actions: {
      fetch: authFetch,
    },
    autoFetch: true,
  },
});

PublicationDetail = routerConnect(PublicationDetail);

export default PublicationDetail;
