import React from "react";
import {
  Gmaps,
  Marker as GMarker
} from "react-gmaps";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import { GMAPS_API_KEY } from "config/settings.js";
import styles from "styles/Map.less";

const GMAPS_PARAMS = {
  key: GMAPS_API_KEY,
  v: "3.exp",
};

const DEFAULT_ZOOM = 12;

class Map extends Component {
  render() {
    const {
      children,
      classes,
      initialCoords,
      onMapCreated,
    } = this.props;

    return (
      <div className={classes.map()}>
        <Gmaps
          height="100%"
          lat={initialCoords.lat}
          lng={initialCoords.lng}
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
  initialCoords: React.PropTypes.shape({
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
  }).isRequired,
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
