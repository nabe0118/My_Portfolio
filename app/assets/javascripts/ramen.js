$(function(){
   'use strict';
    var map;
    var service;
    var infowindow;
    var currentLat;
    var currentLng;
    var origin;
    var zoom = 10;
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
       nearbysearch(pyrmont);
   }

    // fail
    function fail(pyrmont) {
      createMap(pyrmont);
    }


    //zoomの調整
    function createMap(pyrmont) {
      if ( zoom ){
      map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: zoom
      });
      zoom =15;
    }
    else{
      map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
                zoom: zoom
      });
    }
    }

    //緯度経度から距離を出す
    function getDistance(lat ,lng){
      	var now_pos = new google.maps.LatLng(currentLat, currentLng);
        console.log(currentLat,currentLng);
        	var target_pos = new google.maps.LatLng(lat,lng );
      var distance = google.maps.geometry.spherical.computeDistanceBetween(now_pos,target_pos );
      console.log(distance);
      return distance;
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
    function createTable(name,vicinity,distance,photoUrl,rating){
      var info = "<a href=\"https://maps.google.co.jp/maps?q=" + encodeURIComponent(name + " " + vicinity) + "&z=15&iwloc=A\"";
      info += " target=\"_blank\">"+name+"</a><br />";
      var td = "<tr class='trecord'><td><img src ='"+photoUrl+"'width='200'  height='200'></td><td>"+info+"</td><td>" +rating+"</td><td>"+ distance+ "M</td></tr>";
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
              //console.log(results[i]);
              var place = results[i];
              //console.log(place)
              var latlng = place.geometry.location;
              var icn = place.icon;
              var photos = place.photos;
              var first_photo = photos[0];
              var rating = place.rating;
              //console.log(latlng);
              //console.log(latlng.lat());
              //console.log(latlng.lng());
              console.log("test");
              console.log(rating);
              console.log(first_photo.getUrl());
              var distance =getDistance(latlng.lat(),latlng.lng());
              distance = parseInt(distance);
              var destination = place.place_id
              //console.log('https://maps.googleapis.com/maps/api/directions/json?origin= '+origin+'&destination=place_id:'+destination+'&keys=AIzaSyCqpSF03kZY59cglWAiYAvZca_S1WKfdIQ');
              createTable(results[i].name,results[i].vicinity,distance,first_photo.getUrl(),place.rating);
              createMarker(latlng, icn, place);
            }
          }
        }
    }
});
