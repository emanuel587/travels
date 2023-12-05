

    document.addEventListener("DOMContentLoaded", function () {
        const HERE_API_KEY =  "-FewRD8ilZccyoZS4NcDGVZ0xdupGKhtVDTsGFhrJf0";
      
        
            const lugarInput = document.getElementById('lugarInput');
            const buscarLugarBtn = document.getElementById('buscarLugar');
            const mapContainer = document.getElementById('map');
        
            // Inicialización del mapa
            const platform = new H.service.Platform({
                'apikey': HERE_API_KEY
            });
        
            const defaultLayers = platform.createDefaultLayers();
            const map = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
                center: { lat: 0, lng: 0 }, // Centro del mapa inicial
                zoom: 2 // Nivel de zoom inicial
            });
        
            const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
            const ui = H.ui.UI.createDefault(map, defaultLayers);
        
            buscarLugarBtn.addEventListener('click', function () {
                const lugar = lugarInput.value.trim();
                if (lugar !== '') {
                    buscarLugar(lugar);
                } else {
                    alert('Por favor, ingresa un nombre de lugar válido.');
                }
            });
        
            function buscarLugar(lugar) {
                const geocodingService = platform.getSearchService();
        
                geocodingService.geocode({ q: lugar })
                    .then(result => {
                        const location = result.items[0].position;
                        console.log('Coordenadas:', location.lat, location.lng);
        
                        // Puedes agregar lógica adicional aquí, como colocar un marcador en el mapa
                        const marker = new H.map.Marker({ lat: location.lat, lng: location.lng });
                        map.addObject(marker);
                        map.setCenter({ lat: location.lat, lng: location.lng });
                        map.setZoom(15); // Puedes ajustar el nivel de zoom según tus necesidades
                    })
                    .catch(error => {
                        console.error('Error al buscar el lugar:', error);
                        alert('Error al buscar el lugar.');
                    });
            }
        });
        