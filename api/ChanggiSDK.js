//楼宇ID（枚举）
var BuildingID = {

    T1: 1,

    T2: 2,

    T3: 3,

    T4: 4,

    Jewel: 5,
};

function Map() { };

/// <summary>
/// 设置文字显示(参数为"100,1.004,3.002")
/// 文字位置为下中上。
/// </summary>
Map.init = function (nLat, nLng, nDistance) {

    //console.log("MapInit", nDistance + "," + nLat + "," + nLong);
    SendUnityMessage("MapInit", nLat + "," + nLng + "," + nDistance);
}

/// <summary>
/// 设置图标图片。
/// </summary>
Map.home = function () {
    SendUnityMessage("MapHome");
}

/// <summary>
/// 进入内景。
/// </summary>
Map.goInDoor = function (buildingID) {
    console.log(buildingID);
    SendUnityMessage("GoInDoor", buildingID);
}






//自定义事件
function EventCenter() {
    this.handlers = {}
}
EventCenter.prototype = {
    constructor: EventCenter,
    addListener: function (type, handler) {
        if (this.handlers[type] === undefined) {
            this.handlers[type] = []
        }
        this.handlers[type].push(handler)
    },
    invoke: function (type, ...args) {
        const typeHandlers = this.handlers[type]

        if (typeHandlers === undefined || typeHandlers.length === 0) {
            return
        }

        for (let i = 0; i < typeHandlers.length; i++) {
            typeHandlers[i].apply(this, args)
        }
    },
    removeListener: function (type, handler) {
        if (this.handlers[type] === undefined) {
            return
        }

        this.handlers[type] = this.handlers[type].filter((item) => item !== handler)
    }
}

//marker类型（枚举）
var MarkerType = {

    FieldOfficer: 1,

    Robot: 2,

    Drone: 3,

    CCTV: 4,

    GTPoints: 5,

    Incidents: 6,

    Events: 7,

    Kiosk: 8,

    Traffic: 9,

    Weather: 10,

    Duress: 11,

};

//提示列表。
var aTrafficMarkerArray = new Array();
var aCCTVMarkerArray = new Array();
//删除后，缓存的ID列表。
var aTrafficIDArray = new Array();
var aCCTVIDArray = new Array();

