const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = 'pk.eyJ1IjoibW9tb2IiLCJhIjoiY2o4YnJlMXZlMDEwdzMzbzB1bzMwNmhyaCJ9.iP2BkAmejYEP4qPuxiSBJw';

// console.log(fetch);

const map = new mapboxgl.Map({
  container: "map",
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/light-v9" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", [-74.009, 40.705]);
marker.addTo(map);

fetch("/api")
.then(res => res.json())
.then( (res) => {
	console.log(res);

	var parent = document.getElementById('hotels-choices');
	console.log(parent);
	res[0].forEach(function(hotels){
		var option = document.createElement("option");
		option.text = hotels.name;
		parent.append(option);
//it works! repeat for activities and restaurants
	})
})
.catch(console.err);


		// parent.append(option , hotels.name);

//find elements by id (mdn)
//find parent, crete element by id
//and append this child (hotel, attraction, etc)

//in the refactoring , we turn each of the hotels, activities, restaurent etc, into its own object
//we can call the object, and then run a forEach loop through the object, and fore
//each "hotel, or whatever", we create a child
//so we use parentNode.append, where we append the child, in this case, the individual
//hotel, 
//to the div options main parent, which is hotel-choices
//once it's appended, we can then see it within the options tags, 
//and it will show up on the dropdown
