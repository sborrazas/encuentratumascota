import React from "react";
import { connectApi } from "redux-apimap";
import { connect as routerConnect } from "utils/react-router-extras.js";
import { connect as translationsConnect } from "utils/translations.js";
import { connect as formConnect } from "utils/form.js";
import { Component } from "utils/react-extras.js";
// Resources
import { selectAuth } from "resources/auth/index.js";
// Components
import Form from "components/shared/Form.jsx";
import Field from "components/shared/Field.jsx";
import Modal, {
  Body as ModalBody,
  Footer as ModalFooter,
} from "components/Base/Modal.jsx";
import NavBar, {
  Item as NavBarItem
} from "components/Base/NavBar.jsx";
import SocialButton from "components/Base/SocialButton.jsx";
import Link from "components/Base/Link.jsx";
import Button from "components/Base/Button.jsx";

class SignUp extends Component {
  render() {
    const {
      t,
      auth,
      signUp,
    } = this.props;

    return (
      <Modal>
        <ModalBody>
          <Form form={signUp} onSubmit={this._create}>
            <Field
              form={signUp}
              name="email"
              type="text"
              label={t("models.user.email.label")}
              placeholder={t("models.user.email.placeholder")}
              required={true} />

            <Field
              form={signUp}
              name="password"
              type="password"
              label={t("models.user.password.label")}
              placeholder={t("models.user.password.placeholder")}
              required={true} />

            <Field
              form={signUp}
              type="text"
              name="private_username"
              label={t("models.user.private_username.label")}
              placeholder={t("models.user.private_username.placeholder")}
              required={true} />

            <Button primary={true} important={true}>
              {t("main.index.registration_form.submit")}
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter separator={t("main.index.log_in_alternative")}>
          <NavBar center={true}>
            <NavBarItem>
              <SocialButton
                to="/auth/facebook"
                type="facebook">

                Facebook
              </SocialButton>
            </NavBarItem>
            <NavBarItem>
              <SocialButton
                to="/auth/twitter"
                type="twitter">

                Twitter
              </SocialButton>
            </NavBarItem>
          </NavBar>
          <NavBar center={true}>
            {t("main.index.registration_form.sign_in_alternative")}
            {" "}<Link to={{ q: { sign_in: "t" } }}>
              {t("main.index.registration_form.sign_in")}
            </Link>
          </NavBar>
        </ModalFooter>
      </Modal>
    );
  }
  _create(params) {
    const { api } = this.props;

    return api.auth.create(params);
  }
}

SignUp = translationsConnect(SignUp);

SignUp = connectApi(SignUp);

SignUp = formConnect(SignUp, {
  signUp: {
    name: "sign_up",
    initial: {
      email: "",
      private_username: "",
      password: "",
    },
  },
});

SignUp = routerConnect(SignUp);

export default SignUp;
