import React from "react";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import domAttr from "utils/dom/attr.js";
import global from "utils/global.js";
import styles from "styles/Details.less";

const SHARETHIS_RETRY_TIME = 3000;
const SHARETHIS_RETRIES = 10;

class Details extends Component {
  render() {
    const { classes, children } = this.props;

    return (
      <article className={classes.details()}>
        {children}
      </article>
    );
  }
}

Details = connectStyles(Details, styles);

class Title extends Component {
  render() {
    const { children, classes } = this.props;

    return (
      <h1 className={classes.title()}>
        {children}
      </h1>
    );
  }
}

Title = connectStyles(Title, styles);

class Description extends Component {
  render() {
    const { children, classes } = this.props;

    return (
      <p className={classes.description()}>
        {children}
      </p>
    );
  }
}

Description = connectStyles(Description, styles);

class Meta extends Component {
  render() {
    const { children, classes } = this.props;

    return (
      <ul className={classes.meta()}>
        {children}
      </ul>
    );
  }
}

Meta = connectStyles(Meta, styles);

class MetaItem extends Component {
  render() {
    const { classes, label, value } = this.props;

    if (value) {
      return (
        <li className={classes.metaItem()}>
          <span className={classes.metaLabel()}>{label}:</span>
          <span className={classes.metaValue()}>{value}</span>
        </li>
      );
    }
    else {
      return null;
    }
  }
}

MetaItem = connectStyles(MetaItem, styles);

class Social extends Component {
  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.social()}>
        {children}
      </div>
    );
  }
}

Social = connectStyles(Social, styles);

class SocialItem extends Component {
  render() {
    const { classes } = this.props;

    return (
      <span ref="element" className={classes.socialItem()} />
    );
  }
  componentDidMount() {
    this._retryShareThis(SHARETHIS_RETRIES);
  }
  _retryShareThis(retries) {
    if (retries > 0) {
      global.setTimeout(() => {
        const stWidget = global.stWidget;

        if (stWidget) {
          this._addShareThis(stWidget);
        }
        else {
          this._retryShareThis(retries - 1);
        }
      }, SHARETHIS_RETRY_TIME);
    }
  }
  _addShareThis(stWidget) {
    const {
      description,
      imageSrc,
      service,
      stUsername,
      title,
      url,
    } = this.props;
    const { element } = this.refs;

    domAttr.set(element, "st_via", stUsername);

    global.stWidget.addEntry({
      element,
      image: imageSrc,
      service,
      text: description,
      title,
      type: "hcount",
      url,
    }, { button: true });
  }
}

SocialItem.propTypes = {
  description: React.PropTypes.string.isRequired,
  imageSrc: React.PropTypes.string,
  service: React.PropTypes.string.isRequired,
  stUsername: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
};

SocialItem = connectStyles(SocialItem, styles);

export default Details;
export { Title, Description, Meta, MetaItem, Social, SocialItem };
