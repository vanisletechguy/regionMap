import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESSTOKEN; 
const Map = ({ regions, onRegionClick }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [hoveredRegionId, setHoveredRegionId] = useState(null);

    useEffect(() => {
        if (map.current) return; // Initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-123.936, 49.163], 
            zoom: 13,
        });

        map.current.on('load', () => {
            map.current.addSource('regions', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: regions.map(region => ({
                        type: 'Feature',
                        properties: { id: region.id },
                        geometry: {
                            type: 'Polygon',
                            coordinates: [region.positions],
                        },
                    })),
                },
            });

            map.current.addLayer({
                id: 'regions-layer',
                type: 'fill',
                source: 'regions',
                layout: {},
                paint: {
                    'fill-color': [
                        'case',
                        ['==', ['get', 'id'], hoveredRegionId],
                        '#f00', // Color when hovered
                        '#088'  // Default color
                    ],
                    'fill-opacity': 0.4,
                },
            });

            map.current.addLayer({
                id: 'regions-layer-outline',
                type: 'line',
                source: 'regions',
                layout: {},
                paint: {
                    'line-color': '#000',
                    'line-width': 1,
                },
            });

            map.current.on('click', 'regions-layer', (e) => {
                const regionId = e.features[0].properties.id;
                onRegionClick(regionId);
            });

            map.current.on('mousemove', 'regions-layer', (e) => {
                if (e.features.length > 0) {
                    const regionId = e.features[0].properties.id;
                    if (hoveredRegionId !== regionId) {
                        setHoveredRegionId(regionId);
                    }
                }
            });

            map.current.on('mouseleave', 'regions-layer', () => {
                setHoveredRegionId(null);
            });

            map.current.on('mouseenter', 'regions-layer', () => {
                map.current.getCanvas().style.cursor = 'pointer';
            });

            map.current.on('mouseleave', 'regions-layer', () => {
                map.current.getCanvas().style.cursor = '';
            });
        });

        return () => map.current.remove();
    }, []);

    useEffect(() => {
        if (!map.current || !map.current.getLayer('regions-layer')) return;

        map.current.setPaintProperty('regions-layer', 'fill-color', [
            'case',
            ['==', ['get', 'id'], hoveredRegionId],
            '#f00', // Color when hovered
            '#088'  // Default color
        ]);
    }, [hoveredRegionId]);

    return <div ref={mapContainer} className="map-container" />;
};

export default Map;

