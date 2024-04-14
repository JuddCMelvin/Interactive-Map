// // function onButtonClick() {
// //     alert('Button clicked!');
// // }

// // const button = document.querySelector('button');
// // button.addEventListener('click', onButtonClick);
// // const newButton = document.createElement('button');
// // newButton.textContent = 'Select';
// // document.body.appendChild(newButton);

// // newButton.addEventListener('click', () => {
// //     console.log('Button clicked!');
// // });

// //Using leaflet
// async function getGeoLocation(){
// 	const pos = await new Promise((resolve, reject) => {
// 		navigator.geolocation.getCurrentPosition(resolve, reject)
// 	});
// 	return [pos.coords.latitude, pos.coords.longitude]
// }



// // Create map

// // const myMap = L.map('map', {
// // 	center: [48.868672, 2.342130],
// // 	zoom: 12,
// // });

// // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //     maxZoom: 19,
// //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// // }).addTo(myMap);


// // map object



// // get coordinates via geolocation api
// async function getCoords(){
// 	const pos = await new Promise((resolve, reject) => {
// 		navigator.geolocation.getCurrentPosition(resolve, reject)
// 	});
// 	return [pos.coords.latitude, pos.coords.longitude]
// }
// console.log(pos.coords.longitude)
// get foursquare businesses

// process foursquare array

// event handlers
// window load

// business submit button

const map = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

	buildMap() {
		this.map = L.map('map', {
			center: this.coordinates,
			zoom: 11,
			});

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.map);

		const marker = L.marker([coords[0], coords[1]])
			.addTo(this.map)
			.bindPopup('You are here')
			.openPopup();
	}

	//add business markers
}

// get coordinates via geolocation api
async function getCoords() {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    return [pos.coords.latitude, pos.coords.longitude]
}
// get foursquare businesses
async function getFoursquare(business) {
	const options = {
		method: 'GET',
		headers: {
		Accept: 'application/json',
		Authorization: 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8='
		}
	}
	let limit = 5
	let lat = myMap.coordinates[0]
	let lon = myMap.coordinates[1]
	let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses
}
window.onload = async () => {
    const coordinates = await getCoords()
    buildMap(coordinates)
}
