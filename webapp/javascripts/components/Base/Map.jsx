import React from "react";
import {
  Gmaps,
  Marker as GMarker
} from "react-gmaps";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/Map.less";

// TODO: Move these configs
const API_KEY = "AIzaSyDb-hE0hwptuM7bzQpZtXhwwYkdQwyAEww";
// TODO: Make country-based default location
const DEFAULT_LOCATION = {
  lat: -34.910926,
  lng: -56.163123
};
const GMAPS_PARAMS = {
  key: API_KEY,
  v: "3.exp",
};

const DEFAULT_ZOOM = 12;

class Map extends Component {
  render() {
    const {
      children,
      classes,
      onMapCreated,
    } = this.props;

    return (
      <div className={classes.map()}>
        <Gmaps
          height="100%"
          lat={DEFAULT_LOCATION.lat}
          lng={DEFAULT_LOCATION.lng}
          onClick={this._click}
          params={GMAPS_PARAMS}
          onMapCreated={onMapCreated}
          width="100%"
          zoom={DEFAULT_ZOOM}>

          {children}
        </Gmaps>
      </div>
    );
  }
  _click(event) {
    const { onClick } = this.props;
    const { latLng } = event;

    if (onClick) {
      onClick({
        lat: latLng.lat(),
        lng: latLng.lng(),
      });
    }
  }
}

Map.propTypes = {
  onClick: React.PropTypes.func,
  onMapCreated: React.PropTypes.func,
};

Map = connectStyles(Map, styles);

class Marker extends Component {
  render() {
    return (
      <GMarker
        {...this.props}
        ref="marker"
        onClick={this._click}
        onDragEnd={this._dragEnd} />
    );
  }
  _click(event) {
    const { data, onClick } = this.props;

    if (onClick) {
      onClick(data);
    }
  }
  _dragEnd(event) {
    const { onDragEnd } = this.props;
    const { latLng } = event;

    if (onDragEnd) {
      onDragEnd({
        lat: latLng.lat(),
        lng: latLng.lng(),
      });
    }
  }
}

Marker.propTypes = {
  data: React.PropTypes.any,
  draggable: React.PropTypes.bool,
  icon: React.PropTypes.string,
  lat: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  lng: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  onClick: React.PropTypes.func,
  onDragEnd: React.PropTypes.func,
};

export default Map;
export { Marker };
