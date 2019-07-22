// Initialise la carte TeFenua quand le DOM est prêt.
document.addEventListener('DOMContentLoaded', function () {
  // Prépare la couche TeFenua.
  var tefenuaLayer = createTeFenuaLayer();

  // Prépare la carte OpenLayers.
  var map = createDefaultMap([tefenuaLayer]);

  // Affiche l'emplacement cliqué dans la console.
  map.on('click', function (ev) {
    console.log('clicked @:', ev.coordinate);
  });
});
