import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/Carousel.less";

const CAROUSEL_TIMING_MS = 4000;

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };
  }
  render() {
    const { classes, images, title } = this.props;
    const { index } = this.state;
    const image = images[index];

    return (
      <div className={classes.carousel()}>
        <ReactCSSTransitionGroup
          transitionName="anim_fadeIn"
          component="div"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>

        <div className={classes.item()} key={image}>
          <img className={classes.itemImg()} src={image} alt={title} />
        </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
  componentDidMount() {
    this._startCarousel();
  }
  componentWillUnmount() {
    this._stopCarousel();
  }
  _startCarousel() {
    const { images } = this.props;

    if (images.length <= 1) {
      return;
    }

    this._interval = setInterval(() => {
      const { index } = this.state;

      this.setState({ index: (index + 1) % images.length });
    }, CAROUSEL_TIMING_MS);
  }
  _stopCarousel() {
    clearInterval(this._interval);
  }
}

Carousel.propTypes = {
  images: React.PropTypes.arrayOf(
    React.PropTypes.string
  ).isRequired,
  title: React.PropTypes.string.isRequired,
};

Carousel = connectStyles(Carousel, styles);

export default Carousel;
