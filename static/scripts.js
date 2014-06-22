var map;
var markerAdded;

// function responsible for creating marker
function createMarker(lng, lat) {
    markerAdded.setMap(null);		
    var myLatlng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
        position: myLatlng
    });
    markerAdded = marker;
    marker.setMap(map);
}

// initialization
function init() {
    var mapOptions = {
        center: new google.maps.LatLng(49, 19),
        zoom: 2
    };
    
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    markerAdded = new google.maps.Marker();

    google.maps.event.addListener(map, "click", function(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        var timestamp = Date.now()/1000;
        //console.log(timestamp);

        var dataString = 'lon=' + lng + '&lat=' + lat + '&timestamp=' + timestamp;

        $.ajax({
            type: "GET",
            url: "getTime",
            data: dataString,
	        success: function(data) {
                var date = timestamp + data.rawOffset + data.dstOffset;
                var t = new Date(date*1000);
                var newDate = t.toUTCString();
		        createMarker(lng, lat);
		        $("#tzname").text(data.timeZoneName);
                $("#tznow").text(newDate.slice(0, newDate.length-4));
		        $("#info").show(2000);
            }
        });
      return false;
    });
}
