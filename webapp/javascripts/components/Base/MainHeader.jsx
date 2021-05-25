import React from "react";
import _ from "lodash";
import { Link } from "utils/react-router-extras.js";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/MainHeader.less";
import Icon from "./Icon.jsx";

class MainHeader extends Component {
  render() {
    const {
      classes,
      children,
      logo,
      tagline,
      title,
      toHome,
    } = this.props;

    return (
      <header className={classes.mainHeader()}>
        <Link to={toHome} title={title}>
        <img src={logo} className={classes.logo()} />
          <hgroup className={classes.titles()}>
            <h1>{title}</h1>
            <h2>{tagline}</h2>
          </hgroup>
        </Link>

        {children}
      </header>
    );
  }
}

MainHeader.propTypes = {
  logo: React.PropTypes.string.isRequired,
  tagline: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

MainHeader = connectStyles(MainHeader, styles);

class Nav extends Component {
  render() {
    const { children, classes, secondary } = this.props;
    const className = classes.nav({ secondary });

    return (
      <nav className={className}>
        {children}
      </nav>
    );
  }
}

Nav = connectStyles(Nav, styles);

class NavItem extends Component {
  render() {
    const { blank, block, children, classes, to, socialType } = this.props;
    const external = _.isString(to) || blank;
    const className = classes.navItem({
      block,
      link: !! to,
      facebook: socialType === "facebook",
      twitter: socialType === "twitter"
    });

    if (to) {
      if (external) {
        return (
          <a href={to} className={className} target={blank && "_blank"}>
            {children}
          </a>
        );
      }
      else {
        return (
          <Link className={className} to={to}>
            {children}
          </Link>
        );
      }
    }
    else {
      return (
        <div className={className}>
          {children}
        </div>
      );
    }
  }
}

NavItem.propTypes = {
  blank: React.PropTypes.bool,
  block: React.PropTypes.bool, // TODO: Hack
  external: React.PropTypes.bool,
  to: React.PropTypes.string,
  socialType: React.PropTypes.string
};

NavItem = connectStyles(NavItem, styles);

class Dropdown extends Component {
  render() {
    const { children, classes, imgSrc, title } = this.props;

    return (
      <div className={classes.navItem({ link: true })}>
        <img
          className={classes.dropdownImg()}
          src={imgSrc}
          alt={title} />
        <span className={classes.dropdownTitle()}>{title}</span>
        <Icon className={classes.dropdownCaret()} name="caret" />
        <div className={classes.dropdownOptions()}>
          {children}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  imgSrc: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

Dropdown = connectStyles(Dropdown, styles);

class DropdownOption extends Component {
  render() {
    const { children, classes, onClick, to } = this.props;
    const external = _.isString(to);

    if (onClick) {
      return (
        <div className={classes.dropdownOption()} onClick={this._click}>
          {children}
        </div>
      );
    }
    else if (external) {
      return (
        <a className={classes.dropdownOption()} href={to}>
          {children}
        </a>
      );
    }
    else {
      return (
        <Link className={classes.dropdownOption()} to={to}>
          {children}
        </Link>
      );
    }
  }
  _click(event) {
    const { onClick } = this.props;

    event.preventDefault();

    onClick();
  }
}

DropdownOption.propTypes = {
  to: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

DropdownOption = connectStyles(DropdownOption, styles);

export default MainHeader;
export { Dropdown, DropdownOption, Nav, NavItem };
