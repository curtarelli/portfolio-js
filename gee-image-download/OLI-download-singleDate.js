function getQABits(image, start, end, newName) {
 var pattern = 0;
 for (var i = start; i <= end; i++) {
 pattern += Math.pow(2, i);
 }
 return image.select([0], [newName])
 .bitwiseAnd(pattern)
 .rightShift(start);
}

var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1').filterDate('2017-07-26', '2017-07-27').filterBounds(BILL);
print(collection.getInfo());

var image = ee.Image(collection.getInfo()['features']['0']['id'])

//Criar mascaras para garantir os valores
var cloud_mask = getQABits(image.select('BQA'), 4, 4, 'cloud_mask').eq(0)
var saturation_mask = getQABits(image.select('BQA'), 2, 3, 'saturation_mask').eq(0)
var mask = cloud_mask.and(saturation_mask)

var image = image.mask(mask);
Map.addLayer(image,{bands: ['B8'], min: 6000, max: 8000});
Map.setCenter(-45.9, -23.5, 5);

Export.image.toDrive({
  image: image.select('B2'),
  description: 'BILL_B2_30M',
  scale: 30,
  region: BILL,
});

Export.image.toDrive({
  image: image.select('B3'),
  description: 'BILL_B3_30M',
  scale: 30,
  region: BILL,
});

Export.image.toDrive({
  image: image.select('B4'),
  description: 'BILL_B4_30M',
  scale: 30,
  region: BILL,
});

Export.image.toDrive({
  image: image.select('B8'),
  description: 'BILL_B8_15M',
  scale: 15,
  region: BILL,
});

Export.image.toDrive({
  image: image.select(ee.List(['B2', 'B3', 'B4'])),
  description: 'BILL_IHS_30M',
  scale: 30,
  region: BILL,
});

Export.image.toDrive({
  image: image.select('B2'),
  description: 'BILL_B2_15M',
  scale: 15,
  region: BILL,
});

Export.image.toDrive({
  image: image.select('B3'),
  description: 'BILL_B3_15M',
  scale: 15,
  region: BILL,
});

Export.image.toDrive({
  image: image.select('B4'),
  description: 'BILL_B4_15M',
  scale: 15,
  region: BILL,
});

Export.image.toDrive({
  image: image.select(ee.List(['B2', 'B3', 'B4'])),
  description: 'BILL_IHS_15M',
  scale: 15,
  region: BILL,
});