// Initialise la carte TeFenua quand le DOM est prêt.
document.addEventListener('DOMContentLoaded', function () {
  // Prépare la couche TeFenua
  var tefenuaLayer = createTeFenuaLayer();

  // Prépare la couche des marqueurs.
  var markerLayer = createMarkerLayer();

  // Prépare la carte OpenLayers.
  var map = createDefaultMap([tefenuaLayer, markerLayer]);

  // Ajoute un marqueur au centre de la carte.
  var marker = createMarkerFeature(map.getView().getCenter());
  markerLayer.getSource().addFeature(marker);

  // Surveille les clics sur la carte.
  map.on('click', function (ev) {
    console.log('clicked @', ev.coordinate);

    // Ajoute un marqueur à l'emplacement cliqué.
    var newMarker = createMarkerFeature(ev.coordinate);
    markerLayer.getSource().addFeature(newMarker);
  });
});
