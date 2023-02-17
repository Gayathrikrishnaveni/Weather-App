let lat;
let lon;
let loctionName  = document.getElementById("locationName");
let icon = document.getElementById("icon");
let desc = document.getElementById("description");
let temperature = document.getElementById("temp");
let minTemp = document.getElementById("minTemp");
let maxTemp = document.getElementById("maxTemp");
let WindSpeed = document.getElementById("speed");

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(lat,lon);
        let data = await getWeatherData(lat,lon);
        var map = L.map('map').setView([lat,lon], 5);
        
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([lat,lon]).addTo(map);
marker.bindPopup(`<b>${data.name}<b/>`).openPopup();

map.on('click', async function(e) {
    const data = await getWeatherData(e.latlng.lat, e.latlng.lng);
    marker.setLatLng([e.latlng.lat, e.latlng.lng]);
    marker.bindPopup(`<b>${data.name}</b>`).openPopup();

});
        return data;
    })

};
async function getWeatherData(lat,lon){
    let api =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=1d0a4818b554932d174c29facf32f16f`

    let response = await fetch(api)
    let data = await response.json();

    console.log(data);
    dataHandler(data);
    return data;


}

function dataHandler(data){
    const{temp}=data.main;
    const{description} = data.weather[0];
    const{temp_min,temp_max} = data.main;
    const{speed} = data.wind;

    locationName.innerHTML = data.name;
    desc.innerHTML = description;
    temperature.innerHTML = temp;
    minTemp.innerHTML = "Min_Temp: "+temp_min;
    maxTemp.innerHTML = "Max_Temp: "+temp_max;
    WindSpeed.innerHTML = speed;

}