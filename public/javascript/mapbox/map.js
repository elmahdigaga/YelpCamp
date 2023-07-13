mapboxgl.accessToken = mapboxToken;
var map = new mapboxgl.Map({
    container: "map",
    center: campground.geometry.coordinates,
    zoom: 10,
    style: "mapbox://styles/mapbox/outdoors-v12",
    hash: true,
});

const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
    `<h5>${campground.name}</h5>`
);

const marker = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(popup)
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl());
