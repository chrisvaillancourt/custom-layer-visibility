"use strict"

window.onload = event => {
  map();
};

function map() {
  require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/LayerList"
  ],
    function (Map, MapView, FeatureLayer, LayerList) {
      let map = new Map({
        basemap: "gray-vector"
      });
      let view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 4,
        center: [-97, 39] // longitude, latitude
      });
      let counties = new FeatureLayer({
        portalItem: {
          id: "7566e0221e5646f99ea249a197116605"
        },
        visible: true,
        id: "counties"
      });
      let states = new FeatureLayer({
        portalItem: {
          id: "99fd67933e754a1181cc755146be21ca"
        },
        visible: false,
        id: "states"
      });
      let layerList = new LayerList({
        view: view
      });

      // add layers to map
      map.addMany([states, counties]);

      view.when(function () {
        // wait until view is ready, then add layerList widget to the top right of the UI
        view.ui.add(layerList, "top-right");
        counties.watch("visible", function (visible) {
          if (visible) {
            states.visible = false;
          }
        });
        states.watch("visible", function (visible) {
          if (visible) {
            counties.visible = false;
          }
        });
      });
    });
};
