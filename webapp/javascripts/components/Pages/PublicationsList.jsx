import React from "react";
import _ from "lodash";
import { Component } from "utils/react-extras.js";
import { connect as routerConnect } from "utils/react-router-extras.js";
import { connect as apiConnect } from "utils/api.js";
import { connect as translationsConnect } from "utils/translations.js";
import { PUBLICATION_TYPES } from "config/constants.js";
import { DEFAULT_PUBLICATION_IMAGE } from "config/settings.js";
// Resources
import publications, {
  fetch as publicationsFetch,
} from "resources/publications.js";
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
import Icon from "components/Base/Icon.jsx";
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
      publication_type: publicationType,
    } = publication;
    const imgSrc = attachments.length > 0 ?
      attachments[0] :
      DEFAULT_PUBLICATION_IMAGE;

    return (
      <ListItem
        imgSrc={imgSrc}
        imgAlt={petName}
        to={`/p/${publication.slug}`}>

        <ListItemTitle>
          {petName}
          {" "}<TypeTag type={publicationType}>
            {t(`models.publication.publication_types.${publicationType}`)}
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

    return (
      <Root displayToggler={true}>
        <Section>
          <SectionHeader>
            <ButtonGroup>
              <ButtonGroupItem
                active={!publicationType}
                to="/">

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
            <List
              emptyText={t("main.index.empty_publication_list")}
              loading={publications.state === "loading"}>

              {
                publications.state === "fetched" &&
                  _.map(publications.data.items, (publication) => {
                    return (
                      <PublicationItem
                        publication={publication}
                        key={publication.slug} />
                    );
                  })
              }
            </List>
          </SectionContent>
        </Section>
      </Root>
    );
  }
}

PublicationList = translationsConnect(PublicationList);

PublicationList = apiConnect(PublicationList, {
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

PublicationList = routerConnect(PublicationList);

export default PublicationList;