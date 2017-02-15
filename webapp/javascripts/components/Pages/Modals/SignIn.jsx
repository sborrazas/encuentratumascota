import React from "react";
import { connect as routerConnect } from "utils/react-router-extras.js";
import { connect as apiConnect } from "utils/api.js";
import { connect as translationsConnect } from "utils/translations.js";
import { connect as formConnect } from "utils/form.js";
import { Component } from "utils/react-extras.js";
// Resources
import auth, {
  fetch as authFetch,
  login as authLogin,
} from "resources/auth/actions.js";
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

class SignIn extends Component {
  render() {
    const {
      t,
      auth,
      signIn,
    } = this.props;

    return (
      <Modal>
        <ModalBody>
          <Form form={signIn} action={auth.login}>
            <Field
              form={signIn}
              name="email"
              type="text"
              label={t("models.user.email_or_username.label")}
              placeholder={t("models.user.email_or_username.placeholder")}
              required={true} />

            <Field
              form={signIn}
              type="password"
              name="password"
              label={t("models.user.password.label")}
              placeholder={t("models.user.password.placeholder")}
              required={true} />

            <Button primary={true} important={true}>
              {t("main.index.session_form.submit")}
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
            {t("main.index.session_form.sign_up_alternative")}
            {" "}<Link to={{ q: { sign_up: "t" } }}>
              {t("main.index.session_form.sign_up")}
            </Link>
          </NavBar>
        </ModalFooter>
      </Modal>
    );
  }
}

SignIn = translationsConnect(SignIn);

SignIn = formConnect(SignIn, {
  signIn: {
    name: "sign_in",
    initial: {
      email: "",
      password: "",
    },
  },
});

SignIn = apiConnect(SignIn, {
  auth: {
    uri: auth,
    actions: {
      fetch: authFetch,
      login: authLogin,
    },
  },
});

SignIn = routerConnect(SignIn);

export default SignIn;
