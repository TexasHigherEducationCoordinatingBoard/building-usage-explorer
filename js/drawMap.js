
// initialize the mapbox map here
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obmRpbm5pbmciLCJhIjoiY2oxazR5NjNvMDFveDJ5b2FzbWZwbjFpbiJ9.bixlFwP8Kf43qHa7Z6XK8g';

var map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/mapbox/light-v9",
    center: [-97.15, 33.21],
    zoom: 16.1,
    maxZoom: 19,
    minZoom: 3,
    pitch: 55,
    bearing: -17.6,
    maxBounds: [[-140, 15], [-60, 45]]
});

var time = [
    '7:00am',
    '8:00am',
    '9:00am',
    '10:00am',
    '11:00am',
    '12:00pm',
    '1:00pm',
    '2:00pm',
    '3:00pm',
    '4:00pm',
    '5:00pm',
    '6:00pm',
    '7:00pm',
    '8:00pm',
    '9:00pm',
    '10:00pm',
    '11:00pm',
];

var timeObj = {
    '7:00am': 'HOUR7',
    '8:00am': 'HOUR8',
    '9:00am': 'HOUR9',
    '10:00am': 'HOUR10',
    '11:00am': 'HOUR11',
    '12:00pm': 'HOUR12',
    '1:00pm': 'HOUR13',
    '2:00pm': 'HOUR14',
    '3:00pm': 'HOUR15',
    '4:00pm': 'HOUR16',
    '5:00pm': 'HOUR17',
    '6:00pm': 'HOUR18',
    '7:00pm': 'HOUR19',
    '8:00pm': 'HOUR20',
    '9:00pm': 'HOUR21',
    '10:00pm': 'HOUR22',
    '11:00pm': 'HOUR23',
};





map.on('load', function () {
    map.addControl(new mapboxgl.NavigationControl({ position: 'top-right' }));
    map.addLayer({
        'id': 'mondayLayer',
        'type': 'fill-extrusion',
        'source': {
            type: 'geojson',
            data: monGeojson
        },
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-extrusion-color': ["rgb",
                0,
                ['*', 255, ["/", ["get", "HOUR8"], ["get", "MaxEnr"]]],
                0
            ],
            'fill-extrusion-height': ['get', 'Height'],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.6
        },
    }, 'waterway-label');

    map.addLayer({
        'id': 'tuesdayLayer',
        'type': 'fill-extrusion',
        'source': {
            type: 'geojson',
            data: tueGeojson
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-extrusion-color': ["rgb",
                0,
                ['*', 255, ["/", ["get", "HOUR7"], ["get", "MaxEnr"]]],
                0
            ],
            'fill-extrusion-height': ['get', 'Height'],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.6
        },
    }, 'waterway-label');

    map.addLayer({
        'id': 'wednesdayLayer',
        'type': 'fill-extrusion',
        'source': {
            type: 'geojson',
            data: wedGeojson
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-extrusion-color': ["rgb",
                0,
                ['*', 255, ["/", ["get", "HOUR7"], ["get", "MaxEnr"]]],
                0
            ],
            'fill-extrusion-height': ['get', 'Height'],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.6
        },
    }, 'waterway-label');

    map.addLayer({
        'id': 'thursdayLayer',
        'type': 'fill-extrusion',
        'source': {
            type: 'geojson',
            data: thuGeojson
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-extrusion-color': ["rgb",
                0,
                ['*', 255, ["/", ["get", "HOUR7"], ["get", "MaxEnr"]]],
                0
            ],
            'fill-extrusion-height': ['get', 'Height'],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.6
        },
    }, 'waterway-label');

    map.addLayer({
        'id': 'fridayLayer',
        'type': 'fill-extrusion',
        'source': {
            type: 'geojson',
            data: friGeojson
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-extrusion-color': ["rgb",
                0,
                ['*', 255, ["/", ["get", "HOUR7"], ["get", "MaxEnr"]]],
                0
            ],
            'fill-extrusion-height': ['get', 'Height'],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.6
        },
    }, 'waterway-label');

    map.addLayer({
        'id': 'saturdayLayer',
        'type': 'fill-extrusion',
        'source': {
            type: 'geojson',
            data: satGeojson
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-extrusion-color': ["rgb",
                0,
                ['*', 255, ["/", ["get", "HOUR7"], ["get", "MaxEnr"]]],
                0
            ],
            'fill-extrusion-height': ['get', 'Height'],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.6
        },
    }, 'waterway-label');

});

clickedLayer = ['mondayLayer'];

//set default time for hour element in legend
document.getElementById('hour').textContent = '8:00am';

function setTime(hour) {
    // Set the text of the hour label
    document.getElementById('hour').textContent = time[hour];
    enr = timeObj[time[hour]];
    expression = ['*', 255, ["/", ["get", enr], ["get", "MaxEnr"]]]

    map.setPaintProperty(clickedLayer[0], 'fill-extrusion-color', ["rgb", 0, expression, 0]);
}

document.getElementById('slider').addEventListener('input', function (e) {
    var position = e.target.value;
    setTime(position)
});


//Day of the week selector
function clearSelected(id) {
    days = document.getElementsByClassName("weekday");
    for (var i = 0; i < days.length; i++) {
        days[i].checked = false;
    }
    document.getElementById(id).checked = true;

    map.setLayoutProperty(clickedLayer[0],'visibility','none');
    clickedLayer.pop();
    clickedLayer.push(id +"Layer");
    map.setLayoutProperty(id + "Layer",'visibility','visible');
        
    hour = document.getElementById('slider').value
    setTime(hour);
}






