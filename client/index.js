const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = 'pk.eyJ1IjoibW9tb2IiLCJhIjoiY2o4YnJlMXZlMDEwdzMzbzB1bzMwNmhyaCJ9.iP2BkAmejYEP4qPuxiSBJw';

const map = new mapboxgl.Map({
  container: "map",
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/light-v9" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", [-74.009, 40.705]);
marker.addTo(map);

let attractionsObj;
const attractionTypes = ["hotels", "restaurants", "activities"];

fetch("/api")
.then( (res) => res.json() )
.then( (data) => {
	attractionTypes.forEach( (attractionType, i) => {
		attractionsObj = data;
		attractionsObj[i].forEach(attraction => {	
			const option = document.createElement("option");
			option.text = attraction.name;
			option.value = attraction.id;
			const parent = document.getElementById(`${attractionType}-choices`);
			parent.append(option);
		});
	});
	//appending one id element
	// var parentHotel = document.getElementById('hotels-choices');
	// attractions[0].forEach(function(hotels) {
	// 	var option = document.createElement("option");
	// 	option.text = hotels.name;
	// 	parentHotel.append(option);
	// })
});

attractionTypes.forEach(attractionType => {
	const btn = document.getElementById(`${attractionType}-add`);
	btn.onclick = function() {
		const select = document.getElementById(`${attractionType}-choices`);
		const selected = select.value;

		//create an element
		const itinItem = document.createElement("li");
		const attraction = attractionsObj[attractionType].find((el) => el.id == selected);
		itinItem.text = attraction.name;
		
		//remove button and remove item from bottom list
		const removeBtn = document.createElement("button");
		removeBtn.text = "x";
		removeBtn.onclick = () => {
			itinItem.remove();
			//remove marker
			marker.remove(map);
		};
		itinItem.append(removeBtn);


		//add to bottom list
		const itinList = document.getElementById(`${attractionType}-list`);
		itinList.appened(itinItem)
		//make marker
		const marker = buildMarker(attractionType, attraction.place.location);
		marker.addTo(map);
	};
});
