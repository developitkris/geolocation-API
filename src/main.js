

$(document).ready(function() {
  $('#geoLocation').click(function() {
    let geo = $('#location').val();
    $('#location').val("");
    console.log("The location is:" + geo);

    let request = new XMLHttpRequest();
    //let url = `https://us1.locationiq.org/v1/search.php?key=YOUR_API_KEY&q=SEARCH_STRING&format=json${city}&appid=${process.env.API_KEY}`;
    let url = `https://us1.locationiq.org/v1/search.php?key=${process.env.API_KEY}&q=${geo}&format=json`
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      } else if (this.readyState === 4 && this.status === 404) {
        let response = JSON.parse(this.responseText);
        getElements([]);
      }

    }

    request.open("GET", url, true);
    request.send();


      let getElements = function(response) {
        console.log(response);
        if(response.length != 0) {

        response.forEach(function(place) {
          $('.showCity').append(`<li>The  in ${geo} is ${place.display_name}</li>`);

        })
      } else {
        $('.showCity').append(`<li>NO places called ${geo} found.</li>`);
      }
        // $('.showType').text(`The neighborhood is a ${response.class} type.`);
        // $('.showName').text(`This address is ${response.display_name}.`);
        // $('.showLat').text(`The latitude is ${response.main.lat}.`);
        // $('.showLon').text(`The longitude is ${response.main.lon}.`);
        // $('.showIcon').text(`${response.main.icon}`);

      }
  });
});
