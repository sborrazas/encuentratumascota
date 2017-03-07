import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { connectApi } from "redux-apimap";
import { Component } from "utils/react-extras.js";
import { connect as routerConnect } from "utils/react-router-extras.js";
import { connect as translationsConnect } from "utils/translations.js";
import { PUBLICATION_TYPES } from "config/constants.js";
import { DEFAULT_PUBLICATION_IMAGE } from "config/settings.js";
// Resources
import { selectPublicationsByType } from "resources/publications/index.js";
// Components
import Root from "../Root.jsx";
import TypeTag from "components/Base/TypeTag.jsx";
import List, {
  Item as ListItem,
  ItemTitle as ListItemTitle,
  ItemDescription as ListItemDescription,
  ItemDetails as ListItemDetails,
  ItemDetail as ListItemDetail,
} from "components/Base/List.jsx";
import ButtonGroup, {
  Item as ButtonGroupItem,
} from "components/Base/ButtonGroup.jsx";
import Loader from "components/Base/Loader.jsx";
import Section, {
  Header as SectionHeader,
  Content as SectionContent,
} from "components/Base/Section.jsx";

class PublicationItem extends Component {
  render() {
    const {
      t,
      publication,
    } = this.props;
    const {
      attachments,
      pet_name: petName,
      type: publicationType,
    } = publication;
    const imgSrc = attachments.length > 0 ?
      attachments[0] :
      DEFAULT_PUBLICATION_IMAGE;

    return (
      <ListItem
        imgSrc={imgSrc}
        imgAlt={petName}
        to={{ name: "publication", p: { slug: publication.slug } }}>

        <ListItemTitle>
          {petName}
          {" "}<TypeTag type={publicationType}>
            {t(`models.publication.types.${publicationType}`)}
          </TypeTag>
        </ListItemTitle>
        <ListItemDescription>
          {publication.description}
        </ListItemDescription>
        <ListItemDetails>
          <ListItemDetail icon="tag">
            {publication.breed}
          </ListItemDetail>
          <ListItemDetail icon="time">
            {publication.lost_on}
          </ListItemDetail>
        </ListItemDetails>
      </ListItem>
    );
  }
}

PublicationItem = translationsConnect(PublicationItem);

class PublicationList extends Component {
  render() {
    const {
      publications,
      query: { type: publicationType },
      t,
    } = this.props;
    let content;

    if (publications.loaded) {
      content = (
        <List emptyText={t("main.index.empty_publication_list")}>
          {
            _.map(publications.data.items, (publication) => {
              return (
                <PublicationItem
                  publication={publication}
                  key={publication.slug} />
              );
            })
          }
        </List>
      );
    }
    else {
      content = (<Loader message={t("shared.loading")} />);
    }

    return (
      <Root displayToggler={true}>
        <Section>
          <SectionHeader>
            <ButtonGroup>
              <ButtonGroupItem
                active={!publicationType}
                to={{ name: "home" }}>

                {t("main.index.filters.all")}
              </ButtonGroupItem>
              {
                _.map(PUBLICATION_TYPES, (pType) => {
                  return (
                    <ButtonGroupItem
                      active={pType === publicationType}
                      to={{ q: { type: pType } }}
                      key={pType}>

                      {t(`main.index.filters.${pType}`)}
                    </ButtonGroupItem>
                  );
                })
              }
            </ButtonGroup>
          </SectionHeader>
          <SectionContent>
            {content}
          </SectionContent>
        </Section>
      </Root>
    );
  }
  componentWillMount() {
    const { api, query: { type } } = this.props;

    api.auth.fetch();
    api.publications.fetch({ type });
  }
}

PublicationList = translationsConnect(PublicationList);

PublicationList = connect((state, props) => {
  return {
    publications: selectPublicationsByType(state, props.query.type),
  };
})(connectApi(PublicationList));

PublicationList = routerConnect(PublicationList);

export default PublicationList;
