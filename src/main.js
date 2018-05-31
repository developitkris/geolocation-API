import $ from 'jquery';
import 'bootstrap';
import './styles.css';

$(document).ready(function() {
  $('#geoLocation').click(function() {
    let geo = $('#location').val().toUpperCase();
    var mymap = L.map('mapid').setView([0,0], 13);
    $('#location').val("");
    console.log("The location is:" + geo);

    let request = new XMLHttpRequest();

    let url = `https://us1.locationiq.org/v1/search.php?key=${process.env.API_KEY}&q=${geo}&format=json`
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamltbS02MTkiLCJhIjoiY2podXJwMXdwMHJscDN2cnZsdGN5eHU1cSJ9.rZ6hkyLuZ3Nrl6uc0oPf1w', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
        console.log("The Response is:" + response);
      }
    }

    // var marker = new MapBox

    var marker;
    request.open("GET", url, true);
    request.send();


      let getElements = function(response) {
        console.log(response);
        $('.showCity').append(`<h1>Your search results for ${geo}: </h1>`);
        response.forEach(function(location) {
          var marker = L.marker([location.lat, location.lon]).addTo(mymap);
        })
        mymap.panTo(new L.LatLng(response[0].lat, response[0].lon));
        response.forEach(function(place) {
          $('.showCity').append(`
          <ul>
            <li><h4>${place.display_name}</h4></li>
            <li> This location is classified as a ${place.class}.</li>
            <li>The latitude is ${place.lat}. </li>
            <li> The longitude is ${place.lon}. </li>
          </ul>
          <button type="button" class="btn btn-primary eachLocation">Show On Map</button>`);
          $('.showCity').append(marker);
          // $('.showIcon').append(`<p>Hello<img src="${place.icon}"></></p>`);
        })

      }
  });
});
