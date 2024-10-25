/* import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const API_KEY = 'AIzaSyBs7NUNGoxc9piEik-7t8R0n6jBfdf8E38';

interface CarService {
  id: number;
  name: string;
  location: google.maps.LatLngLiteral;
  phoneNumber?: string;
  cep?: string;
  openingHours?: string;
}

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [carServices, setCarServices] = useState<CarService[]>([]);
  const [selectedService, setSelectedService] = useState<CarService | null>(null);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);
  const [visibleServices, setVisibleServices] = useState<CarService[]>([]);
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    // Fetch nearby car services when user location is available
    if (userLocation) {
      fetchNearbyCarServices();
    }
  }, [userLocation]);

  const fetchNearbyCarServices = async () => {
    const carServices: CarService[] = [
      { id: 1, name: "CENTRO AUTOMOTIVO - BELA VISTA", location: { lat: -23.5681, lng: -46.6453 } },
      { id: 2, name: "CENTRO AUTOMOTIVO - RIO BRANCO", location: { lat: -23.5364, lng: -46.6425 } },
      { id: 3, name: "CENTRO AUTOMOTIVO - CANINDE GLOBAL", location: { lat: -23.5271, lng: -46.6253 } },
      { id: 4, name: "CENTRO AUTOMOTIVO - JARDINS", location: { lat: -23.5707, lng: -46.6566 } },
      { id: 5, name: "CENTRO AUTOMOTIVO - VILA MARIANA", location: { lat: -23.5869, lng: -46.6229 } },
      { id: 6, name: "CENTRO AUTOMOTIVO - MOOCA", location: { lat: -23.5497, lng: -46.5989 } },
      { id: 7, name: "CENTRO AUTOMOTIVO - BARRA FUNDA", location: { lat: -23.5259, lng: -46.6659 } },
      { id: 8, name: "CENTRO AUTOMOTIVO - CARDEAL ARCOVERDE", location: { lat: -23.5648, lng: -46.6778 } },
      { id: 9, name: "CENTRO AUTOMOTIVO - IBIRAPUERA", location: { lat: -23.5997, lng: -46.6630 } },
      { id: 10, name: "CENTRO AUTOMOTIVO - AVENIDA SUMARÉ", location: { lat: -23.5379, lng: -46.6811 } },
      { id: 11, name: "CENTRO AUTOMOTIVO - IPIRANGA", location: { lat: -23.5950, lng: -46.6068 } },
      { id: 12, name: "CENTRO AUTOMOTIVO - CASA VERDE", location: { lat: -23.5047, lng: -46.6584 } },
      { id: 13, name: "CENTRO AUTOMOTIVO - INDIANÓPOLIS", location: { lat: -23.6011, lng: -46.6486 } },
      { id: 14, name: "CENTRO AUTOMOTIVO - ITAIM BIBI", location: { lat: -23.5846, lng: -46.6766 } },
      { id: 15, name: "CENTRO AUTOMOTIVO - PINHEIROS", location: { lat: -23.5662, lng: -46.6847 } },
      { id: 16, name: "CENTRO AUTOMOTIVO - ANALIA FRANCO", location: { lat: -23.5661, lng: -46.5561 } },
      { id: 17, name: "CENTRO AUTOMOTIVO - TATUAPE TUIUTI", location: { lat: -23.5397, lng: -46.5768 } },
      { id: 18, name: "CENTRO AUTOMOTIVO - VILA MARIA", location: { lat: -23.5099, lng: -46.6121 } },
      { id: 19, name: "CENTRO AUTOMOTIVO - TATUAPÉ TIJUCO PRETO", location: { lat: -23.5376, lng: -46.5744 } },
      { id: 20, name: "CENTRO AUTOMOTIVO - MOEMA JAMARIS", location: { lat: -23.6095, lng: -46.6624 } },
      { id: 21, name: "CENTRO AUTOMOTIVO - SANTANA", location: { lat: -23.4999, lng: -46.6284 } },
      { id: 22, name: "CENTRO AUTOMOTIVO - BOSQUE DA SAÚDE", location: { lat: -23.6138, lng: -46.6228 } },
      { id: 23, name: "CENTRO AUTOMOTIVO - CERRO CORÁ", location: { lat: -23.5466, lng: -46.7144 } },
      { id: 24, name: "CENTRO AUTOMOTIVO - VILA PRUDENTE", location: { lat: -23.5841, lng: -46.5792 } },
      { id: 25, name: "CENTRO AUTOMOTIVO - SAÚDE", location: { lat: -23.6196, lng: -46.6222 } },
      { id: 26, name: "CENTRO AUTOMOTIVO - LAPA", location: { lat: -23.5224, lng: -46.7018 } },
      { id: 27, name: "CENTRO AUTOMOTIVO - BANDEIRANTES PLANALTO PAULISTA", location: { lat: -23.6309, lng: -46.6584 } },
      { id: 28, name: "CENTRO AUTOMOTIVO - CAMPO BELO CONGONHAS", location: { lat: -23.6214, lng: -46.6625 } },
      { id: 29, name: "CENTRO AUTOMOTIVO - TUCURUVI", location: { lat: -23.4799, lng: -46.6066 } },
      { id: 30, name: "CENTRO AUTOMOTIVO - CARRAO", location: { lat: -23.5569, lng: -46.5392 } },
      { id: 31, name: "CENTRO AUTOMOTIVO - BUTANTÃ", location: { lat: -23.5690, lng: -46.7157 } },
      { id: 32, name: "CENTRO AUTOMOTIVO - CONCEIÇÃO", location: { lat: -23.6358, lng: -46.6478 } },
      { id: 33, name: "CENTRO AUTOMOTIVO - FREGUESIA DO Ó", location: { lat: -23.4843, lng: -46.6929 } },
      { id: 34, name: "CENTRO AUTOMOTIVO - JAÇANÃ", location: { lat: -23.4584, lng: -46.5790 } },
      { id: 35, name: "CENTRO AUTOMOTIVO - SÃO CAETANO DO SUL CERAMICA", location: { lat: -23.6195, lng: -46.5735 } },
      { id: 36, name: "CENTRO AUTOMOTIVO - EDGAR FACO", location: { lat: -23.4799, lng: -46.7329 } },
      { id: 37, name: "CENTRO AUTOMOTIVO - BROOKLIN", location: { lat: -23.6246, lng: -46.7016 } },
      { id: 38, name: "CENTRO AUTOMOTIVO - TREMEMBÉ", location: { lat: -23.4584, lng: -46.5790 } },
      { id: 39, name: "CENTRO AUTOMOTIVO - PENHA AMADOR", location: { lat: -23.5261, lng: -46.5452 } },
      { id: 40, name: "CENTRO AUTOMOTIVO - WASHINGTON LUIS", location: { lat: -23.6456, lng: -46.6686 } },
      { id: 41, name: "CENTRO AUTOMOTIVO - VILA SÔNIA", location: { lat: -23.5941, lng: -46.7359 } },
      { id: 42, name: "CENTRO AUTOMOTIVO - VILA MASCOTE", location: { lat: -23.6456, lng: -46.6686 } },
      { id: 43, name: "CENTRO AUTOMOTIVO - PENHA TIQUATIRA", location: { lat: -23.5261, lng: -46.5452 } },
      { id: 44, name: "CENTRO AUTOMOTIVO - LEOPOLDINA", location: { lat: -23.5224, lng: -46.7018 } },
      { id: 45, name: "CENTRO AUTOMOTIVO - CHÁCARA SANTO ANTÔNIO", location: { lat: -23.6456, lng: -46.7016 } },
      { id: 46, name: "CENTRO AUTOMOTIVO - USP AV. CORIFEU", location: { lat: -23.5690, lng: -46.7359 } },
      { id: 47, name: "CENTRO AUTOMOTIVO - BONFIGLIOLI", location: { lat: -23.5941, lng: -46.7359 } },
      { id: 48, name: "CENTRO AUTOMOTIVO - SÃO BERNARDO DO CAMPO TABOÃO", location: { lat: -23.6738, lng: -46.5652 } },
      { id: 49, name: "CENTRO AUTOMOTIVO - VILA MATILDE", location: { lat: -23.5397, lng: -46.5392 } },
      { id: 50, name: "CENTRO AUTOMOTIVO - PARQUE SAO DOMINGOS", location: { lat: -23.4799, lng: -46.7329 } },
      { id: 51, name: "CENTRO AUTOMOTIVO - SANTO AMARO", location: { lat: -23.6456, lng: -46.7016 } },
      { id: 52, name: "CENTRO AUTOMOTIVO - PORTAL DO MORUMBI", location: { lat: -23.6246, lng: -46.7359 } },
      { id: 53, name: "CENTRO AUTOMOTIVO - SBC / RUDGE RAMOS", location: { lat: -23.6738, lng: -46.5652 } },
      { id: 54, name: "CENTRO AUTOMOTIVO - GUARULHOS TIMOTEO", location: { lat: -23.4632, lng: -46.5335 } },
      { id: 55, name: "CENTRO AUTOMOTIVO - MORUMBI", location: { lat: -23.6246, lng: -46.7359 } },
      { id: 56, name: "CENTRO AUTOMOTIVO - ANHAIA MELLO", location: { lat: -23.5841, lng: -46.5392 } },
      { id: 57, name: "CENTRO AUTOMOTIVO - DIADEMA", location: { lat: -23.6867, lng: -46.6201 } },
      { id: 58, name: "CENTRO AUTOMOTIVO - INTERLAGOS SABARA", location: { lat: -23.6814, lng: -46.6986 } },
      { id: 59, name: "CENTRO AUTOMOTIVO - JOÃO XXIII", location: { lat: -23.5941, lng: -46.7659 } },
      { id: 60, name: "CENTRO AUTOMOTIVO - OSASCO CENTRO", location: { lat: -23.5324, lng: -46.7916 } },
      { id: 61, name: "CENTRO AUTOMOTIVO - OSASCO VILA MENCK", location: { lat: -23.5046, lng: -46.7916 } },
      { id: 62, name: "CENTRO AUTOMOTIVO - STO ANDRÉ/UNIDAS", location: { lat: -23.6639, lng: -46.5320 } },
      { id: 63, name: "CENTRO AUTOMOTIVO - TABOÃO DA SERRA / BR", location: { lat: -23.6196, lng: -46.7916 } },
      { id: 64, name: "CENTRO AUTOMOTIVO - PIRAPORINHA", location: { lat: -23.6867, lng: -46.6201 } },
      { id: 65, name: "CENTRO AUTOMOTIVO - OSASCO JAGUARIBE", location: { lat: -23.5324, lng: -46.7916 } },
      { id: 66, name: "CENTRO AUTOMOTIVO - SANTO ANDRE", location: { lat: -23.6639, lng: -46.5320 } },
      { id: 67, name: "CENTRO AUTOMOTIVO - CIDADE LIDER", location: { lat: -23.5569, lng: -46.4872 } },
      { id: 68, name: "CENTRO AUTOMOTIVO - SÃO MATEUS", location: { lat: -23.6122, lng: -46.4872 } },
      { id: 69, name: "CENTRO AUTOMOTIVO - HORTO DO YPÊ", location: { lat: -23.6814, lng: -46.7659 } },
      { id: 70, name: "CENTRO AUTOMOTIVO - OSASCO HELENA MARIA", location: { lat: -23.5046, lng: -46.7916 } },
      { id: 71, name: "CENTRO AUTOMOTIVO - SANTO ANDRÉ VILA PIRES", location: { lat: -23.6639, lng: -46.5320 } },
      { id: 72, name: "CENTRO AUTOMOTIVO - AUTÓDROMO", location: { lat: -23.7012, lng: -46.6986 } },
      { id: 73, name: "CENTRO AUTOMOTIVO - GUARULHOS PRAÇA OITO", location: { lat: -23.4632, lng: -46.5335 } },
      { id: 74, name: "CENTRO AUTOMOTIVO - PARQUE IPE", location: { lat: -23.5941, lng: -46.7659 } },
      { id: 75, name: "CENTRO AUTOMOTIVO - SBC / ASSUNÇÃO", location: { lat: -23.7194, lng: -46.5652 } },
      { id: 76, name: "CENTRO AUTOMOTIVO - SBC / CENTRO", location: { lat: -23.6938, lng: -46.5652 } },
      { id: 77, name: "CENTRO AUTOMOTIVO - GUARULHOS CUMBICA", location: { lat: -23.4387, lng: -46.4872 } },
      { id: 78, name: "CENTRO AUTOMOTIVO - ITAQUERA", location: { lat: -23.5569, lng: -46.4572 } },
      { id: 79, name: "CENTRO AUTOMOTIVO - SBC / DEMARCHI", location: { lat: -23.7194, lng: -46.5652 } },
      { id: 80, name: "CENTRO AUTOMOTIVO - CARAPICUIBA", location: { lat: -23.5224, lng: -46.8359 } },
      { id: 81, name: "CENTRO AUTOMOTIVO - GRANJA VIANA", location: { lat: -23.5941, lng: -46.8359 } },
      { id: 82, name: "CENTRO AUTOMOTIVO - ALPHAVILLE", location: { lat: -23.4843, lng: -46.8659 } },
      { id: 83, name: "CENTRO AUTOMOTIVO - TAMBORE", location: { lat: -23.4843, lng: -46.8359 } },
      { id: 84, name: "CENTRO AUTOMOTIVO - CARAPICUIBA VILA CALDAS", location: { lat: -23.5224, lng: -46.8359 } },
      { id: 85, name: "CENTRO AUTOMOTIVO - MAUA", location: { lat: -23.6639, lng: -46.4612 } },
      { id: 86, name: "CENTRO AUTOMOTIVO - GUAIANAZES", location: { lat: -23.5569, lng: -46.4272 } },
      { id: 87, name: "CENTRO AUTOMOTIVO - CAIEIRAS", location: { lat: -23.3662, lng: -46.7459 } },
      { id: 88, name: "CENTRO AUTOMOTIVO - ITAIM PAULISTA", location: { lat: -23.5024, lng: -46.4022 } },
      { id: 89, name: "CENTRO AUTOMOTIVO - EMBU DAS ARTES", location: { lat: -23.6486, lng: -46.8520 } },
      { id: 90, name: "CENTRO AUTOMOTIVO - ITAPECERICA DA SERRA", location: { lat: -23.7168, lng: -46.8490 } },
    ];
    setCarServices(carServices);
  };

  const fetchCarServiceDetails = async (service: CarService) => {
    if (!placesService) return;

    const request = {
      query: service.name,
      fields: ['place_id'],
      locationBias: service.location,
    };

    placesService.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
        const placeId = results[0].place_id;
        
        const detailsRequest = {
          placeId: placeId!,
          fields: ['formatted_phone_number', 'formatted_address', 'opening_hours']
        } as google.maps.places.PlaceDetailsRequest;

        placesService.getDetails(detailsRequest, (place, detailsStatus) => {
          if (detailsStatus === google.maps.places.PlacesServiceStatus.OK && place) {
            const updatedService: CarService = {
              ...service,
              phoneNumber: place.formatted_phone_number,
              cep: place.formatted_address?.match(/\d{5}-\d{3}/)?.[0],
              openingHours: place.opening_hours?.weekday_text?.join(', '),
            };
            setCarServices(prevServices =>
              prevServices.map(s => (s.id === service.id ? updatedService : s))
            );
          }
        });
      }
    });
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const onMapLoad = (map: google.maps.Map) => {
    setPlacesService(new google.maps.places.PlacesService(map));
    map.addListener('bounds_changed', () => {
      setMapBounds(map.getBounds() || null);
    });
  };

  useEffect(() => {
    if (mapBounds) {
      const visible = carServices.filter((service) =>
        mapBounds.contains(service.location)
      );
      setVisibleServices(visible);
    }
  }, [mapBounds, carServices]);

  return (
    <div>
      <LoadScript googleMapsApiKey={API_KEY} libraries={['places']}>
        {userLocation && (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation}
            zoom={14}
            onLoad={onMapLoad}
          >

            <Marker position={userLocation} />


            {carServices.map((service) => (
              <Marker
                key={service.id}
                position={service.location}
                onClick={() => setSelectedService(service)}
              />
            ))}


            {selectedService && (
              <InfoWindow
                position={selectedService.location}
                onCloseClick={() => setSelectedService(null)}
              >
                <div>
                  <h3>{selectedService.name}</h3>
                  {selectedService.phoneNumber && <p>Phone: {selectedService.phoneNumber}</p>}
                  {selectedService.cep && <p>CEP: {selectedService.cep}</p>}
                  {selectedService.openingHours && <p>Hours: {selectedService.openingHours}</p>}
                  {!selectedService.phoneNumber && (
                    <button onClick={() => fetchCarServiceDetails(selectedService)}>
                      Load Details
                    </button>
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </LoadScript>
      
      <div>
        <h2>Visible Car Services</h2>
        <ul>
          {visibleServices.map((service) => (
            <li key={service.id}>
              <h3>{service.name}</h3>
              {service.phoneNumber && <p>Phone: {service.phoneNumber}</p>}
              {service.cep && <p>CEP: {service.cep}</p>}
              {service.openingHours && <p>Hours: {service.openingHours}</p>}
              {!service.phoneNumber && (
                <button onClick={() => fetchCarServiceDetails(service)}>
                  Load Details
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapComponent;
 */
