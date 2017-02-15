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
} from "resources/publication/actions.js";
import auth, {
  fetch as authFetch,
} from "resources/auth/actions.js";
// Components
import Root from "../Root.jsx";
import TypeTag from "components/Base/TypeTag.jsx";
import Loader from "components/Base/Loader.jsx";
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
import { ST_USERNAME } from "config/settings.js";
import {
  DEFAULT_PUBLICATION_IMG,
  PUBLICATION_URL,
} from "config/constants.js";

const DEFAULT_ATTACHMENTS = [DEFAULT_PUBLICATION_IMG];

class RawDetail extends Component {
  render() {
    const {
      inquiry,
      onRequestContactInfo,
      publication,
      t,
    } = this.props;
    const attachments = publication.attachments.length > 0 ?
      publication.attachments :
      DEFAULT_ATTACHMENTS;
    const type = publication.type;
    const url = `${PUBLICATION_URL}/${publication.slug}`;
    const title = _.join([
      publication.pet_name,
      `[${t(`models.publication.types.${type}`).toUpperCase()}]`
    ], " ");

    return (
      <Details>
        <NavBar>
          <NavBarItem>
            <Link to={{ name: "home" }}>
              <Icon name="arrowLeft" /> {t("shared.back")}
            </Link>
          </NavBarItem>
        </NavBar>

        <Carousel images={attachments} title={publication.pet_name} />

        <DetailsTitle>
          {publication.pet_name}
          {" "}<TypeTag type={type}>
            {t(`models.publication.types.${type}`)}
          </TypeTag>
        </DetailsTitle>
        <DetailsDescription>
          {publication.description}
        </DetailsDescription>
        <DetailsMeta>
          <DetailsMetaItem
            label={t("models.publication.breed.label")}
            value={publication.breed} />
          <DetailsMetaItem
            label={t("models.publication.lost_on.label")}
            value={publication.lost_on} />
          <DetailsMetaItem
            label={t("models.publication.sex.label")}
            value={t(`models.publication.sexes.${publication.sex}`)} />
          <DetailsMetaItem
            label={t("models.publication.reward.label")}
            value={publication.reward} />
        </DetailsMeta>
        <DetailsSocial>
          {
            _.map(["twitter", "facebook", "email"], (service) => {
              return (
                <DetailsSocialItem
                  description={publication.description}
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
                    onClick={onRequestContactInfo}
                    secondary={true}>

                   {t("main.index.request_contact_info")}
                  </Button>
                </NavBarItem>
              </NavBar>
            )
        }
      </Details>
    );
  }
}

RawDetail.propTypes = {
  inquiry: React.PropTypes.object.isRequired,
  onRequestContactInfo: React.PropTypes.func.isRequired,
  publication: React.PropTypes.object.isRequired,
};

RawDetail = translationsConnect(RawDetail);

class PublicationDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { inquiry: { state: "uninitialized" } };
  }
  render() {
    const {
      publication,
      params: { publicationSlug },
      t,
    } = this.props;
    const { inquiry } = this.state;

    let content;

    if (publication.state !== "fetched") {
      content = (<Loader message={t("shared.loading")} />);
    }
    else {
      content = (
        <RawDetail
          inquiry={inquiry}
          onRequestContactInfo={this._displayContactInfo}
          publication={publication.data} />
      );
    }

    return (
      <Root selectedSlug={publicationSlug}>
        <Section>
          <SectionContent ignoreHeader={true}>
            {content}
          </SectionContent>
        </Section>
      </Root>
    );
  }
  _displayContactInfo() {
    const { auth, goTo, publication } = this.props;
    const { inquiry: { state } } = this.state;

    if (auth.data.signed_in) {
      if (state !== "fetching") {
        publication.inquiry.submit({}).then((inquiry) => {
          this.setState({
            inquiry: { text: inquiry.contact, state: "fetched" },
          });
        });
      }
      this.setState({ inquiry: { state: "fetching" } });
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
