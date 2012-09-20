var Petfinder = (function () {
    "use strict";

    return {

        map : null,

        initMap: function(){

            this.map = new GMaps({
                div: '#main-panel',
                lat: -34.90649,
                lng: -56.16348,
                zoom: 14
            });

        this.populateMarkers();

        },

        geoLocate: function(){

            GMaps.geolocate({
                success: function(position) {
                    
                    Petfinder.map.setCenter(position.coords.latitude, position.coords.longitude);
                    
                    Petfinder.map.addMarker({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        icon: 'img/home.png'
                    });

                },
                error: function(error) {
                    
                },
                not_supported: function() {
                    
                },
                always: function() {
                    
                }
            });
        },

        populateMarkers: function(){

            var pins = [{lat: -34.90774,  lng: -56.17355},
                        {lat: -34.91170,  lng: -56.16460},
                        {lat: -34.90600,  lng: -56.16190},
                        {lat: -34.92600,  lng: -56.16590},
                        {lat: -34.90600,  lng: -56.16391},
                        {lat: -34.90600,  lng: -56.16392},
                        {lat: -34.97600,  lng: -56.16820},
                        {lat: -34.914543, lng: -56.167560}];

            for (var i = 0; i < pins.length; i++) {

                this.map.addMarker({
                    lat: pins[i].lat,
                    lng: pins[i].lng,
                    icon: i % 3 === 0 ? 'img/lost.png' : 'img/found.png'
                });
                
            }

        }
    

    }; //end Module

})();


$(document).ready(function($) {


        Petfinder.initMap();
        Petfinder.geoLocate();

});
