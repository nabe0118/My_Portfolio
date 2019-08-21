$(function(){

                              'use strict';
                               var map;
    var service;
    var infowindow;
    var currentLat;
    var currentLng;
    var origin;
    var pyrmont = new google.maps.LatLng(35.658034,139.701636);
    createMap(pyrmont)


     // 現在地取得
     document.getElementById('getcurrentlocation').onclick = function() {
      geoLocationInit();
    }

    function geoLocationInit() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, fail);

        } else {
          createMap(pyrmont);
      }
    }

   // success
   function success(position) {
     currentLat = position.coords.latitude;
     currentLng = position.coords.longitude;
     origin = currentLat+','+currentLng;

     var pyrmont = new google.maps.LatLng(currentLat,currentLng);

     createMap(pyrmont)

     CurrentPositionMarker(pyrmont);
   }

    // fail
    function fail(pyrmont) {
      createMap(pyrmont);
    }

    function createMap(pyrmont) {

      map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
      });
      nearbysearch(pyrmont)
    }

    function createMarker(latlng, icn, place)
    {
      var marker = new google.maps.Marker({
        position: latlng,
        map: map
      });

      var placename = place.name;
　　　　　　　　　　// 吹き出しにラーメンの名前を埋め込む
      var contentString = `<div class="sample"><p id="place_name">${placename}</p></div>`;


     // 吹き出し
      var infoWindow = new google.maps.InfoWindow({ // 吹き出しの追加
		  content:  contentString// 吹き出しに表示する内容
		});


		marker.addListener('click', function() { // マーカーをクリックしたとき
			infoWindow.open(map, marker); // 吹き出しの表示
		});

      }

    // 現在地のアイコンを表示
    function CurrentPositionMarker(pyrmont) {
        var image = 'http://i.stack.imgur.com/orZ4x.png';
        var marker = new google.maps.Marker({
                position: pyrmont,
                map: map,
                icon: image
            });
        marker.setMap(map);
    }
    function createTable(name,vicinity){
      var info = "<a href=\"https://maps.google.co.jp/maps?q=" + encodeURIComponent(name + " " + vicinity) + "&z=15&iwloc=A\"";
      info += " target=\"_blank\">"+name+"</a><br />";
      var td = "<tr class='trecord'><td>"+info+"</td></tr>";
      $("#shoplist_table").append(td);
    }
    // 周辺のラーメンを検索
    function nearbysearch(pyrmont) {
        var request = {
          location: pyrmont,
          radius: '1500',
          keyword: ['ラーメン',]
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            $(".trecord").remove();
            console.log(origin);
	　　　　　　　　//取得したラーメン情報をそれぞれcreateMarkerに入れて、マーカーを作成
            for (var i = 0; i < results.length; i++) {
              console.log(results[i]);
              var place = results[i];
              //console.log(place)
              var latlng = place.geometry.location;
              var icn = place.icon;
              console.log(latlng);
              var destination = place.place_id
              console.log('https://maps.googleapis.com/maps/api/directions/json?origin= '+origin+'&destination=place_id:'+destination+'&keys=AIzaSyCqpSF03kZY59cglWAiYAvZca_S1WKfdIQ');
              createTable(results[i].name,results[i].vicinity);
              createMarker(latlng, icn, place);
            }
          }
        }
    }
});
