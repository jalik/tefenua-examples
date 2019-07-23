// Initialise la carte TeFenua quand le DOM est prêt.
document.addEventListener('DOMContentLoaded', function () {
  // Prépare la couche TeFenua.
  var tefenuaLayer = createTeFenuaLayer();

  // Prépare la couche des marqueurs.
  var markerLayer = createMarkerLayer();

  // Prépare la couche des batiments.
  var batimentLayer = createBatimentLayer();

  // Prépare la carte OpenLayers.
  var map = createDefaultMap([
    tefenuaLayer,
    batimentLayer,
    markerLayer,
  ]);

  // Récupère la vue de carte.
  var mapView = map.getView();

  // Prépare l'interpréteur GEOJSON.
  var geojson = new ol.format.GeoJSON();

  // Surveille les clics sur la carte.
  map.on('click', function (ev) {
    console.log('clicked @:', ev.coordinate);

    // Ajoute un marqueur à l'endroit cliqué.
    var marker = createMarkerFeature(ev.coordinate);
    markerLayer.getSource().addFeature(marker);

    // Récupère les batiments cliqués.
    getBatimentFeatureInfo(ev.coordinate, mapView.getResolution(), mapView.getProjection())
      .then(function (json) {
        if (!json || json.type !== 'FeatureCollection') {
          throw new Error('Invalid response returned');
        }
        // Ajoute les batiments trouvés sur la carte.
        var features = geojson.readFeatures(json);
        batimentLayer.getSource().addFeatures(features);
        console.log(json.features);
      });
  });
});
