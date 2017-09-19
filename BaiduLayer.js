OpenLayers.Layer.BaiduLayer = OpenLayers.Class(OpenLayers.Layer.XYZ, {
    tileOrigin: new OpenLayers.LonLat(-3.3554432E7, 3.3554432E7),
    tileSize: new OpenLayers.Size(256, 256),
    type: 'png',
    initialize: function (name, url, options) {
        this.name = name;
        this.url = url;
        this.resolutions = [
            262144.0,
            131072.26214452417,
            65536.13107226208,
            32768.0,
            16384.0,
            8192.0,
            4096.0,
            2048.0,
            1024.0,
            512.0,
            256.0,
            128.0,
            64.0,
            32.0,
            16.0,
            8.0,
            4.0,
            2.0,
            1.0,
            0.5
        ];
        this.layerType = options.layerType;
        this.isBaseLayer = options.isBaseLayer;
        OpenLayers.Layer.XYZ.prototype.initialize.apply(this, [this.name, this.url, this.options]);
        this.serverResolutions = this.resolutions;
        this.maxExtent = new OpenLayers.Bounds(-3.3554432E7, -3.3554432E7, 3.3554432E7, 3.3554432E7);
        this.projection = 'EPSG:3857';
        this.units = 'm';
    },
    setMap: function(map) {
        map.minResolution = this.resolutions[this.resolutions.length - 1];
        map.maxResolution = this.resolutions[0];
        OpenLayers.Layer.XYZ.prototype.setMap.apply(this, arguments);
    },
    getURL: function (bounds) {
        var xyz = this.getXYZ(bounds);
        var offset = Math.pow(2, xyz.z - 1);
        var x = xyz.x - offset;
        var y = offset - xyz.y - 1;
        var z = xyz.z;
        var url = this.url;
        if (x < 0) {
            x = 'M' + (-x);
        }
        if (y < 0) {
            y = 'M' + (-y);
        }
        if (this.layerType === 'street') {
            url = 'http://online' + parseInt(Math.random() * 10) + '.map.bdimg.com/onlinelabel/?qt=tile&x=' +
                x + '&y=' + y + '&z=' + z + '&styles=pl&udt=20170620&scaler=1&p=1'
        }
        else if(this.layerType === 'image') {
            url = 'http://shangetu' + parseInt(Math.random() * 10) + '.map.bdimg.com/it/u=x=' + x +
                ';y=' + y + ';z=' + z + ';v=009;type=sate&fm=46&udt=20170606'
        }
        else if(this.layerType === 'label') {
            url = 'http://online' + parseInt(Math.random() * 10) + '.map.bdimg.com/onlinelabel/?qt=tile&x=' +
                x + '&y=' + y + '&z=' + z + '&styles=sl&udt=20170620&scaler=1&p=1';
        }
        return url;
    }
});