// Initialise la carte TeFenua quand le DOM est prêt
document.addEventListener('DOMContentLoaded', function () {
  // Prépare la couche TeFenua
  var tefenuaLayer = createTeFenuaLayer();

  // Prépare la vue de la carte
  // http://openlayers.org/en/master/apidoc/ol.View.html
  var mapView = new ol.View({
    center: [-149.544155, -17.526540],
    zoom: 16,
    projection: ol.proj.get('EPSG:4326'),
  });

  // Prépare la carte OpenLayers
  // http://openlayers.org/en/master/apidoc/ol.Map.html
  var map = new ol.Map({
    // N'afficher aucun contrôle
    controls: [],
    // Couches de la carte
    layers: [tefenuaLayer],
    // ID de l'élément où afficher la carte
    target: 'map',
    // Charger la carte pendant les animations
    loadTilesWhileAnimating: false,
    // Charger la carte pendant les interactions
    loadTilesWhileInteracting: false,
    view: mapView,
  });

  // Affiche l'emplacement cliqué dans la console
  map.on('click', function (ev) {
    console.log('clicked @:', ev.coordinate);
  });
});
