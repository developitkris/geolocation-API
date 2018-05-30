

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
      }
    }

    request.open("GET", url, true);
    request.send();


      let getElements = function(response) {
        console.log(response);
        response.forEach(function(place) {
          $('.showCity').append(`<ul><h4>${geo}</h4><li> ${geo} is located in ${place.display_name} </li><li> This location is classified as a ${place.class}.</li><li> The latitude is ${place.lat}. </li><li> The longitude is ${place.lon}. </li></ul>`);
          $('.showIcon').append(`<p>Hello<img src="${place.icon}"></></p>`);
        })

      }
  });
});
