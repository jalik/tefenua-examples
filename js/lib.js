/**
 * Résolutions de la carte TeFenua.
 * @type {number[]}
 */
var MAP_RESOLUTIONS = [
  0.703125,
  0.3515625,
  0.17578125,
  0.087890625,
  0.0439453125,
  0.02197265625,
  0.010986328125,
  0.0054931640625,
  0.00274658203125,
  0.001373291015625,
  0.0006866455078125,
  0.0003433227539062,
  0.0001716613769531,
  0.0000858306884766,
  0.0000429153442383,
  0.0000214576721191,
  0.0000107288360596,
  0.0000053644180298,
  0.0000026822090149,
];

/**
 * Créé une vue de carte par défaut.
 * @return {ol.View}
 */
function createDefaultMapView() {
  // http://openlayers.org/en/master/apidoc/ol.View.html
  return new ol.View({
    center: [-149.544155, -17.526540],
    zoom: 16,
    projection: ol.proj.get('EPSG:4326'),
  });
}

/**
 * Créé une carte par défaut.
 * @param layers
 * @return {ol.Map}
 */
function createDefaultMap(layers) {
  // http://openlayers.org/en/master/apidoc/ol.Map.html
  return new ol.Map({
    // N'afficher aucun contrôle.
    controls: [],
    // Couches de la carte.
    layers: layers,
    // ID de l'élément où afficher la carte.
    target: 'map',
    // Charger la carte pendant les animations.
    loadTilesWhileAnimating: false,
    // Charger la carte pendant les interactions.
    loadTilesWhileInteracting: false,
    // Créé la vue par défaut.
    view: createDefaultMapView(),
  });
}

/**
 * Créé un marqueur.
 * @param lonLat
 * @return {ol.Feature}
 */
function createMarkerFeature(lonLat) {
  // http://openlayers.org/en/master/apidoc/ol.Feature.html
  var marker = new ol.Feature({
    geometry: new ol.geom.Point(lonLat),
  });
  // Définit le style du marqueur.
  marker.setStyle(createMarkerStyle);
  return marker;
}

/**
 * Créé le style de marqueur.
 */
function createMarkerStyle() {
  return new ol.style.Style({
    // http://openlayers.org/en/master/apidoc/ol.style.Icon.html
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      scale: 0.15,
      src: '../../images/marker.png',
    }),
  });

}

/**
 * Crée une couche de marqueurs.
 * @return {ol.layer.Vector}
 */
function createMarkerLayer() {
  // http://openlayers.org/en/master/apidoc/ol.layer.Vector.html
  return new ol.layer.Vector({
    source: new ol.source.Vector(),
    zIndex: 100,
  });
}

/**
 * Retourne les identifiants de la matrice de tuiles.
 * @param projection
 * @param count
 * @return {Array}
 */
function getMatrixIds(projection, count) {
  var matrixIds = [];

  for (var i = 0; i < count; i++) {
    matrixIds.push(projection + ':' + i);
  }
  return matrixIds;
}

/**
 * Créé une couche TeFenua.
 * @return {ol.layer.Tile}
 */
function createTeFenuaLayer() {
  // http://openlayers.org/en/master/apidoc/ol.layer.Tile.html
  return new ol.layer.Tile({
    zIndex: 2,
    // http://openlayers.org/en/master/apidoc/ol.source.WMTS.html
    source: new ol.source.WMTS({
      url: 'https://www.tefenua.gov.pf/api/wmts',
      format: 'image/jpeg',
      layer: 'TEFENUA:FOND',
      style: '',
      matrixSet: 'EPSG:4326',
      projection: ol.proj.get('EPSG:4326'),
      // Configuration des requêtes WMTS
      tileGrid: new ol.tilegrid.WMTS({
        extent: [
          -180,
          -70.20625,
          0,
          52.70855,
        ],
        matrixIds: getMatrixIds('EPSG:4326', MAP_RESOLUTIONS.length),
        origin: [-180, 90],
        resolutions: MAP_RESOLUTIONS,
        tileSize: 256,
      }),
    }),
  });
}
