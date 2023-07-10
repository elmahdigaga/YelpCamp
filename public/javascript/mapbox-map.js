const mapboxToken = document
    .getElementById("mapbox-map-script")
    .getAttribute("mapbox-token");

const campground = document
    .getElementById("mapbox-map-script")
    .getAttribute("campground");

mapboxgl.accessToken = mapboxToken;
var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: campground.geometry.coordinates,
    zoom: 10,
});

new mapboxgl.Marker().setLngLat(campground.geometry.coordinates).addTo(map);
