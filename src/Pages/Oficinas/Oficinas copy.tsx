import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Oficina_Barra_Busca from "../../Components/Oficina_Barra_Busca/Oficina_Barra_Busca";
import Oficina_Oficina from "../../Components/Oficina_Oficina/Oficina_Oficina";
import Oficina_Oficina_Detalhes from "../../Components/Oficina_Oficina_Detalhes/Oficina_Oficina_Detalhes";
import Oficina_titulo_filtro from "../../Components/Oficina_titulo_filtro/Oficina_titulo_filtro";
import "./Oficinas.css";

const whiteMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#f0f0f0",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#f0f0f0",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#e0e0e0",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
];

const darkMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#484848",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8b8b8b",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];

const Oficinas = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedOficinaId, setSelectedOficinaId] = useState<string | null>(
    null
  );
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [clicouOficina, setClicouOficina] = useState(false);
  const [fechaOficinas, setFechaOficinas] = useState(true);

  const oficinaData = [
    {
      id: "1",
      imagem1:
        "https://res.cloudinary.com/dr0nki74e/image/upload/f_auto,q_auto/v1/vapt-vupt/oficinas/ce9ultwqzla5jjn04n7g",
      nome: "CENTRO AUTOMOTIVO - BELA VISTA - RUA PEDROSO",
      localizacao: "R PEDROSO, 394 - BELA VISTA - SAO PAULO - SP",
      referência: "AO LADO DO SUPERMERCADO MASTER",
      telefone: "(11) 2364-5797",
      CEP: "01322-010",
      atendimento:
        "DE SEG. A SEX. DAS 08:00 ÀS 18:00, SÁB. DAS 08:00 ÀS 12:00, EXCETO DOM. E FERIADOS",
      oficinaServices: [
        {
          services: [
            "ALINHAMENTO DE DIREÇÃO",
            "AR-CONDICIONADO (LIMPEZA E ASSEPSIA)",
            "BALANCEAMENTO DE RODAS",
            "BATERIA",
            "CABOS",
            "CALIBRAGEM DE PNEUS",
            "CAMBAGEM/CÁSTER",
            "CHECK-UP CENTRO AUTOMOTIVO",
            "CORREIAS DO MOTOR",
            "CRISTALIZAÇÃO DO PÁRA-BRISA*",
            "DIAGNÓSTICO DA BATERIA E ALTERNADOR*",
            "DIAGNÓSTICO DA INJEÇÃO ELETRÔNICA*",
            "DIAGNÓSTICO DA SUSPENSÃO E DIREÇÃO*",
            "DIAGNÓSTICO DE ÓLEO DE MOTOR",
            "DIAGNÓSTICO DO SISTEMA DE ARREFECIMENTO*",
            "DIAGNÓSTICO DO SISTEMA DE FREIO*",
            "DIAGNÓSTICO E RODÍZIO DE PNEUS*",
            "EMBREAGEM",
            "ESCAPAMENTOS",
            "EXTINTOR",
            "FILTROS",
            "PALHETAS LIMPADOR PÁRA-BRISA",
            "PNEUS",
            "REGULAGEM DO FOCO DOS FARÓIS*",
            "REPARO DE PNEUS",
            "REVISÃO DE LUZES*",
            "TROCA DE LÂMPADAS EXTERNAS",
            "TROCA DE PASTILHA DE FREIO DIANTEIRO",
          ],
        },
      ],
    },
    {
      id: "2",
      imagem1:
        "https://res.cloudinary.com/dr0nki74e/image/upload/f_auto,q_auto/v1/vapt-vupt/oficinas/yrb6s1yhvfdl4mwbfewz",
      nome: "CENTRO AUTOMOTIVO - RIO BRANCO",
      localizacao: "AV RIO BRANCO, 1448 - CAMPOS ELISEOS - SAO PAULO - SP",
      referência: "",
      telefone: "(11) 3221-6562",
      CEP: "01205-001",
      atendimento:
        "DE SEG. A SEX. DAS 08:00 ÀS 18:00, SÁB. DAS 08:00 ÀS 12:00, EXCETO DOM. E FERIADOS",
      oficinaServices: [
        {
          services: [
            "ALINHAMENTO DE DIREÇÃO",
            "AR-CONDICIONADO (LIMPEZA E ASSEPSIA)",
            "BALANCEAMENTO DE RODAS",
            "BATERIA",
            "CALIBRAGEM DE PNEUS",
            "CHECK-UP CENTRO AUTOMOTIVO",
            "CORREIAS DO MOTOR",
            "CRISTALIZAÇÃO DO PÁRA-BRISA*",
            "DIAGNÓSTICO DA BATERIA E ALTERNADOR*",
            "DIAGNÓSTICO DA INJEÇÃO ELETRÔNICA*",
            "DIAGNÓSTICO DA SUSPENSÃO E DIREÇÃO*",
            "DIAGNÓSTICO DO AMORTECEDOR E MOLAS*",
            "DIAGNÓSTICO DO SISTEMA DE ARREFECIMENTO*",
            "DIAGNÓSTICO DO SISTEMA DE FREIO*",
            "DIAGNÓSTICO DO ÓLEO DO MOTOR E FILTROS*",
            "DIAGNÓSTICO E RODÍZIO DE PNEUS*",
            "EMBREAGEM",
            "ESCAPAMENTOS",
            "EXTINTOR",
            "FILTROS",
            "PALHETAS LIMPADOR PÁRA-BRISA",
            "PNEUS",
            "REGULAGEM DO FOCO DOS FARÓIS",
            "REPARO DE PNEUS",
            "TROCA DE LÂMPADAS EXTERNAS",
            "TROCA DE PASTILHA DE FREIO DIANTEIRO",
          ],
        },
      ],
    },
    {
      id: "3",
      imagem1:
        "https://res.cloudinary.com/dr0nki74e/image/upload/f_auto,q_auto/v1/vapt-vupt/oficinas/dmt507oubejpefwakdfo",
      nome: "CENTRO AUTOMOTIVO - CANINDE GLOBAL",
      localizacao: "AV CRUZEIRO DO SUL, 607 - CANINDE - SAO PAULO - SP",
      referência: "",
      telefone: "(11) 3313-5005",
      CEP: "01109-000",
      atendimento:
        "DE SEG. A SEX. DAS 08:00 ÀS 18:00, SÁB. DAS 08:00 ÀS 12:00, EXCETO DOM. E FERIADOS",
      oficinaServices: [
        {
          services: [
            "ALINHAMENTO DE DIREÇÃO",
            "AR-CONDICIONADO (LIMPEZA E ASSEPSIA)",
            "BALANCEAMENTO DE RODAS",
            "BATERIA",
            "CABOS",
            "CALIBRAGEM DE PNEUS",
            "CAMBAGEM/CÁSTER",
            "CHECK-UP CENTRO AUTOMOTIVO",
            "CORREIAS DO MOTOR",
            "CRISTALIZAÇÃO DO PÁRA-BRISAS",
            "DIAGNÓSTICO DA BATERIA E ALTERNADOR*",
            "DIAGNÓSTICO DA INJEÇÃO ELETRÔNICA*",
            "DIAGNÓSTICO DA SUSPENSÃO E DIREÇÃO*",
            "DIAGNÓSTICO DO SISTEMA DE ARREFECIMENTO*",
            "DIAGNÓSTICO DO SISTEMA DE FREIO*",
            "DIAGNÓSTICO DO ÓLEO DO MOTOR E FILTROS*",
            "DIAGNÓSTICO E RODÍZIO DE PNEUS*",
            "EMBREAGEM",
            "ESCAPAMENTOS",
            "EXTINTOR",
            "FILTROS",
            "PALHETAS LIMPADOR PÁRA-BRISA",
            "PNEUS",
            "REGULAGEM DO FOCO DOS FARÓIS*",
            "REPARO DE PNEUS",
            "REVISÃO DE LUZES*",
            "TROCA DE LÂMPADAS EXTERNAS",
            "TROCA DE PASTILHA DE FREIO DIANTEIRO",
          ],
        },
      ],
    },
    {
      id: "4",
      imagem1:
        "https://res.cloudinary.com/dr0nki74e/image/upload/f_auto,q_auto/v1/vapt-vupt/oficinas/qgsk4liselx8yy2qlcv9",
      nome: "CENTRO AUTOMOTIVO - JARDINS",
      localizacao:
        "AV BRIGADEIRO LUIZ ANTONIO, 3383 - JARDIM PAULISTANO - SAO PAULO - SP",
      referência: "",
      telefone: "(11) 3051-8468",
      CEP: "01402-001",
      atendimento:
        "DE SEG. A SEX. DAS 08:00 ÀS 18:00, SÁB. DAS 08:00 ÀS 12:00, EXCETO DOM. E FERIADOS",
      oficinaServices: [
        {
          services: [
            "ALINHAMENTO DE DIREÇÃO",
            "AR-CONDICIONADO (LIMPEZA E ASSEPSIA)",
            "BALANCEAMENTO DE RODAS",
            "BATERIA",
            "CABOS",
            "CALIBRAGEM DE PNEUS",
            "CAMBAGEM/CÁSTER",
            "CORREIAS DO MOTOR",
            "CRISTALIZAÇÃO DO PÁRA-BRISA*",
            "DIAGNÓSTICO DA BATERIA E ALTERNADOR*",
            "DIAGNÓSTICO DA INJEÇÃO ELETRÔNICA*",
            "DIAGNÓSTICO DA SUSPENSÃO E DIREÇÃO*",
            "DIAGNÓSTICO DO SISTEMA DE ARREFECIMENTO*",
            "DIAGNÓSTICO DO SISTEMA DE FREIO*",
            "DIAGNÓSTICO DO ÓLEO DO MOTOR E FILTROS*",
            "DIAGNÓSTICO E RODÍZIO DE PNEUS*",
            "EMBREAGEM",
            "ESCAPAMENTOS",
            "EXTINTOR",
            "FILTROS",
            "PALHETAS LIMPADOR PÁRA-BRISA",
            "PNEUS",
            "REGULAGEM DO FOCO DOS FARÓIS*",
            "REPARO DE PNEUS",
            "REPARO VIDRO ELÉTRICO",
            "REVISÃO DE LUZES*",
            "TROCA DE LÂMPADAS EXTERNAS",
            "TROCA DE PASTILHA DE FREIO DIANTEIRO",
          ],
        },
      ],
    },
    {
      id: "5",
      imagem1:
        "https://res.cloudinary.com/dr0nki74e/image/upload/f_auto,q_auto/v1/vapt-vupt/oficinas/ezadedshphsiuciedfeh",
      nome: "CENTRO AUTOMOTIVO - VILA MARIANA",
      localizacao:
        "AV LINS DE VASCONCELOS, 2474 - VILA MARIANA - SAO PAULO - SP",
      referência: "PRÓXIMO AO SUPERMERCADO DIA",
      telefone: "(11) 3294-1040",
      CEP: "04112-001",
      atendimento:
        "DE SEG. A SEX. DAS 08:00 ÀS 18:00, SÁB. DAS 08:00 ÀS 12:00, EXCETO DOM. E FERIADOS",
      oficinaServices: [
        {
          services: [
            "ALINHAMENTO DE DIREÇÃO",
            "AR-CONDICIONADO (LIMPEZA E ASSEPSIA)",
            "BALANCEAMENTO DE RODAS",
            "BATERIA",
            "CABOS",
            "CALIBRAGEM DE PNEUS",
            "CAMBAGEM/CÁSTER",
            "CHECK-UP CENTRO AUTOMOTIVO",
            "CORREIAS DO MOTOR",
            "CRISTALIZAÇÃO DO PÁRA-BRISA*",
            "DIAGNÓSTICO DA BATERIA E ALTERNADOR*",
            "DIAGNÓSTICO DA INJEÇÃO ELETRÔNICA*",
            "DIAGNÓSTICO DA SUSPENSÃO E DIREÇÃO*",
            "DIAGNÓSTICO DE SUSPENSÃO",
            "DIAGNÓSTICO DO AMORTECEDOR E MOLAS*",
            "DIAGNÓSTICO DO SISTEMA DE ARREFECIMENTO*",
            "DIAGNÓSTICO DO SISTEMA DE FREIO*",
            "DIAGNÓSTICO DO ÓLEO DO MOTOR E FILTROS*",
            "DIAGNÓSTICO E RODÍZIO DE PNEUS*",
            "DIREÇÃO",
            "EMBREAGEM",
            "ESCAPAMENTOS",
            "EXTINTOR",
            "FILTROS",
            "PALHETAS LIMPADOR PÁRA-BRISA",
            "PNEUS",
            "REGULAGEM DO FOCO DOS FARÓIS*",
            "REPARO DE PNEUS",
            "REPARO VIDRO ELÉTRICO",
            "REVISÃO DE LUZES*",
            "TROCA DE LÂMPADAS EXTERNAS",
            "TROCA DE PASTILHA DE FREIO DIANTEIRO",
          ],
        },
      ],
    },
    // ... outras oficinas
  ];

  useEffect(() => {
    const handleClassChange = () => {
      const darkModeEnabled =
        document.documentElement.classList.contains("dark-mode");
      setIsDarkMode(darkModeEnabled);
    };

    // Set initial dark mode state
    handleClassChange();

    // Listen for changes in the class
    const observer = new MutationObserver(handleClassChange);
    observer.observe(document.documentElement, { attributes: true });

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  const handleOficinaClick = async (id: string) => {
    setSelectedOficinaId((prevId) => (prevId === id ? null : id));
    setClicouOficina(!clicouOficina);

    // Fetch coordinates for the selected oficina
    const selectedOficina = oficinaData.find((oficina) => oficina.id === id);
    if (selectedOficina && selectedOficina.localizacao) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            selectedOficina.localizacao
          )}&key=AIzaSyBs7NUNGoxc9piEik-7t8R0n6jBfdf8E38`
        );
        const location = response.data.results[0]?.geometry.location;
        if (location) {
          setCoordinates({
            lat: location.lat,
            lng: location.lng,
          });
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }
  };

  return (
    <>
      <section>
        <div className="div_oficinas">
          <div className="map">
            <LoadScript googleMapsApiKey="AIzaSyBs7NUNGoxc9piEik-7t8R0n6jBfdf8E38">
              <GoogleMap
                mapContainerStyle={{ height: "100%", width: "100%" }}
                center={coordinates || { lat: -23.5505, lng: -46.6333 }} // Default to São Paulo
                zoom={12}
                options={{
                  styles: isDarkMode ? darkMapStyle : whiteMapStyle,
                }}
              >
                {oficinaData.map((oficina) => (
                  <Marker
                    key={oficina.id}
                    position={{
                      lat: coordinates ? coordinates.lat : -23.5505, // Default if not fetched
                      lng: coordinates ? coordinates.lng : -46.6333,
                    }}
                    onClick={() => handleOficinaClick(oficina.id)}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>

          <div
            className={
              fechaOficinas
                ? "lista_oficinas"
                : "lista_oficinas fecha_lista_oficinas"
            }
          >
            <button
              className="fecha_oficinas"
              onClick={() => setFechaOficinas(!fechaOficinas)}
            >
              A
            </button>
            <div
              className={
                clicouOficina
                  ? "Oficina_Barra_Busca_div fecha_Oficina"
                  : "Oficina_Barra_Busca_div"
              }
            >
              <Oficina_Barra_Busca />
            </div>
            <div
              className={
                clicouOficina
                  ? "Oficina_titulo_filtro fecha_Oficina"
                  : "Oficina_titulo_filtro"
              }
            >
              <Oficina_titulo_filtro />
            </div>
            <div className="oficinas">
              {oficinaData.map((oficina) => (
                <React.Fragment key={oficina.id}>
                  <div
                    className={
                      clicouOficina
                        ? "abre_oficina fecha_Oficina"
                        : "abre_oficina"
                    }
                  >
                    <Oficina_Oficina
                      oficina={oficina}
                      onOficinaClick={handleOficinaClick}
                    />
                  </div>
                  {selectedOficinaId === oficina.id && (
                    <div
                      className={
                        clicouOficina
                          ? "fecha_oficina_detalhes abre_oficina_detalhes"
                          : "fecha_oficina_detalhes"
                      }
                    >
                      <Oficina_Oficina_Detalhes
                        key={`${oficina.id}-detalhes`}
                        oficina={oficina}
                        onOficinaClick={handleOficinaClick}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Oficinas;
