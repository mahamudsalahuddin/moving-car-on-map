var markers = [
  [23.81426279756788, 90.40413862620731],
  [23.808106397946844, 90.40328323667977],
  [23.798141522836097, 90.40168671183021],
  [23.78979393341548, 90.40020439868736],
  [23.77941034563629, 90.39837976942222],
];

var map = L.map("map").setView([markers[2][0], markers[2][1]], 13);
let url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

L.tileLayer(url, {
  maxZoom: 19,
}).addTo(map);

var bikeIcon = L.icon({
  iconUrl: "car-solid.svg", // Replace with your bike icon URL
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

var bikeMarker = L.marker(markers[0], { icon: bikeIcon }).addTo(map);
var currentIndex = 0;

function moveBike() {
  if (currentIndex < markers.length - 1) {
    currentIndex++;
    var startLatLng = markers[currentIndex - 1];
    var endLatLng = markers[currentIndex];
    var duration = 2000;
    var startTime = null;

    function animate(time) {
      if (!startTime) startTime = time;
      var progress = (time - startTime) / duration;
      if (progress > 1) progress = 1;

      var lat = startLatLng[0] + (endLatLng[0] - startLatLng[0]) * progress;
      var lng = startLatLng[1] + (endLatLng[1] - startLatLng[1]) * progress;

      bikeMarker.setLatLng([lat, lng]);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        moveBike();
      }
    }

    requestAnimationFrame(animate);
  }
}

// L.marker(markers[0]).addTo(map);
// L.marker(markers[4]).addTo(map);

// Call the moveBike function to start the animation

for (var i = 0; i < markers.length; i++) {
  L.marker(markers[i]).addTo(map);
}
moveBike();
