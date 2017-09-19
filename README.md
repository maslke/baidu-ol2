# baidu-ol2
使用openlayers2加载百度在线街道图、影像图

使用方法

var map = new OpenLayers.Map('mapDiv', {
            projection: 'EPSG:3857',
            zoom: 7
        });

var layer = new OpenLayers.Layer.BaiduLayer('street', '', {
    layerType: 'street',
    isBaseLayer: true
});

map.addLayer(layer);
