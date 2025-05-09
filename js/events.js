$(document).ready(function() {
    // Fetch events from JSON file
    $.ajax({
        url: 'data/events.json',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // Populate accordion
            data.forEach(function(event, index) {
                var eventHtml = '<h3 data-index="' + index + '"><span class="event-icon">🎷</span> ' + event.name + ' - ' + event.location + '</h3>' +
                    '<div>' +
                    '<p>' + event.description + '</p>' +
                    '<p><strong>Location:</strong> ' + event.location + '</p>' +
                    '<p><strong>Dates:</strong> ' + event.dates.join(', ') + '</p>' +
                    '<p><strong>Weather:</strong> <span id="weather-' + index + '">Loading...</span></p>' +
                    '<a href="contact.html" class="cta-button">Reserve Now</a>' +
                    '</div>';
                $('#accordion').append(eventHtml);

                // Fetch weather data for each event
                $.ajax({
                    url: 'https://api.openweathermap.org/data/2.5/weather',
                    type: 'GET',
                    data: {
                        lat: event.lat,
                        lon: event.lon,
                        appid: 'YOUR_API_KEY_HERE', // Replace with your OpenWeatherMap API key
                        units: 'metric'
                    },
                    success: function(weatherData) {
                        $('#weather-' + index).text(weatherData.weather[0].description + ', ' + weatherData.main.temp + '°C');
                    },
                    error: function() {
                        $('#weather-' + index).text('Weather unavailable');
                    }
                });
            });

            // Initialize accordion
            $('#accordion').accordion({
                collapsible: true,
                heightStyle: 'content',
                active: 0
            });

            // Initialize map
            var map = L.map('map').setView([39.0, 35.0], 6); // Center of Turkey
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            var markers = {};
            data.forEach(function(event, index) {
                var marker = L.marker([event.lat, event.lon]).addTo(map);
                marker.bindPopup(event.name + ' - ' + event.location);
                marker.on('click', function() {
                    $('#accordion').accordion('option', 'active', index);
                });
                markers[index] = marker;
            });

            // Sync accordion with map
            $('#accordion').on('accordionactivate', function(event, ui) {
                if (ui.newHeader.length) {
                    var index = ui.newHeader.data('index');
                    if (markers[index]) {
                        map.setView([data[index].lat, data[index].lon], 10);
                        markers[index].openPopup();
                    }
                }
            });
        },
        error: function() {
            alert('Failed to load events.');
        }
    });
});