//创建一个标记点
function createMarker(nLat, nLng, eMarkerType) {
    var o = new Object();

    o.markerType = eMarkerType;

    var aMarkerArray;
    var aIDArray;
    switch (eMarkerType) {
        case MarkerType.FieldOfficer:
            break;
        case MarkerType.Robot:
            break;
        case MarkerType.Drone:
            break;
        case MarkerType.CCTV:
            aMarkerArray = aCCTVMarkerArray;
            aIDArray = aCCTVIDArray;
            break;
        case MarkerType.GTPoints:
            break;
        case MarkerType.Incidents:
            break;
        case MarkerType.Events:
            break;
        case MarkerType.Kiosk:
            break;
        case MarkerType.Traffic:
            aMarkerArray = aTrafficMarkerArray;
            aIDArray = aTrafficIDArray;
            break;
        case MarkerType.Weather:
            break;
        case MarkerType.Duress:
            break;
    }

	if(aIDArray.length > 0)
	{
		o.nID = aIDArray.pop();
	}
	else
	{
		o.nID = aMarkerArray.length + "";
    }

    //添加点。
    SendUnityMessage("MarkerAdd", o.nID + "#" + nLat + "," + nLng + "#" + o.markerType);

    /// <summary>
    /// 设置文字显示(参数为"SDS12345,SMALL,#ff0000,Bottom|Middle|Top")
    /// 文字位置为下中上。
    /// </summary>
    o.setDisplay = function (pName, pStyle, pColor, pPosition) {

        console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setDisplay@#@" + pName + "," + pStyle + "," + pColor + "," + pPosition);
        SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setDisplay@#@" + pName + "," + pStyle + "," + pColor + "," + pPosition);
    }

    /// <summary>
    /// 设置图标图片（参数为全路径"http://xxx.jpg"）。
    /// </summary>
    o.setMarkerIcon = function (pIconURL, nWidth, nHeight) {

        console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setMarkerIcon@#@" + pIconURL + "~&~" + nWidth + "~&~" + nHeight);
        SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setMarkerIcon@#@" + pIconURL + "~&~" + nWidth + "~&~" + nHeight);
    }

    /// <summary>
    /// 设置图标位置点(参数为"1.301,103.24")。
    /// </summary>
    o.setPosition = function (nLat, nLng) {

        console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setPosition@#@" + nLat + "," + nLng);
        SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setPosition@#@" + nLat + "," + nLng);

    }

    /// <summary>
    /// 设置启用(参数为"true|false")。
    /// </summary>
    o.setEnable = function (bActive) {

        console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setEnable@#@" + bActive);
        SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setEnable@#@" + bActive);
    }

    /// <summary>
    /// 设置高光(参数为"true|false")。
    /// </summary>
    o.highlight = function (bActive) {

        console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~highlight@#@" + bActive);
        SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~highlight@#@" + bActive);
    }

    /// <summary>
    /// 设置闪烁(参数为"true|false")。
    /// </summary>
    o.blink = function (bActive) {

        console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~blink@#@" + bActive);
        SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~blink@#@" + bActive);
    }

    /// <summary>
    /// 设置缩放(参数为：暂时不使用)。
    /// </summary>
    o.zoom = function (nDistance) {

        console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~zoom@#@" + nDistance);
        SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~zoom@#@" + nDistance);
    }

    /// <summary>
    /// 移除。
    /// </summary>
    o.remove = function () {
        console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~remove@#@0");
        SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~remove@#@0");
		
		aMarkerArray.forEach(function(item, index, arr) {
			if(item.nID == o.nID) {
				aIDArray.push(item.nID);
				arr.splice(index, 1);
			}
		});
    }

    /// <summary>
    /// 设置显示隐藏(参数为："true|false")。
    /// </summary>
    o.visible = function (bActive) {
        console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~visible@#@" + bActive);
        SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~visible@#@" + bActive);
    }

    /// <summary>
    /// 设置(参数为：暂时不使用)。
    /// </summary>
    /// <param name="pStr"></param>
    o.setMinimumZoomVisible = function (nDistance) {

        console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setMinimumZoomVisible@#@" + nDistance);
        SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setMinimumZoomVisible@#@" + nDistance);
    }

    /// <summary>
    /// 设置(参数为：暂时不使用)。
    /// </summary>
    o.setMaximumZoomVisible = function (nDistance) {

        console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setMaximumZoomVisible@#@" + nDistance);
        SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setMaximumZoomVisible@#@" + nDistance);
    }

    /// <summary>
    /// 设置(参数为："#ff0000")。
    /// </summary>
    /// <param name="pStr"></param>
    o.setMinimizeIcon = function (pColor) {

        console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setMinimizeIcon@#@" + pColor);
        SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setMinimizeIcon@#@" + pColor);
    }

    /// <summary>
    /// 设置(参数为："#ffcc00")。
    /// </summary>
    o.setBackground = function (pColor) {

        console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setBackground@#@" + pColor);
        SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setBackground@#@" + pColor);
    }      
 
    /// <summary>
    /// 关闭面板
    /// </summary>
    o.closePanel = function () {

        console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~closePanel@#@");
        SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~closePanel@#@");
    }

    /// <summary>
    /// 打开面板
    /// </summary>
    o.showPanel = function () {

        console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~openPanel@#@");
        SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~openPanel@#@");
    }

    //为不同类型的标识分配不同的方法
    switch (eMarkerType) {
        case MarkerType.FieldOfficer:
            break;
        case MarkerType.Robot:
            break;
        case MarkerType.Drone:
            break;
        case MarkerType.CCTV:
            // 设置摄像头路径
            o.setCameraURL = function (pStr) {

                console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setCameraURL@#@" + pStr);
                SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setCameraURL@#@" + pStr);
            }
            break;
        case MarkerType.GTPoints:
            break;
        case MarkerType.Incidents:
            break;
        case MarkerType.Events:
            break;
        case MarkerType.Kiosk:
            break;
        case MarkerType.Traffic:

            /// <summary>
            /// 设置图标上的车辆图片（参数为全路径"http://xxx.jpg"）。
            /// </summary>
            o.setVehicleIcon = function (pIconURL) {
                console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setVehicleIcon@#@" + pIconURL);
                SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setVehicleIcon@#@" + pIconURL);
            }

            // 设置面板需要的信息
            o.setPanelInfo = function (pStr) {

                console.log("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setPanelInfo@#@" + pStr);
                SendUnityMessage("MarkerMessage", o.markerType + "~!~" + o.nID + "~!~setPanelInfo@#@" + pStr);
            }
            break;
        case MarkerType.Weather:
            break;
        case MarkerType.Duress:
            break;
    }

    o.eventCenter = new EventCenter();
    /// <summary>
    /// 添加点击事件。(参数为："LEFT CLICK|RIGHT CLICK|HOVER|TOUCH"）。
    /// </summary>
    o.addListener = function (pType, pFunctionName) {

        switch (pType) {
            case "onclick":
                o.eventCenter.addListener('onclick', pFunctionName);
                break;
            case "onenter":
                o.eventCenter.addListener('onenter', pFunctionName);
                break;
            case "onexit":
                o.eventCenter.addListener('onexit', pFunctionName);
                break;
        }
    }

    /// <summary>
    /// 移除点击事件。(参数为："LEFT CLICK|RIGHT CLICK|HOVER|TOUCH"）。。
    /// </summary>
    o.removeListener = function (pType, pFunctionName) {

        switch (pType) {
            case "onclick":
                o.eventCenter.removeListener('onclick', pFunctionName);
                break;
            case "onenter":
                o.eventCenter.removeListener('onenter', pFunctionName);
                break;
            case "onexit":
                o.eventCenter.removeListener('onexit', pFunctionName);
                break;
        }
    }

    aMarkerArray.push(o);
    return o;
}



