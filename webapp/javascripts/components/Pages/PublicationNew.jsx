import React from "react";
import { connect } from "react-redux";
import { connectApi } from "redux-apimap";
import { Component } from "utils/react-extras.js";
import { connect as routerConnect } from "utils/react-router-extras.js";
import { connect as translationsConnect } from "utils/translations.js";
import { connect as formConnect } from "utils/form.js";
// Resources
import { selectBreeds } from "resources/breeds/index.js";
// Components
import Root from "../Root.jsx";
import Form, {
  Note as FormNote
} from "components/shared/Form.jsx";
import Field from "components/shared/Field.jsx";
import Button from "components/Base/Button.jsx";
import Section, {
  Header as SectionHeader,
  HeaderTitle as SectionHeaderTitle,
  Content as SectionContent,
} from "components/Base/Section.jsx";
import NavBar, {
  Item as NavBarItem,
} from "components/Base/NavBar.jsx";

const MAX_ATTACHMENTS = 5;

class PublicationNew extends Component {
  render() {
    const {
      breeds,
      createPublication,
      publications,
      t,
    } = this.props;
    const { data: formData } = createPublication;
    const typeOptions = [
      { value: "adoption", label: t("models.publication.types.adoption") },
      { value: "lost", label: t("models.publication.types.lost") },
      { value: "found", label: t("models.publication.types.found") }
    ];
    const sexOptions = [
      { value: "male", label: t("models.publication.sexes.male") },
      { value: "female", label: t("models.publication.sexes.female") },
      { value: "unknown", label: t("models.publication.sexes.unknown") }
    ];
    const currentMarker = formData.lat && {
      lat: formData.lat,
      lng: formData.lng,
    };
    let breedsOptions = [];
    let flash;

    if (breeds.loaded) {
      breedsOptions = breeds.data.items.map((breed) => {
        return { value: breed.id, label: breed.name };
      });
      breedsOptions.unshift({ value: "", label: "—" });
    }

    if (createPublication.errors.lat) { // User didn't place marker
      flash = {
        type: "error",
        title: t("main.index.publication_form.select_location_title"),
        message: t("main.index.publication_form.select_location"),
      };
    }
    else if (!currentMarker) {
      flash = {
        type: "info",
        title: t("main.index.publication_form.click_on_map_title"),
        message: t("main.index.publication_form.click_on_map"),
      };
    }

    return (
      <Root
        currentMarker={currentMarker}
        displayToggler={true}
        flash={flash}
        onCurrentMarkerSet={this._setCurrentMarker}>

        <Section>
          <SectionHeader>
            <SectionHeaderTitle>
              {t("main.index.new_publication_title")}
            </SectionHeaderTitle>
          </SectionHeader>

          <SectionContent>
            <Form
              form={createPublication}
              onSubmit={this._createPublication}
              onSuccess={this._goToPublication}>

              <Field
                form={createPublication}
                name="pet_name"
                type="text"
                label={t("models.publication.pet_name.label")}
                required={true}
                placeholder={t("models.publication.pet_name.placeholder")} />

              <Field
                form={createPublication}
                name="type"
                type="select"
                label={t("models.publication.type.label")}
                required={true}
                options={typeOptions} />

              <Field
                addText={t("main.index.publication_form.add_image")}
                form={createPublication}
                name="attachments"
                type="uploader"
                maxFiles={MAX_ATTACHMENTS}
                label={t("models.publication.attachments.label")} />

              <Field
                form={createPublication}
                name="sex"
                type="select"
                label={t("models.publication.sex.label")}
                required={true}
                options={sexOptions} />

              <Field
                form={createPublication}
                name="breed_id"
                type="select"
                label={t("models.publication.breed.label")}
                required={true}
                options={breedsOptions} />

              <Field
                form={createPublication}
                name="description"
                type="textarea"
                label={t("models.publication.description.label")}
                required={true}
                placeholder={t("models.publication.description.placeholder")} />

              <Field
                form={createPublication}
                name="lost_on"
                type="date"
                required={true}
                label={t("models.publication.lost_on.label")} />

              <Field
                form={createPublication}
                name="reward"
                type="text"
                label={t("models.publication.reward.label")}
                placeholder={t("models.publication.reward.placeholder")} />

              <Field
                form={createPublication}
                name="contact"
                type="text"
                label={t("models.publication.contact.label")}
                required={true}
                placeholder={t("models.publication.contact.placeholder")} />

              <NavBar importance={true}>
                <NavBarItem importance={2}>
                  <Button important={true} secondary={true}>
                    {t("main.index.publication_submit")}
                  </Button>
                </NavBarItem>
                <NavBarItem importance={1}>
                  <Button important={true} to={{ name: "home" }}>
                    {t("main.index.publication_cancel")}
                  </Button>
                </NavBarItem>
              </NavBar>

              <FormNote>
                {t("main.index.publication_disclaimer")}
              </FormNote>
            </Form>
          </SectionContent>
        </Section>
      </Root>
    );
  }
  componentWillMount() {
    const { api } = this.props;

    api.breeds.fetch();
  }
  _createPublication(params) {
    const { api } = this.props;

    return api.publications.create(params);
  }
  _goToPublication(publication) {
    const { goTo } = this.props;

    goTo(`/p/${publication.slug}`);
  }
  _setCurrentMarker(coords) {
    const { createPublication } = this.props;

    createPublication.updateAll(coords);
  }
}

PublicationNew = translationsConnect(PublicationNew);

PublicationNew = formConnect(PublicationNew, {
  createPublication: {
    name: "create_publication",
    initial: {
      attachments: [],
      breed_id: "",
      contact: "",
      description: "",
      lat: null,
      lng: null,
      lost_on: "",
      pet_name: "",
      type: "lost",
      reward: "",
      sex: "male",
    },
  },
});

PublicationNew = connect((state) => {
  return {
    breeds: selectBreeds(state),
  };
})(connectApi(PublicationNew));

PublicationNew = routerConnect(PublicationNew);

export default PublicationNew;
