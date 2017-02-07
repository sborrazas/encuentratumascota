import React from "react";
import { Link } from "utils/react-router-extras.js";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import domOn from "utils/dom/on.js";
import domDimensions from "utils/dom/dimensions.js";
import styles from "styles/List.less";
import Icon from "./Icon.jsx";

const IMG_SIZE = 80;

class List extends Component {
  render() {
    const { classes, children, emptyText } = this.props;
    const empty = children.length === 0;
    const className = classes.list({
      empty,
    });

    if (empty) {
      return (
        <div className={className}>
          <Icon className={classes.emptyStateIcon()} name="paw" />
          {emptyText}
        </div>
      );
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

List.propTypes = {
  emptyText: React.PropTypes.string.isRequired,
};

List = connectStyles(List, styles);

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: "initial",
      height: "initial",
      top: 0,
      left: 0,
    };
  }
  render() {
    const {
      children,
      classes,
      imgAlt,
      imgSrc,
      to,
    } = this.props;
    const imgStyle = this.state;

    return (
      <Link
        className={classes.item()}
        to={to}>

        <div className={classes.itemFigure()}>
          <img
            className={classes.itemImg()}
            alt={imgAlt}
            src={imgSrc}
            ref="image"
            style={imgStyle} />
        </div>

        {children}
      </Link>
    );
  }
  componentDidMount() {
    const { image } = this.refs;

    this._imgLoadHandler = domOn(image, "load", () => {
      this._resizeImg();
    });

    if (image.complete && image.naturalHeight > 0) {
      this._resizeImg();
    }
  }
  componentWillUnmount() {
    this._imgLoadHandler.remove();
  }
  _resizeImg() {
    const { image } = this.refs;
    const newState = {};
    const dimensions = domDimensions(image);

    let newHeight;
    let newWidth;

    if (dimensions.width < dimensions.height) {
      newState.width = IMG_SIZE;

      newHeight = (dimensions.height / dimensions.height) * IMG_SIZE;
      newState.spaceTop = (IMG_SIZE - newHeight) / 2;
    }
    else {
      newState.height = IMG_SIZE;

      newWidth = (dimensions.width / dimensions.height) * IMG_SIZE;
      newState.spaceLeft = (IMG_SIZE - newWidth) / 2;
    }

    this.setState(newState);
  }
}

Item.propTypes = {
  imgAlt: React.PropTypes.string.isRequired,
  imgSrc: React.PropTypes.string.isRequired,
};

Item = connectStyles(Item, styles);

class ItemTitle extends Component {
  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.itemTitle()}>
        {children}
      </div>
    );
  }
}

ItemTitle = connectStyles(ItemTitle, styles);

class ItemDescription extends Component {
  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.itemDescription()}>
        {children}
      </div>
    );
  }
}

ItemDescription = connectStyles(ItemDescription, styles);

class ItemDetails extends Component {
  render() {
    const { children, classes } = this.props;

    return (
      <ul className={classes.itemDetails()}>
        {children}
      </ul>
    );
  }
}

ItemDetails = connectStyles(ItemDetails, styles);

class ItemDetail extends Component {
  render() {
    const { children, classes, icon } = this.props;

    return (
        <li className={classes.itemDetail()}>
        {
          icon && (
            <Icon className={classes.itemDetailIcon()} name={icon} />
          )
        }
        {children}
      </li>
    );
  }
}

ItemDetail = connectStyles(ItemDetail, styles);

export default List;
export { Item, ItemTitle, ItemDescription, ItemDetails, ItemDetail };