//创建一个层
function createLayer(layerName) {
    var o = new Object();

    SendUnityMessage("LayerAdd", layerName);

    o.addMarker = function (marker) {

    }
}



function OnGetMessage(dataMessge)
{

}



//创建路径
function createPath() {
    var o = new Object();

    //添加点。
    SendUnityMessage("CreatePath");

    //添加路径点
    o.addPoint = function (lat, lng) {

        console.log("PathMessage", "addPoint@#@" + lat + "," + lng);
        SendUnityMessage("PathMessage", "addPoint@#@" + lat + "," + lng);
    }

    //绘制路径
    o.draw = function () {

        console.log("PathMessage", "draw@#@0");
        SendUnityMessage("PathMessage", "draw@#@0");
    }

    //清空路径
    o.releasePath = function () {

        console.log("PathMessage", "releasePath@#@0");
        SendUnityMessage("PathMessage", "releasePath@#@0");
    }

    //移动至上一个位置点
    o.moveToTheLastPoint = function () {

        console.log("PathMessage", "moveToTheLastPoint@#@0");
        SendUnityMessage("PathMessage", "moveToTheLastPoint@#@0");
    }

    //移动至下一个位置点
    o.moveToTheNextPoint = function () {

        console.log("PathMessage", "moveToTheNextPoint@#@0");
        SendUnityMessage("PathMessage", "moveToTheNextPoint@#@0");
    }

    //自行移动
    o.autoMove = function (intervalTime) {

        console.log("PathMessage", "autoMove@#@" + intervalTime);
        SendUnityMessage("PathMessage", "autoMove@#@" + intervalTime);
    }

    return o;
}
