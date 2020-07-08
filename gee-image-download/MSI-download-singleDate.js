//  Função para baixar as duas imagens Sentinel 2A (Orbita 138) de interesse para o campo de Três Marias/MG com data de 2019.
//  São duas cenas subsequentes contendo os reservatórios Três Marias e Retiro de baixo (montante).
function getQABits(image, start, end, newName) {
 var pattern = 0;
 for (var i = start; i <= end; i++) {
 pattern += Math.pow(2, i);
 }
 return image.select([0], [newName])
 .bitwiseAnd(pattern)
 .rightShift(start);
}

var collection = ee.ImageCollection('COPERNICUS/S2').filterDate('2019-06-29', '2019-07-03').filterBounds(loc_frame);
print(collection.getInfo());

var image_1 = ee.Image(collection.getInfo()['features']['0']['id'])
var image_2 = ee.Image(collection.getInfo()['features']['1']['id'])

//  Criar mascaras para garantir os valores da imagem 1
var cloud_mask_1 = getQABits(image_1.select('QA10'), 4, 4, 'cloud_mask_1').eq(0)
var saturation_mask_1 = getQABits(image_1.select('QA10'), 2, 3, 'saturation_mask_1').eq(0)
var mask_1 = cloud_mask_1.and(saturation_mask_1)

//  Criar mascaras para garantir os valores da imagem 2
var cloud_mask_2 = getQABits(image_2.select('QA10'), 4, 4, 'cloud_mask_2').eq(0)
var saturation_mask_2 = getQABits(image_2.select('QA10'), 2, 3, 'saturation_mask_2').eq(0)
var mask_2 = cloud_mask_2.and(saturation_mask_2)

var image_1 = image_1.mask(mask_1);
var image_2 = image_2.mask(mask_2);

Map.addLayer(image_1,{bands: ['B4'], min: 0, max: 2000},'clip_1');
Map.addLayer(image_2,{bands: ['B4'], min: 0, max: 2000},'clip_2');

Export.image.toDrive({
  image: image_1.select('B1'),
  description: 'MSI_LC1_TOA_TM_01-07-19_B1',
  scale: 60,
  region: image_1,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select('B2'),
  description: 'MSI_LC1_TOA_TM_01-07-19_B2',
  scale: 10,
  region: image_1,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select('B3'),
  description: 'MSI_LC1_TOA_TM_01-07-19_B3',
  scale: 10,
  region: image_1,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select('B4'),
  description: 'MSI_LC1_TOA_TM_01-07-19_B4',
  scale: 10,
  region: image_1,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select('B5'),
  description: 'MSI_LC1_TOA_TM_01-07-19_B5',
  scale: 20,
  region: image_1,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select('B6'),
  description: 'MSI_LC1_TOA_TM_01-07-19_B6',
  scale: 20,
  region: image_1,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select('B7'),
  description: 'MSI_LC1_TOA_TM_01-07-19_B7',
  scale: 20,
  region: image_1,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select('B8'),
  description: 'MSI_LC1_TOA_TM_01-07-19_B8',
  scale: 10,
  region: image_1,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select('B8A'),
  description: 'MSI_LC1_TOA_TM_01-07-19_B8A',
  scale: 20,
  region: image_1,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select('B9'),
  description: 'MSI_LC1_TOA_TM_01-07-19_B9',
  scale: 60,
  region: image_1,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select('B10'),
  description: 'MSI_LC1_TOA_TM_01-07-19_B10',
  scale: 60,
  region: image_1,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select('B11'),
  description: 'MSI_LC1_TOA_TM_01-07-19_B11',
  scale: 20,
  region: image_1,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select('B12'),
  description: 'MSI_LC1_TOA_TM_01-07-19_B12',
  scale: 20,
  region: image_1,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select(ee.List(['B2', 'B3', 'B4'])),
  description: 'MSI_LC1_TOA_TM_01-07-19_RGB',
  scale: 10,
  region: image_1,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B1'),
  description: 'MSI_LC1_TOA_PB_01-07-19_B1',
  scale: 60,
  region: image_2,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B2'),
  description: 'MSI_LC1_TOA_PB_01-07-19_B2',
  scale: 10,
  region: image_2,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B3'),
  description: 'MSI_LC1_TOA_PB_01-07-19_B3',
  scale: 10,
  region: image_2,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B4'),
  description: 'MSI_LC1_TOA_PB_01-07-19_B4',
  scale: 10,
  region: image_2,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B5'),
  description: 'MSI_LC1_TOA_PB_01-07-19_B5',
  scale: 20,
  region: image_2,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B6'),
  description: 'MSI_LC1_TOA_PB_01-07-19_B6',
  scale: 20,
  region: image_2,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B7'),
  description: 'MSI_LC1_TOA_PB_01-07-19_B7',
  scale: 20,
  region: image_2,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B8'),
  description: 'MSI_LC1_TOA_PB_01-07-19_B8',
  scale: 10,
  region: image_2,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B8A'),
  description: 'MSI_LC1_TOA_PB_01-07-19_B8A',
  scale: 20,
  region: image_2,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B9'),
  description: 'MSI_LC1_TOA_PB_01-07-19_B9',
  scale: 60,
  region: image_2,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B10'),
  description: 'MSI_LC1_TOA_PB_01-07-19_B10',
  scale: 60,
  region: image_2,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B11'),
  description: 'MSI_LC1_TOA_PB_01-07-19_B11',
  scale: 20,
  region: image_2,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B12'),
  description: 'MSI_LC1_TOA_PB_01-07-19_B12',
  scale: 20,
  region: image_2,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select(ee.List(['B2', 'B3', 'B4'])),
  description: 'MSI_LC1_TOA_PB_01-07-19_RGB',
  scale: 10,
  region: image_2,
  folder: 'GEE_Transfer',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});