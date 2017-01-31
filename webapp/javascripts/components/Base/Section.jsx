import React from "react";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/Section.less";

class Section extends Component {
  render() {
    const { children, classes } = this.props;

    return (
      <section className={classes.section()}>
        {children}
      </section>
    );
  }
}

Section = connectStyles(Section, styles);

class Header extends Component {
  render() {
    const { children, classes } = this.props;

    return (
      <header className={classes.header()}>
        {children}
      </header>
    );
  }
}

Header = connectStyles(Header, styles);

class HeaderTitle extends Component {
  render() {
    const { children, classes } = this.props;

    return (
      <h2 className={classes.headerTitle()}>
        {children}
      </h2>
    );
  }
}

HeaderTitle = connectStyles(HeaderTitle, styles);

class Content extends Component {
  render() {
    const { children, classes, ignoreHeader } = this.props;

    return (
      <div className={classes.content({ ignoreHeader })}>
        {children}
      </div>
    );
  }
}

Content.propTypes = {
  ignoreHeader: React.PropTypes.bool,
};

Content = connectStyles(Content, styles);

export default Section;
export { Content, Header, HeaderTitle };
