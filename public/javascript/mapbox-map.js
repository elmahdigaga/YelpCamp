mapboxgl.accessToken = mapboxToken;
var map = new mapboxgl.Map({
    container: "map",
    center: coordinates,
    zoom: 10,
    style: "mapbox://styles/mapbox/streets-v11",
    hash: true,
});

const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
