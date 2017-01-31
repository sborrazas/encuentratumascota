import React from "react";
import _ from "lodash";
import { Component } from "utils/react-extras.js";
import { connect as translationsConnect } from "utils/translations.js";
import BaseField from "components/Base/Field.jsx";

const DEFAULT_ERRORS = [];
const FORM_NAMESPACE = "payload";

class Field extends Component {
  render() {
    const {
      form: {
        data,
        errors,
        name: formName,
        update,
      },
      name,
      t,
      ...rest,
    } = this.props;
    const errorMessages = errors[name] &&
      errors[name].length > 0 &&
      _.map(errors, (error) => t(`errors.${error}`));

    return (
      <BaseField
        errors={errorMessages || DEFAULT_ERRORS}
        id={`${formName}_${name}`}
        name={`${FORM_NAMESPACE}[${name}]`}
        onChange={update(name)}
        value={data[name]}
        {...rest} />
    );
  }
}

Field.propTypes = {
  form: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
    update: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object.isRequired,
  }).isRequired,
  name: React.PropTypes.string.isRequired,
};

Field = translationsConnect(Field);

export default Field;
