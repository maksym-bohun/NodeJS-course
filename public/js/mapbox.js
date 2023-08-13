// const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFrcy1ib2h1biIsImEiOiJjbGw2Y3d6aHowYXhpM3FxajhuZHNwYzdqIn0.eCqul1WurPad8xMn-Y6WdA';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});
