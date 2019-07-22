// Initialise la carte TeFenua quand le DOM est prêt.
document.addEventListener('DOMContentLoaded', function () {
  // Prépare la couche TeFenua.
  var tefenuaLayer = createTeFenuaLayer();

  // Prépare la carte OpenLayers.
  var map = createDefaultMap([tefenuaLayer]);

  // Surveille les clics sur la carte.
  map.on('click', function (ev) {
    // Affiche l'emplacement cliqué dans la console.
    console.log('clicked @:', ev.coordinate);
  });
});
