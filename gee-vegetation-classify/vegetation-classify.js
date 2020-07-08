/**
 * @name
 *      Google Earth Engine - Vegetation Classify - v1.0.0;
 * 
 * @date
 *      02/16/2020;
 * 
 * @description
 *      This is the resolution of the practical test of a professional vacancy selection process;
 *			It select a Image collection based on a date period, cut it based on a polygon, compose a mosaic based on the best pixel
 *			apply a false color composite, a NDVI gradient and a classification (vegetation and non-vegetation);
 * 
 * @author
 *      name:     Victor Pedroso Curtarelli;
 *      e-mail:   victor.curtarelli@gmail.com;
 *      profile:  https://www.linkedin.com/in/victorcurtarelli/;
 * 
 * @version
 *      v1.0.0 - Applies the cloud mask, NDVI and classification over the cloudless image of a given period of interest;
 * 
 * @see
 *      Canvas to visualize the result layers ['Composite R5G6B4', 'NDVI' and 'Classification'];
 *      "Google Drive/MapBiomas_2020/output" o access the output data (.tif);
 * 
 **/
//  STEP 0-1 - Adding the polygon of interest (GeoJSON);
//  ----------------------------------------------------
var jsonGeometry = '{"type": "Polygon","coordinates": [[[-56.63078012318874,-11.372564601339718],[-56.63078012318874,-11.59394883911571],[-56.19132699818874,-11.59394883911571],[-56.19132699818874,-11.372564601339718]]],"geodesic": false,"evenOdd": true}';
var roi = ee.Geometry(JSON.parse(jsonGeometry));

//  STEP 0-2 - Defining the functions used in this script;
//  ------------------------------------------------------
//  Function to assess the quality band of the image;
var getQABits = function(image, start, end, newName) {
/**
 * Quality Assessment Band (BQA) bits aquisition function;
 * -------------------------------------------------------
 * inputs
 *        [image]:    Landsat-8 BQA band image band from the collection;
 *        [start]:    Lower limit of mask bits range;
 *        [end]:      Upper limit of mask bits range;
 *        [newName]:  New name for the mask image;
 * 
 * return
 *        [QABits_image]: Single band image of the extracted QA bits, giving the band a new name;
**/
  // Compute the bits we need to extract;
  var pattern = 0;
  for (var i = start; i <= end; i++) {
    pattern += Math.pow(2, i);
    
  }
  // Return a single band image of the extracted QA bits, giving the band a new name;
  return image.select([0], [newName])
  .bitwiseAnd(pattern)
  .rightShift(start);
};

//  Clouds classifier parametrized for Landsat-8;
var clouds = function(image) {
/**
 * Clouds QA Bits function;
 * ------------------------
 * inputs
 *        [image]:  Image to apply getQABits function;
 * 
 * return
 *        [clouds_image]: Single band image of the clouds extracted QA bits;
**/
  // Select the QA band;
  var QA = image.select(['BQA']);
  // Get the internal_cloud_algorithm_flag bit;
  return getQABits(QA, 4,4, 'Cloud').eq(0);
  // Return an image masking out cloud pixels;
};

//  Cloud shadows classifier parametrized for Landsat-8;
var cloudShadows = function(image) {
/**
 * Cloud shadows QA Bits function;
 * -------------------------------
 * inputs
 *        [image]:  Image to apply getQABits function;
 * 
 * return
 *        [cloud_shadows_image]: Single band image of the cloud shadows extracted QA bits;
**/
  // Select the QA band;
  var QA = image.select(['BQA']);
  // Get the internal_cloud_shadows_algorithm_flag bit;
  return getQABits(QA, 7,8, 'Cloud Shadows').eq(1);
  // Return an image masking out cloud shadows pixels;
};

//  This is a mask function based on the getQABits, clouds and cloudShadows functions;
var maskClouds = function(image) {
/**
 * Clouds and cloud shadows QA Bits mask function;
 * -----------------------------------------------
 * inputs
 *        [image]:  Image to apply maskClouds function;
 * 
 * return
 *        [masked_image]: Masked image, removing cloud shadows and clouds from the original image;
**/
  var c = clouds(image);
  var cs = cloudShadows(image);
  image = image.updateMask(c);
  return image.updateMask(cs);
};

