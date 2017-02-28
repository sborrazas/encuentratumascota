import React from "react";
import _ from "lodash";
import { Component } from "utils/react-extras.js";
import { connect as routerConnect } from "utils/react-router-extras.js";
import Map, { Marker } from "components/Base/Map.jsx";
import { COUNTRIES, PIN_IMAGES_MAP } from "config/constants.js";

class PublicationsMap extends Component {
  render() {
    const {
      currentMarker,
      countryCode,
      onCurrentMarkerSet,
      onMapCreated,
      publications,
      selectedSlug,
    } = this.props;

    return (
      <Map
        initialCoords={COUNTRIES[countryCode]}
        onClick={onCurrentMarkerSet}
        onMapCreated={onMapCreated}>
        {
          publications.loaded &&
            _.map(publications.data.items, (publication) => {
              const { lat, lng, type, slug } = publication;
              let imageKey = type;

              if (selectedSlug === slug) {
                imageKey += "_big";
              }

              return (
                <Marker
                  key={slug}
                  data={slug}
                  icon={PIN_IMAGES_MAP[imageKey]}
                  lat={lat}
                  lng={lng}
                  onClick={this._clickMarker} />
              );
            })
        }
        {
          currentMarker &&
            (
              <Marker
                icon={PIN_IMAGES_MAP.my_pet}
                draggable={true}
                onDragEnd={onCurrentMarkerSet}
                {...currentMarker} />
            )
        }
      </Map>
    );
  }
  _clickMarker(slug) {
    const { editing, goTo } = this.props;

    if (!editing) {
      goTo(`/p/${slug}`);
    }
  }
}

PublicationsMap.propTypes = {
  countryCode: React.PropTypes.oneOf(_.keys(COUNTRIES)).isRequired,
  currentMarker: React.PropTypes.shape({
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
  }),
  editing: React.PropTypes.bool,
  onCurrentMarkerSet: React.PropTypes.func,
  publications: React.PropTypes.object.isRequired, // TODO: Further specification?
  selectedSlug: React.PropTypes.string,
};

PublicationsMap = routerConnect(PublicationsMap);

export default PublicationsMap;
