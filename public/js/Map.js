var map = L.map("map").setView([-8.53027, 115.32878], 16);

var locations = [
  ["I Made Muliawan", -8.526324823935981, 115.32384062831701],
  ["LOCATION_2", -8.531451451049767, 115.32725583148586],
  ["LOCATION_3", -8.53141956548507, 115.32715625956008],
  ["LOCATION_4", -8.530476577061219, 115.32797526884058],
  ["LOCATION_5", -8.530632712589393, 115.32794143694336],
];

for (var i = 0; i < locations.length; i++) {
  marker = new L.marker([locations[i][1], locations[i][2]])
    .bindPopup(locations[i][0])
    .addTo(map);
}

var tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);