//  STEPS 1 to 3 - Landsat-8 at TOA level intersecting ROI geometry;
//  -----------------------------------------------------------
//  STEP 1 - Defining the Landsat-8 sorted image collection used;
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')  //  Collection 1 - Tier 1;
    //  STEP 2 - Defining the search date period of interest;
    //  -----------------------------------------------------
    .filterDate('2019-04-01', '2019-11-01')
    //  STEP 3 - Defining bound limits for the search;
    //  ----------------------------------------------
    .filterBounds(roi)
    //  Selecting only the bands of interest for this script;
    .select(['B4', 'B5', 'B6', 'BQA']);

//  STEP 4 - Clipping the Image Collection selected for the period using ROI limits;
//  --------------------------------------------------------------------------------
//  Transforming the selected colletion into a list to facilitate the operations;
var i = collection.toList(collection.size());   // The value '100' was used as a maximum value of items in the list, this value can be changed;
//  Creating an empty ImageCollection to merge the clipped images;
var clippedCollection = ee.ImageCollection([]);
//  Clipping iteration over each feature (item) of the created list and merging into the empty ImageCollection;
for(var ii = 0; ii < 13; ii++)  {
  var image = ee.Image(i.get(ii));
  var image = image.clip(roi);
  var clippedCollection = clippedCollection.merge(image);
}

//  STEP 5 - Applying the mask over the ImageCollection;
var maskedCollection = clippedCollection.map(maskClouds);

// Creating a pixel composite based on the quality assessment band 'BQA';
var pixelComposite = maskedCollection.qualityMosaic('BQA');

//  STEP 6 - NDVI calculation;
//  --------------------------
var NDVI = pixelComposite.normalizedDifference(['B5','B4']);

//  STEP 7 - Adding free clouds mosaic composite (R5 G6 B4) layer for visualization;
//  --------------------------------------------------------------------------------
Map.addLayer(pixelComposite, {bands: ['B5', 'B6', 'B4'], min: 0, max: 0.5}, 'Composite R5G6B4');

//  STEP 8 - Adding NDVI pseudo color composite layer for visualization;
//  --------------------------------------------------------------------
Map.addLayer(NDVI, {palette: ['#FF0000', '#FF8100', '#F0FF00', '#00FF11'], min: 0, max: 1}, 'NDVI');

//  STEP 9 - NDVI based classification (vegetation and non-vegetation);
//  -------------------------------------------------------------------
//  Creating the visualization parameters for the classes;
var vegetationViz = {min: 0.4, max: 1, palette: ['#FFFFFF']};
var nonVegetationViz = {min: -1, max: 0.4, palette: ['#000000']};

//  Classifying the image based on slices of values for the NDVI;
var classified = ee.ImageCollection([
    // NDVI >= 0.4 is vegetation.  Visualize it with a white palette;
    NDVI.updateMask(NDVI.gte(0.4)).visualize(vegetationViz),
    // NDVI < 0.4 is non-vegetation.  Visualize it with a black palette;
    NDVI.updateMask(NDVI.lt(0.4)).visualize(nonVegetationViz)
]).mosaic();

//  STEP 10 - Adding the NDVI based classification layer for visualization;
//  ------------------------------------------------------------------------
Map.addLayer(classified, {}, 'Classification');
//  Adujsting the canvas to better see the results;
Map.setCenter(-56.4111, -11.4833, 11);

//  FINAL - Output export of the results (.tiff and .png);
//  ------------------------------------------------------
//  Addyin and organizing all bands in the result data to export;
var image = pixelComposite.addBands(NDVI).addBands(classified)
    .rename(['B4', 'B5', 'B6', 'BQA', 'NDVI', 'Classes', 'Classes-2', 'Classes-3'])
    .select(['B4', 'B5', 'B6', 'NDVI', 'Classes']);

//  Exporting the results to drive output directory (.tif);
Export.image.toDrive({
  image: image.select(ee.List(['B4', 'B5', 'B6', 'NDVI'])),
  description: 'OLI_T1_TOA_Results',
  scale: 30,
  region: roi,
  folder: 'MapBiomas_2020/output',
  fileFormat: 'GeoTIFF',
  maxPixels: 1e9,
  crs: 'EPSG:4326'
});

//  Exporting the classification to drive output directory (.tif);
Export.image.toDrive({
  image: image.select(ee.List(['Classes'])),
  description: 'OLI_T1_TOA_Classes',
  scale: 30,
  region: roi,
  folder: 'MapBiomas_2020/output',
  fileFormat: 'GeoTIFF',
  maxPixels: 1e9,
  crs: 'EPSG:4326'
});