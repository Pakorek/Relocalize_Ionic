import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { EventData, MapLayerEventType } from 'mapbox-gl';

export const loadMap = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoicGFrb3Jla2siLCJhIjoiY2txaHZja21zMGYyYzJ2cWp3a2FrZmNxNCJ9.Rr-LeqD0-XZ17Ta-1LfNTg';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [4.3986525, 44.815194], // starting position [lng, lat]
    zoom: 8,
  });


  map.on('load', function() {

    addDataLayer();

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: map,
      }),
    );

    // Add geolocate control to the map.
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    );

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());

    // switch layers
    let layerList = document.getElementById('menu');
    let inputs;

    function switchLayer(layer: any) {
      let layerId = layer.target.id;
      map.setStyle('mapbox://styles/mapbox/' + layerId);
    }

    if (layerList) {
      inputs = layerList.getElementsByTagName('input');

      for (let i = 0; i < inputs.length; i++) {
        inputs[i].onclick = switchLayer;
      }
    }

    map.on('style.load', function() {
      // Triggered when `setStyle` is called.
      addDataLayer();
    });

    // inspect a cluster on click                                                       --> to fix !!!
    /*  map.on('click', 'clusters', function(e: MapLayerEventType['click'] & EventData) {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        });
        if (features[0].properties) {
          const clusterId = features[0].properties.cluster_id;
          map.getSource('ardeche_cities').getClusterExpansionZoom(
            clusterId,
            function(err: any, zoom: any) {
              if (err) return;

              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            },
          );
        }
      })*/

    map.on('click', 'unclustered-point', function(e: MapLayerEventType['click'] & EventData) {
        type feature = {
          type: string,
          geometry: {
            type: string,
            coordinates: [number]
          },
          properties: {
            id: number,
            department_code: string,
            zip_code: string,
            location: string,
            day: string,
            day2?: string,
            day3?: string,
            day4?: string,
            from: string,
            from2?: string,
            from3?: string,
            from4?: string,
            to: string,
            to2?: string,
            to3?: string,
            to4?: string,
            info: string,
            info2?: string,
            info3?: string,
            info4?: string,
            name: string
          }
        }
        type features = [feature]
        if (e.features) {
          let coordinates = 'coordinates' in e.features[0].geometry ? e.features[0].geometry.coordinates.slice() : [];
          let name = e.features[0].properties ? e.features[0].properties.name : '';
          let zip_code = e.features[0].properties ? e.features[0].properties.zip_code : '';
          let properties = e.features[0].properties;

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          // @ts-ignore
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            // @ts-ignore
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          // Popup construct
          if (properties) {
            let location: string = properties.location ?? '';
            let location2: string = properties.location2 ?? '';
            let location3: string = properties.location3 ?? '';
            let location4: string = properties.location4 ?? '';

            let day: string = properties.day ?? '';
            let day2: string = properties.day2 ?? '';
            let day3: string = properties.day3 ?? '';
            let day4: string = properties.day4 ?? '';

            let from: string = properties.from ?? '';
            let from2: string = properties.from2 ?? '';
            let from3: string = properties.from3 ?? '';
            let from4: string = properties.from4 ?? '';

            let to: string = properties.to ?? '';
            let to2: string = properties.to2 ?? '';
            let to3: string = properties.to3 ?? '';
            let to4: string = properties.to4 ?? '';

            let info: string = properties.info ?? '';
            let info2: string = properties.info2 ?? '';
            let info3: string = properties.info3 ?? '';
            let info4: string = properties.info4 ?? '';

            new mapboxgl.Popup()
              .setLngLat(coordinates as any)
              .setHTML(
                '<strong>Marché de ' + name + ' - ' + zip_code + '</strong><br/>' +
                '<p>' + location + '</p>' +
                '<p>' + day + ' de ' + from + ' à ' + to + '</p>' +
                '<em>' + info + '</em>' +
                (day2 != ''
                  ? '<br><p>' + location2 + '</p>' +
                  '<p>' + day2 + ' de ' + from2 + ' à ' + to2 + '</p>' +
                  '<em>' + info2 + '</em>' +
                  (day3 != ''
                    ? '<br><p>' + location3 + '</p>' +
                    '<p>' + day3 + ' de ' + from3 + ' à ' + to3 + '</p>' +
                    '<em>' + info3 + '</em>' +
                    (day4 != ''
                      ? '<br><p>' + location4 + '</p>' +
                      '<p>' + day4 + ' de ' + from4 + ' à ' + to4 + '</p>' +
                      '<em>' + info4 + '</em>'
                      : '')
                    : '')
                  : ''),
              )
              .addTo(map);
          }
        }
      },
    );

    /*
      map.on('mouseenter', 'clusters', function() {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', function() {
        map.getCanvas().style.cursor = '';
      });
    */


    /*  let popup = new mapboxgl.Popup({ offset: 25 }).setText(
        'Marché de ' + city.name,
      );

      // create DOM element for the marker
      let el = document.createElement('div');
      el.className = 'marker';
      el.id = city.id;
      el.style.backgroundColor = 'black';
      el.style.width = marker.properties.iconSize[0] + 'px';
      el.style.height = marker.properties.iconSize[1] + 'px';

      el.addEventListener('click', function() {
        window.alert(marker.properties.message);
      });

      // create the marker
      let lngLat = [city.gps_lng, city.gps_lat];

      new mapboxgl.Marker(el)
        .setLngLat(lngLat)
        .setPopup(popup) // sets a popup on this marker
        .addTo(map);

      ++id;
      console.log(id, city.name);*/
  });


  function addDataLayer() {
    let hoveredStateId: string | number | null | undefined = null;

    map.addSource('ardeche_geojson', {
      'type': 'geojson',
      'data': './geojson/ardeche.geojson',
    });

    map.addLayer({
      'id': 'state-fills',
      'type': 'fill',
      'source': 'ardeche_geojson',
      'layout': {},
      'paint': {
        'fill-color': '#008000',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.2,
          0.5,
        ],
      },
    });

    /////////////////////////////////////////////////////////////////// HOVER EFFECT //////////////////////////
    map.on('mousemove', 'state-fills', function(e: MapLayerEventType['mousemove'] & EventData) {
      if (e.features) {
        if (e.features.length > 0) {
          if (hoveredStateId) {
            map.setFeatureState(
              { source: 'ardeche_geojson', id: hoveredStateId },
              { hover: false },
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: 'ardeche_geojson', id: hoveredStateId },
            { hover: true },
          );

        }
      }
    });

    map.on('mouseleave', 'state-fills', function() {
      if (hoveredStateId) {
        map.setFeatureState(
          { source: 'ardeche_geojson', id: hoveredStateId },
          { hover: false },
        );
      }
      hoveredStateId = null;
    });

    /*
      map.on('click', 'state-fills', function(e: MapLayerEventType['click'] & EventData) {
        if (e.features) {
          if (e.features.length > 0) {
            if (hoveredStateId) {
              map.setFeatureState(
                { source: 'ardeche_geojson', id: hoveredStateId },
                { hover: false },
              );
            }
            hoveredStateId = e.features[0].id;
            map.setFeatureState(
              { source: 'ardeche_geojson', id: hoveredStateId },
              { hover: true },
            );
            map.onclick = redirect();
          }
        }
      });
    */

    /*
      // GET ardeche_cities.json
      let request = new XMLHttpRequest();
      request.open('GET', 'geojson/ardeche_cities.json', false);
      request.send(null);
      let ardeche_cities = JSON.parse(request.responseText);
     */

    // construct clusters foreach cities
    map.addSource('ardeche_cities', {
      'type': 'geojson',
      'data': './geojson/features.geojson',
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });
    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'ardeche_cities',
      filter: ['has', 'point_count'],
      paint: {
        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#42DBA7',
          100,
          '#42DBA7',
          750,
          '#f28cb1',
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40,
        ],
      },
    });
    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'ardeche_cities',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12,
      },
    });
    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'ardeche_cities',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#42DBA7',
        // 'circle-color': '#4B6773',
        'circle-radius': 6,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#000',
      },
    });
  }
};

