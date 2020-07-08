function getQABits(image, start, end, newName) {
 var pattern = 0;
 for (var i = start; i <= end; i++) {
 pattern += Math.pow(2, i);
 }
 return image.select([0], [newName])
 .bitwiseAnd(pattern)
 .rightShift(start);
}

var collection = ee.ImageCollection('COPERNICUS/S2').filterDate('2019-01-01', '2019-04-02').filterBounds(loc_frame);
print(collection.getInfo());

//IMAGEM 1
var image_1 = ee.Image(collection.getInfo()['features']['2']['id'])

//Criar mascaras para garantir os valores
var cloud_mask = getQABits(image_1.select('QA10'), 4, 4, 'cloud_mask').eq(0)
var saturation_mask = getQABits(image_1.select('QA10'), 2, 3, 'saturation_mask').eq(0)
var mask = cloud_mask.and(saturation_mask)

var image_1 = image_1.mask(mask);

var image_1 = image_1.clip(TM_PB)

//Exportando BANDAS
Export.image.toDrive({
  image: image_1.select('B2'),
  description: 'TM_date01-07_1_B2',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select('B3'),
  description: 'TM_date01-07_1_B3',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select('B4'),
  description: 'TM_date01-07_1_B4',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select('B8'),
  description: 'TM_date01-07_1_B8',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_1.select(ee.List(['B2', 'B3', 'B4'])),
  description: 'TM_date01-07_1_RGB',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

//IMAGEM 2
var image_2 = ee.Image(collection.getInfo()['features']['3']['id'])

var cloud_mask = getQABits(image_2.select('QA10'), 4, 4, 'cloud_mask').eq(0)
var saturation_mask = getQABits(image_2.select('QA10'), 2, 3, 'saturation_mask').eq(0)
var mask = cloud_mask.and(saturation_mask)

var image_2 = image_2.mask(mask);

var image_2 = image_2.clip(TM_PB)

Export.image.toDrive({
  image: image_2.select('B2'),
  description: 'TM_date01-07_2_B2',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B3'),
  description: 'TM_date01-07_2_B3',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B4'),
  description: 'TM_date01-07_2_B4',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select('B8'),
  description: 'TM_date01-07_2_B8',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_2.select(ee.List(['B2', 'B3', 'B4'])),
  description: 'TM_date01-07_2_RGB',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

//IMAGEM 3
var image_3 = ee.Image(collection.getInfo()['features']['26']['id'])

var cloud_mask = getQABits(image_3.select('QA10'), 4, 4, 'cloud_mask').eq(0)
var saturation_mask = getQABits(image_3.select('QA10'), 2, 3, 'saturation_mask').eq(0)
var mask = cloud_mask.and(saturation_mask)

var image_3 = image_3.mask(mask);

var image_3 = image_3.clip(TM_PB)

Export.image.toDrive({
  image: image_3.select('B2'),
  description: 'TM_date03-08_1_B2',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_3.select('B3'),
  description: 'TM_date03-08_1_B3',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_3.select('B4'),
  description: 'TM_date03-08_1_B4',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_3.select('B8'),
  description: 'TM_date03-08_1_B8',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_3.select(ee.List(['B2', 'B3', 'B4'])),
  description: 'TM_date03-08_1_RGB',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

//IMAGEM 4
var image_4 = ee.Image(collection.getInfo()['features']['27']['id'])

var cloud_mask = getQABits(image_4.select('QA10'), 4, 4, 'cloud_mask').eq(0)
var saturation_mask = getQABits(image_4.select('QA10'), 2, 3, 'saturation_mask').eq(0)
var mask = cloud_mask.and(saturation_mask)

var image_4 = image_4.mask(mask);

var image_4 = image_4.clip(TM_PB)

Export.image.toDrive({
  image: image_4.select('B2'),
  description: 'TM_date03-08_2_B2',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_4.select('B3'),
  description: 'TM_date03-08_2_B3',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_4.select('B4'),
  description: 'TM_date03-08_2_B4',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_4.select('B8'),
  description: 'TM_date03-08_2_B8',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_4.select(ee.List(['B2', 'B3', 'B4'])),
  description: 'TM_date03-08_2_RGB',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

//IMAGEM 5
var image_5 = ee.Image(collection.getInfo()['features']['30']['id'])

var cloud_mask = getQABits(image_5.select('QA10'), 4, 4, 'cloud_mask').eq(0)
var saturation_mask = getQABits(image_5.select('QA10'), 2, 3, 'saturation_mask').eq(0)
var mask = cloud_mask.and(saturation_mask)

var image_5 = image_5.mask(mask);

var image_5 = image_5.clip(TM_PB)

Export.image.toDrive({
  image: image_5.select('B2'),
  description: 'TM_date03-18_1_B2',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_5.select('B3'),
  description: 'TM_date03-18_1_B3',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_5.select('B4'),
  description: 'TM_date03-18_1_B4',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_5.select('B8'),
  description: 'TM_date03-18_1_B8',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_5.select(ee.List(['B2', 'B3', 'B4'])),
  description: 'TM_date03-18_1_RGB',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

//IMAGEM 6
var image_6 = ee.Image(collection.getInfo()['features']['2']['id'])

var cloud_mask = getQABits(image_6.select('QA10'), 4, 4, 'cloud_mask').eq(0)
var saturation_mask = getQABits(image_6.select('QA10'), 2, 3, 'saturation_mask').eq(0)
var mask = cloud_mask.and(saturation_mask)

var image_6 = image_6.mask(mask);

var image_6 = image_6.clip(TM_PB)

Export.image.toDrive({
  image: image_6.select('B2'),
  description: 'TM_date03-18_2_B2',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_6.select('B3'),
  description: 'TM_date03-18_2_B3',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_6.select('B4'),
  description: 'TM_date03-18_2_B4',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_6.select('B8'),
  description: 'TM_date03-18_2_B8',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

Export.image.toDrive({
  image: image_6.select(ee.List(['B2', 'B3', 'B4'])),
  description: 'TM_date03-18_2_RGB',
  scale: 10,
  region: TM_PB,
  folder: 'MSI',
  maxPixels: 200000000,
  crs: 'EPSG:32723'
});

//Plotando Shape e IMAGEM X
Map.addLayer(image_1,{bands: ['B4'], min: 0, max: 2000},"clip");
Map.addLayer(TM_PB, undefined, "TM_PB")