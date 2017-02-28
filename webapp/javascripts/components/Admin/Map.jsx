import React from "react";
import _ from "lodash";
import { Component } from "utils/react-extras.js";
import global from "utils/global.js";
import Map, { Marker } from "components/Base/Map.jsx";

const MY_PET_PIN = "/images/my-pet-big.png";

class PublicationsMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMarker: {
        lat: global.parseFloat(props.data.lat),
        lng: global.parseFloat(props.data.lng),
      },
    };
  }
  render() {
    const { currentMarker } = this.state;
    const { data: { name } } = this.props;

    return (
      <div>
        <div className="field-input field-input--map">
          <Map onClick={this._setCurrentMarker} initialCoords={currentMarker}>
            {
              currentMarker &&
                (
                  <Marker
                    icon={MY_PET_PIN}
                    draggable={true}
                    onDragEnd={this._setCurrentMarker}
                    {...currentMarker} />
                )
            }
          </Map>
          <input type="hidden" name={`${name}[lat]`} value={currentMarker.lat} />
          <input type="hidden" name={`${name}[lng]`} value={currentMarker.lng} />
        </div>
      </div>
    );
  }
  _setCurrentMarker(coords) {
    this.setState({ currentMarker: coords });
  }
}

export default PublicationsMap;
