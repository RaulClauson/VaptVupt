/* import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const API_KEY = "AIzaSyBs7NUNGoxc9piEik-7t8R0n6jBfdf8E38";

interface CarService {
  name: string;
  location: google.maps.LatLngLiteral;
  phoneNumber?: string;
  cep?: string;
  openingHours?: string;
  servicos?: string[]; // Add this line
}

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [carServices, setCarServices] = useState<CarService[]>([]);
  const [selectedService, setSelectedService] = useState<CarService | null>(
    null
  );
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(
    null
  );
  const [visibleServices, setVisibleServices] = useState<CarService[]>([]);
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

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
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
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
      {
        name: "VR CAR SERVICOS AUTOMOTIVOS",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.6733025,
          lng: -46.71466040000001,
        },
      },
      {
        name: "BAZUCAR",
        servicos: ["Multimarcas", "Funilaria e pintura", "Martelinho de ouro"],
        location: {
          lat: -24.0064196,
          lng: -46.4231077,
        },
      },
      {
        name: "ELITE REPARADORA DE VEICULOS",
        servicos: ["Multimarcas", "Funilaria e pintura", "Martelinho de ouro"],
        location: {
          lat: -24.007761,
          lng: -46.4345182,
        },
      },
      {
        name: "CRV FUNILARIA",
        servicos: ["Multimarcas"],
        location: {
          lat: -23.2144088,
          lng: -46.7913436,
        },
      },
      {
        name: "ANDER AUTO REPAIR",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5303362,
          lng: -46.7851986,
        },
      },
      {
        name: "ALTO GIRO",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5169369,
          lng: -47.4679331,
        },
      },
      {
        name: "BPR FUNILARIA E PINTURA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5486129,
          lng: -46.5469965,
        },
      },
      {
        name: "GRIGOLI CAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6028728,
          lng: -46.839863,
        },
      },
      {
        name: "DM CAR",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.6086524,
          lng: -46.7644897,
        },
      },
      {
        name: "TORQUE ALPHA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.4925982,
          lng: -46.8333147,
        },
      },
      {
        name: "RIBEIRO & RIBEIRO",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -22.9471935,
          lng: -47.3096007,
        },
      },
      {
        name: "NEW FENIX",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5190307,
          lng: -46.7922508,
        },
      },
      {
        name: "MARTELINHO JUNDIAI",
        servicos: ["Multimarcas", "Funilaria e pintura", "Martelinho de ouro"],
        location: {
          lat: -23.2150809,
          lng: -46.8830419,
        },
      },
      {
        name: "ANARAFA",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.0069123,
          lng: -46.8515406,
        },
      },
      {
        name: "PAPALEGUAS",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5167134,
          lng: -47.4847115,
        },
      },
      {
        name: "HOT ROD",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.6007977,
          lng: -46.754477,
        },
      },
      {
        name: "EVOLUTION - REPAIR SOLUTION",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5238023,
          lng: -46.644144,
        },
      },
      {
        name: "NEW CAR SP",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5460976,
          lng: -46.5494225,
        },
      },
      {
        name: "REICAR REPARADORA DE VEICULOS LTDA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -24.0107862,
          lng: -46.4414525,
        },
      },
      {
        name: "AUTOREPAROS ARICANDUVA",
        servicos: ["Vistoria por imagem", "Funilaria e pintura"],
        location: {
          lat: -23.5795031,
          lng: -46.4972868,
        },
      },
      {
        name: "GORDINHO GARAGEM",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.515628,
          lng: -47.1452004,
        },
      },
      {
        name: "QUATRO RODAS PREMIUM",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.2836613,
          lng: -45.96475969999999,
        },
      },
      {
        name: "FORT CAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -22.943801,
          lng: -46.55034990000001,
        },
      },
      {
        name: "GUICAR FUNILARIA E P",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -24.2811295,
          lng: -46.9607584,
        },
      },
      {
        name: "ALPHAVILLE",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.0260049,
          lng: -47.37347279999999,
        },
      },
      {
        name: "DEBELAK CAPITAL SP",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.4680231,
          lng: -46.5939677,
        },
      },
      {
        name: "R R J DE SANTOS",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.6479737,
          lng: -46.83911579999999,
        },
      },
      {
        name: "WAGNER FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5333923,
          lng: -47.4370827,
        },
      },
      {
        name: "OFICINA 4 RODAS MAIS GUARULHOS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.4647269,
          lng: -46.5089203,
        },
      },
      {
        name: "RETOCAR - ARUJA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.3951827,
          lng: -46.3152929,
        },
      },
      {
        name: "DEBELAK ATIBAIA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
        ],
        location: {
          lat: -23.1115679,
          lng: -46.55760780000001,
        },
      },
      {
        name: "CARANGO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.9466295,
          lng: -46.3294521,
        },
      },
      {
        name: "TOP CAR",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5171649,
          lng: -47.2510232,
        },
      },
      {
        name: "MEC MAX",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5391005,
          lng: -46.7760607,
        },
      },
      {
        name: "MEGA CAR",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -24.1941195,
          lng: -46.81215419999999,
        },
      },
      {
        name: "CENTRO AUTOMOTIVO REGENTE",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6024746,
          lng: -46.6101016,
        },
      },
      {
        name: "FUNILARIA E INDAIÁ",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.0852916,
          lng: -47.1867166,
        },
      },
      {
        name: "RECUPERADORA ITARARE",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.771741,
          lng: -46.7926368,
        },
      },
      {
        name: "OFICINA 4 RODAS MOOCA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5564226,
          lng: -46.6036708,
        },
      },
      {
        name: "CARS REPAROS AUTOMOTIVOS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.949406,
          lng: -46.3276539,
        },
      },
      {
        name: "MODELO SJ CAMPOS",
        servicos: [
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.2274205,
          lng: -45.879419,
        },
      },
      {
        name: "OFICINA QUATRO RODAS",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.1809704,
          lng: -45.84486,
        },
      },
      {
        name: "ROMMA UNIVERSO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5090235,
          lng: -46.66174549999999,
        },
      },
      {
        name: "JD ANALIA TATUAPE PICKUPS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5300832,
          lng: -46.5544692,
        },
      },
      {
        name: "SEADRICCAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5004418,
          lng: -46.34497220000001,
        },
      },
      {
        name: "VITORAUTO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5351333,
          lng: -46.5794421,
        },
      },
      {
        name: "B.A.R. AUTO SERVICE",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6406736,
          lng: -46.717298,
        },
      },
      {
        name: "GL CENTRO AUTOMOTIVO FUNILARIA E PINTURA",
        servicos: ["Multimarcas"],
        location: {
          lat: -23.7056382,
          lng: -46.8443788,
        },
      },
      {
        name: "RJG CAR SERVICE",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.7203492,
          lng: -46.5497141,
        },
      },
      {
        name: "CONSER T KAR",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.1753213,
          lng: -46.85197549999999,
        },
      },
      {
        name: "SP MAX",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5157907,
          lng: -46.7738542,
        },
      },
      {
        name: "AGNUS REPARACAO AUTOMOTIVA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.4737781,
          lng: -46.5249496,
        },
      },
      {
        name: "VOLARE SERVICOS AUTOMOTIVOS",
        servicos: ["Multimarcas"],
        location: {
          lat: -23.589542,
          lng: -46.839481,
        },
      },
      {
        name: "REYCAR",
        servicos: [
          "Vistoria por imagem",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5552653,
          lng: -46.6222782,
        },
      },
      {
        name: "JET CARS",
        servicos: ["Vistoria por imagem"],
        location: {
          lat: -23.7090708,
          lng: -46.5310703,
        },
      },
      {
        name: "INFINITY FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Martelinho de ouro"],
        location: {
          lat: -23.5259144,
          lng: -46.5523578,
        },
      },
      {
        name: "CLINICAR",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.8250448,
          lng: -46.1410835,
        },
      },
      {
        name: "RR GARAGE",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5991421,
          lng: -47.0247128,
        },
      },
      {
        name: "ALPHA 2",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.2669441,
          lng: -45.9503614,
        },
      },
      {
        name: "FIXX REPAROS AUTOMOTIVOS - NÃO ACEITA GUINCHO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -22.8799533,
          lng: -47.0704576,
        },
      },
      {
        name: "RC PRIME FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5259079,
          lng: -46.764925,
        },
      },
      {
        name: "BLESS - RESTAURAÇÃO FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5192194,
          lng: -46.7953471,
        },
      },
      {
        name: "MARCO CAR FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6191531,
          lng: -46.7880829,
        },
      },
      {
        name: "AUTO REFLEXO FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.4956067,
          lng: -46.8833328,
        },
      },
      {
        name: "GN CAR SERVICE",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.4370788,
          lng: -46.9433095,
        },
      },
      {
        name: "ARCOVERDE SERVICOS AUTOMOTIVOS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5225778,
          lng: -46.73483539999999,
        },
      },
      {
        name: "NEW FENIX SP",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5109622,
          lng: -46.7452624,
        },
      },
      {
        name: "SQUADRA AUTO CENTER",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5526671,
          lng: -46.60384759999999,
        },
      },
      {
        name: "DIASCAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.4716456,
          lng: -46.6061645,
        },
      },
      {
        name: "RICMIL REPARACAO AUTOMOTIVA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.4566271,
          lng: -46.5378064,
        },
      },
      {
        name: "CHIC FUN PINT",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -22.9183715,
          lng: -47.05941079999999,
        },
      },
      {
        name: "IPANEMA AUTO MEC",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6145628,
          lng: -46.6597749,
        },
      },
      {
        name: "QUATRO RODAS SANTANA DE PARNAIBA",
        servicos: ["Multimarcas", "Funilaria e pintura", "Martelinho de ouro"],
        location: {
          lat: -23.4073008,
          lng: -46.8739303,
        },
      },
      {
        name: "AUTO BRITE",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5168766,
          lng: -47.4836769,
        },
      },
      {
        name: "J.F MURARO",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.4975213,
          lng: -47.4954913,
        },
      },
      {
        name: "PANTERA CARS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6697124,
          lng: -46.5831695,
        },
      },
      {
        name: "SMS IMPORTS",
        servicos: [
          "Vistoria por imagem",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6243303,
          lng: -46.4633778,
        },
      },
      {
        name: "SANTS CAR - SBC",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.7170473,
          lng: -46.5584739,
        },
      },
      {
        name: "CLUBCAR VEICULOS CAMBUCI",
        servicos: ["Vistoria por imagem", "Multimarcas", "Elétrica"],
        location: {
          lat: -23.5638151,
          lng: -46.6184446,
        },
      },
      {
        name: "NEW SERVICE ALPHA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.4987369,
          lng: -46.8565484,
        },
      },
      {
        name: "CONDE",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5982023,
          lng: -46.5960864,
        },
      },
      {
        name: "NEXEN FUNILARIA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.0807601,
          lng: -47.1972832,
        },
      },
      {
        name: "ARCO IRIS CAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5382459,
          lng: -46.299943,
        },
      },
      {
        name: "SUPERVISAO MOOCA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5659992,
          lng: -46.5884468,
        },
      },
      {
        name: "GOIAS CAR SAO CAETANO SERVICOS AUTOMOTIVOS LTDA",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.6162862,
          lng: -46.55342419999999,
        },
      },
      {
        name: "CARLAO DE SANTOS AUT",
        servicos: [
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
        ],
        location: {
          lat: -23.959101,
          lng: -46.3113044,
        },
      },
      {
        name: "PREMIUM CAR SERVICE",
        servicos: [
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -22.9571332,
          lng: -46.54552100000001,
        },
      },
      {
        name: "FUNILARIA ROSSI",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.1940904,
          lng: -47.3059624,
        },
      },
      {
        name: "JETPRIME AUTOMOTIVE DETAILING",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6367071,
          lng: -46.5436612,
        },
      },
      {
        name: "TOP SERVICE",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5316519,
          lng: -46.7566215,
        },
      },
      {
        name: "REPAIR FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.4540092,
          lng: -46.5091332,
        },
      },
      {
        name: "MARANATA FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.4151648,
          lng: -46.0242353,
        },
      },
      {
        name: "SS RENOVADORA DE VEICULOS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.0983085,
          lng: -47.2074715,
        },
      },
      {
        name: "SANTSCAR SERVICE",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6019075,
          lng: -46.6110605,
        },
      },
      {
        name: "BRASIL CAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.517793,
          lng: -46.3430513,
        },
      },
      {
        name: "AUTOTECH RESTAURADORA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.2116442,
          lng: -46.8776902,
        },
      },
      {
        name: "AUTO COLLISION SERVIÇOS AUTOMOTIVOS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5287447,
          lng: -46.5268491,
        },
      },
      {
        name: "PALACE VEICULOS",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.9456546,
          lng: -46.3281939,
        },
      },
      {
        name: "FACCHINI",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6189471,
          lng: -46.5683912,
        },
      },
      {
        name: "9 CAR",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6540972,
          lng: -46.7596996,
        },
      },
      {
        name: "COMPANHIA DO CONSERTO",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.67878,
          lng: -46.45956289999999,
        },
      },
      {
        name: "ALPHAFIX REPARACAO AUTOMOTIVA LTDA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.1427891,
          lng: -47.2394955,
        },
      },
      {
        name: "PIRAMIDE",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5104104,
          lng: -46.142828,
        },
      },
      {
        name: "CORONATO AGUA BRANCA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5116367,
          lng: -46.6926754,
        },
      },
      {
        name: "CARANGOS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6266233,
          lng: -46.6183993,
        },
      },
      {
        name: "QUATROCENTOS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6731984,
          lng: -46.7104603,
        },
      },
      {
        name: "LECAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6320825,
          lng: -46.5692045,
        },
      },
      {
        name: "TONINHO FACHINI AUTO SERVICE",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6216696,
          lng: -46.53086039999999,
        },
      },
      {
        name: "C CLEAN",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
        ],
        location: {
          lat: -23.4613612,
          lng: -46.52066199999999,
        },
      },
      {
        name: "FASTCAR",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.1195316,
          lng: -47.22415280000001,
        },
      },
      {
        name: "DITO FUNILARIA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5136746,
          lng: -47.4302272,
        },
      },
      {
        name: "OFICINA RN SERVICE CAR",
        servicos: ["Vistoria por imagem", "Funilaria e pintura"],
        location: {
          lat: -23.5352675,
          lng: -46.6452029,
        },
      },
      {
        name: "NICOLA GARAGE",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5311412,
          lng: -46.65441910000001,
        },
      },
      {
        name: "BRASIL",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.216975,
          lng: -46.8465535,
        },
      },
      {
        name: "TC CAR SERVICOS AUTOMOTIVOS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.9400004,
          lng: -46.3219567,
        },
      },
      {
        name: "ANTI SHOCK SERVICOS AUTOMOTIVOS",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6616856,
          lng: -46.51645269999999,
        },
      },
      {
        name: "RUI IBIUNA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6583241,
          lng: -47.2113267,
        },
      },
      {
        name: "TIO CARLINHOS",
        servicos: ["Multimarcas", "Funilaria e pintura", "Martelinho de ouro"],
        location: {
          lat: -23.0155257,
          lng: -46.8393112,
        },
      },
      {
        name: "BASTOS CAR FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5589393,
          lng: -46.5952309,
        },
      },
      {
        name: "DUCAR REPAROS AUTOMOTIVOS",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.549826,
          lng: -46.5539958,
        },
      },
      {
        name: "ALIANÇA CAR AUTO CENTER",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5621468,
          lng: -46.55117610000001,
        },
      },
      {
        name: "MADRID SERVICOS AUTOMOTIVOS",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5689404,
          lng: -46.4770204,
        },
      },
      {
        name: "APICE FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5386381,
          lng: -46.4577176,
        },
      },
      {
        name: "GRANCAR REPAROS E PINTURAS AUTOMOTIVAS",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.4973771,
          lng: -46.4421024,
        },
      },
      {
        name: "AJA REPAROS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5519959,
          lng: -46.3200871,
        },
      },
      {
        name: "ALEXANDRE E DIEGO MARTELINHO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
        ],
        location: {
          lat: -23.4830399,
          lng: -47.42595720000001,
        },
      },
      {
        name: "STOP CAR BEM",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5532315,
          lng: -46.6144118,
        },
      },
      {
        name: "HIGHLIGHT AUTO SERVICE",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.593915,
          lng: -46.60141549999999,
        },
      },
      {
        name: "ART SYSTENS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.550373,
          lng: -46.4968799,
        },
      },
      {
        name: "RESTORE REPARACOES",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -22.877577,
          lng: -47.2077435,
        },
      },
      {
        name: "NC FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -22.8653737,
          lng: -47.2077029,
        },
      },
      {
        name: "AUTO PERFECT",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5279166,
          lng: -46.6586529,
        },
      },
      {
        name: "FAMA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5047318,
          lng: -46.5920394,
        },
      },
      {
        name: "FRISON",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.4882522,
          lng: -46.7301109,
        },
      },
      {
        name: "CAR SOLUTION EXPRESS",
        servicos: [
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.3896147,
          lng: -46.714028,
        },
      },
      {
        name: "AUTO REPARADORA SAO JORGE",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.2857904,
          lng: -45.9487778,
        },
      },
      {
        name: "REPAROS AUTOMOTIVOS CLAUDIO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.2378135,
          lng: -45.9163091,
        },
      },
      {
        name: "FUNIARTES - FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.2102308,
          lng: -45.8880533,
        },
      },
      {
        name: "OFICINA GLOBO",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -25.4930505,
          lng: -53.5982448,
        },
      },
      {
        name: "CENTRAL SUL IMPORTS",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.6548698,
          lng: -46.6482955,
        },
      },
      {
        name: "N VORZUG",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6402835,
          lng: -46.7160778,
        },
      },
      {
        name: "PERSONAL GARAGE",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5083359,
          lng: -46.8510728,
        },
      },
      {
        name: "OFICINA PASSARELLO",
        servicos: ["Multimarcas"],
        location: {
          lat: -23.8301455,
          lng: -46.8181527,
        },
      },
      {
        name: "SMART CAR STUDIO AUTOMOTIVO",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5378845,
          lng: -46.6754099,
        },
      },
      {
        name: "GD MOTORS",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5775154,
          lng: -46.7077799,
        },
      },
      {
        name: "BFP-ALBERT EISNTEIN",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5992162,
          lng: -46.7189154,
        },
      },
      {
        name: "TONIMEK",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.528069,
          lng: -46.740303,
        },
      },
      {
        name: "GAZZANI FUNILARIA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6455389,
          lng: -46.4931235,
        },
      },
      {
        name: "LV GARAGE",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.7020454,
          lng: -46.5505866,
        },
      },
      {
        name: "MARTELINHO DE OURO SB CAMPO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.7202683,
          lng: -46.5802655,
        },
      },
      {
        name: "MAX FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.2936701,
          lng: -46.7328894,
        },
      },
      {
        name: "CLUB CAR REPAROS AUTOMOTIVO",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.3396528,
          lng: -46.836514,
        },
      },
      {
        name: "TRUCKSCAR",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.2147232,
          lng: -46.8799434,
        },
      },
      {
        name: "A GRANDE FAMILIA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.9633747,
          lng: -46.3715532,
        },
      },
      {
        name: "F7 REPARACAO AUTOMOTIVA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.1526615,
          lng: -47.05447350000001,
        },
      },
      {
        name: "GOODGUYS RESTAURACAO",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.0099642,
          lng: -46.8360576,
        },
      },
      {
        name: "RIBEIRO",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5627147,
          lng: -46.6162307,
        },
      },
      {
        name: "MSFIX",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5362099,
          lng: -46.7269587,
        },
      },
      {
        name: "AUTO CRISTAL REPARADORA DE VEICULOS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -22.9630623,
          lng: -46.5439419,
        },
      },
      {
        name: "AVA VIDROS",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.4806532,
          lng: -47.4464927,
        },
      },
      {
        name: "JM FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.4803003,
          lng: -47.4704803,
        },
      },
      {
        name: "VANDERCAR",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.4611517,
          lng: -47.4812998,
        },
      },
      {
        name: "ELITE CAR",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.461824,
          lng: -47.4984316,
        },
      },
      {
        name: "B M FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.2019448,
          lng: -47.5185649,
        },
      },
      {
        name: "JOGADOR FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.1945512,
          lng: -47.5190852,
        },
      },
      {
        name: "CORIFEU AUTOMEC",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.573456,
          lng: -46.725854,
        },
      },
      {
        name: "SATIKO CAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6328636,
          lng: -46.6456027,
        },
      },
      {
        name: "FUNILARIA MAIA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.2060151,
          lng: -46.9170471,
        },
      },
      {
        name: "VALENTE ESTETICA AUTOMOTIVA EXPRESS",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6266132,
          lng: -46.630167,
        },
      },
      {
        name: "ROLISCAR CENTRO AUTOMOTIVO",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6242841,
          lng: -46.5957027,
        },
      },
      {
        name: "SALVA CAR REPARACAO AUTOMOTIVA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6446199,
          lng: -46.64456000000001,
        },
      },
      {
        name: "OFICINA MORAIS",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6540132,
          lng: -46.6598303,
        },
      },
      {
        name: "AJR SERVIÇOS AUTOMOTIVOS",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6407099,
          lng: -46.7169487,
        },
      },
      {
        name: "OFICINA ISIDRO LTDA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5579484,
          lng: -46.5787235,
        },
      },
      {
        name: "AUTO CARE",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5210216,
          lng: -46.56919790000001,
        },
      },
      {
        name: "ZERO BALA REPAROS AUTOMOTIVOS",
        servicos: ["Multimarcas"],
        location: {
          lat: -23.3261625,
          lng: -46.2303737,
        },
      },
      {
        name: "TABOLANDO CAR",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.540679,
          lng: -46.3573319,
        },
      },
      {
        name: "JUNIOR FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Funilaria e pintura"],
        location: {
          lat: -23.5242294,
          lng: -47.16643089999999,
        },
      },
      {
        name: "FABIO SEGURA FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5389906,
          lng: -47.1807644,
        },
      },
      {
        name: "PERFORMANCE CAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.1719593,
          lng: -45.8232607,
        },
      },
      {
        name: "ZARDINI FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.2118014,
          lng: -47.5214516,
        },
      },
      {
        name: "FUNILARIA E PINTURA DO PEDRINHO",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.1969299,
          lng: -47.52344739999999,
        },
      },
      {
        name: "PODIUM",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5782811,
          lng: -46.5574084,
        },
      },
      {
        name: "OZEAS",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5604438,
          lng: -46.7843209,
        },
      },
      {
        name: "CARFIO II",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6638111,
          lng: -46.47835509999999,
        },
      },
      {
        name: "GALLO IMPORTS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5572021,
          lng: -46.5248888,
        },
      },
      {
        name: "STUDIO MARILIA BOTELHO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.3953689,
          lng: -46.3264083,
        },
      },
      {
        name: "TEL CAR",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.9490919,
          lng: -46.3279886,
        },
      },
      {
        name: "MAIOR REPAROS AUTOMOTIVOS",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -22.86839,
          lng: -47.2214081,
        },
      },
      {
        name: "SCUDERIA MORUMBI",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6083718,
          lng: -46.7471125,
        },
      },
      {
        name: "AURENA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.4670702,
          lng: -46.5538067,
        },
      },
      {
        name: "CYBORG",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.2067796,
          lng: -45.8844506,
        },
      },
      {
        name: "GRUPO DENCAR AUTO SERVICE",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5682224,
          lng: -46.59823249999999,
        },
      },
      {
        name: "GCAR CENTRO AUTOMOTIVO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.4781463,
          lng: -46.5493187,
        },
      },
      {
        name: "TN CAR",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6240216,
          lng: -46.5206702,
        },
      },
      {
        name: "JULIOCAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
        ],
        location: {
          lat: -23.5117143,
          lng: -46.586968,
        },
      },
      {
        name: "NOVA JUCAR AUTO ESTUFA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6662964,
          lng: -46.60539480000001,
        },
      },
      {
        name: "FAGUNDES",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6539815,
          lng: -46.5546034,
        },
      },
      {
        name: "A C PERES",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.672979,
          lng: -46.5863583,
        },
      },
      {
        name: "QUALLY FUNILARIA, PINTURA & ESTETICA AUTOMOTIVA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6450777,
          lng: -46.514828,
        },
      },
      {
        name: "VF REPAROS AUTOMOTIVOS LTDA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6694578,
          lng: -46.5599645,
        },
      },
      {
        name: "VP GARAGE PINTURA AUTOMOTIVA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.7236037,
          lng: -46.5674745,
        },
      },
      {
        name: "CELMAR REPARAÇÃO AUTOMOTIVA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.7167089,
          lng: -46.55000570000001,
        },
      },
      {
        name: "LEAO DE JUDA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
        ],
        location: {
          lat: -23.7239476,
          lng: -46.5678274,
        },
      },
      {
        name: "NOVA PAULISTA CAR",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.7169431,
          lng: -46.5508944,
        },
      },
      {
        name: "SEVEN CAR FUNILARIA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.7032926,
          lng: -46.5377207,
        },
      },
      {
        name: "LAAV SANTO ANDRÉ",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6809958,
          lng: -46.5091486,
        },
      },
      {
        name: "LURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6959335,
          lng: -46.507079,
        },
      },
      {
        name: "REPAR REPARACAO AUTOMOTIVA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6759394,
          lng: -46.4549558,
        },
      },
      {
        name: "MARQUES E MARQUES",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6202293,
          lng: -46.6828897,
        },
      },
      {
        name: "EDU AUTO MOTOR",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5579667,
          lng: -46.7870095,
        },
      },
      {
        name: "AUTO MECANICA CELSO",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.7075876,
          lng: -46.7126123,
        },
      },
      {
        name: "NORTE SUL",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.2331246,
          lng: -45.91746990000001,
        },
      },
      {
        name: "GUIA NORTE AUTO CENTER",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5153433,
          lng: -46.5947397,
        },
      },
      {
        name: "VERTT CAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -22.9267478,
          lng: -47.0769205,
        },
      },
      {
        name: "CANAA CAR",
        servicos: ["Multimarcas", "Funilaria e pintura", "Martelinho de ouro"],
        location: {
          lat: -23.4741416,
          lng: -46.6393002,
        },
      },
      {
        name: "WM REPAROS",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6577556,
          lng: -46.667122,
        },
      },
      {
        name: "INTERMEC",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6872345,
          lng: -46.7027831,
        },
      },
      {
        name: "BRAGION FUNILARIA",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.130719,
          lng: -46.5639964,
        },
      },
      {
        name: "PICOLOTTO",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.9883812,
          lng: -46.2646082,
        },
      },
      {
        name: "ITATIBA FUNILARIA",
        servicos: [
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.0123499,
          lng: -46.840838,
        },
      },
      {
        name: "SOFISTICAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.1833507,
          lng: -47.2753646,
        },
      },
      {
        name: "CORONATO PINHEIROS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5611599,
          lng: -46.6873285,
        },
      },
      {
        name: "JOTECAR",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6393334,
          lng: -46.7670835,
        },
      },
      {
        name: "4X4 MECANICA E FUNILARIA",
        servicos: ["Multimarcas"],
        location: {
          lat: -23.1206564,
          lng: -46.5566323,
        },
      },
      {
        name: "AUTO ESTUFA CLASSIC SERVICE",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.7107881,
          lng: -46.5454014,
        },
      },
      {
        name: "FUJICAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.7206627,
          lng: -46.5671292,
        },
      },
      {
        name: "GUERREIRO DOS BATIDOS",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.4914968,
          lng: -46.6249767,
        },
      },
      {
        name: "OFICINA MARQUES",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.656214,
          lng: -46.6554393,
        },
      },
      {
        name: "ALE CAR",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.7052986,
          lng: -46.4321156,
        },
      },
      {
        name: "NOVA CONSOLI",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.046117,
          lng: -46.3491746,
        },
      },
      {
        name: "PAULINHO TOTAL",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5917267,
          lng: -46.6773381,
        },
      },
      {
        name: "DEMAUTO",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5232153,
          lng: -46.6979458,
        },
      },
      {
        name: "AUTOART",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.4754749,
          lng: -46.8304585,
        },
      },
      {
        name: "DELGADO",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5964803,
          lng: -46.5353755,
        },
      },
      {
        name: "UNIAO W E A FUN PINT",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -22.9439714,
          lng: -46.5402897,
        },
      },
      {
        name: "CALAMITA MOTORS",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5418472,
          lng: -46.5417194,
        },
      },
      {
        name: "REINACAR",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6869218,
          lng: -46.4518497,
        },
      },
      {
        name: "FUSION REPARACAO",
        servicos: [
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -22.8030123,
          lng: -47.11895089999999,
        },
      },
      {
        name: "BRAGA GARAGE",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5094994,
          lng: -46.6728917,
        },
      },
      {
        name: "PONCE E FILHO",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5588756,
          lng: -46.570369,
        },
      },
      {
        name: "LEMOS IMPORT",
        servicos: ["Vistoria por imagem", "Multimarcas", "Mecânica"],
        location: {
          lat: -23.6228001,
          lng: -46.55121399999999,
        },
      },
      {
        name: "MONACO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.728329,
          lng: -46.5561049,
        },
      },
      {
        name: "STHYLLUZ CAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.3957845,
          lng: -46.3240576,
        },
      },
      {
        name: "ECOFIX",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5439645,
          lng: -46.54654379999999,
        },
      },
      {
        name: "RUSSO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
        ],
        location: {
          lat: -23.5133742,
          lng: -47.4753063,
        },
      },
      {
        name: "AUTO ROBLES REPAROS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.518241,
          lng: -47.4817315,
        },
      },
      {
        name: "SOLICAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5390274,
          lng: -46.4509298,
        },
      },
      {
        name: "FREITAS VEICULOS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.8873383,
          lng: -46.4239876,
        },
      },
      {
        name: "GCAR ESTETICA AUTOMOTIVA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -22.8536145,
          lng: -46.3090175,
        },
      },
      {
        name: "AUTOMOTIVE FIX",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6283623,
          lng: -46.6467751,
        },
      },
      {
        name: "JAGUARAUTO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5035137,
          lng: -46.6616973,
        },
      },
      {
        name: "BFP MORUMBI",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6259824,
          lng: -46.7371409,
        },
      },
      {
        name: "G.C.MACHADO REPARACAO DE VEICULOS ME",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
        ],
        location: {
          lat: -22.899897,
          lng: -47.0841927,
        },
      },
      {
        name: "VILAGATTI AUTO COMERCIAL LTDA",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5037622,
          lng: -46.6869958,
        },
      },
      {
        name: "NITROCAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6351472,
          lng: -46.62742550000001,
        },
      },
      {
        name: "BIRO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5118723,
          lng: -47.4495358,
        },
      },
      {
        name: "TRICOLD REP AUTOMOT",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -22.9217823,
          lng: -47.090525,
        },
      },
      {
        name: "QUALITY",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5274128,
          lng: -46.6338806,
        },
      },
      {
        name: "TOKUNAGA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6275634,
          lng: -46.7067432,
        },
      },
      {
        name: "LSP REPARACOES",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
        ],
        location: {
          lat: -23.3177809,
          lng: -46.2189413,
        },
      },
      {
        name: "EAGLES",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5019585,
          lng: -46.6201058,
        },
      },
      {
        name: "3D CAR SERVICE",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5446585,
          lng: -46.5330883,
        },
      },
      {
        name: "RCR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6300287,
          lng: -46.5320258,
        },
      },
      {
        name: "AUTO SPEEDY REPARACOES",
        servicos: ["Multimarcas", "Funilaria e pintura", "Martelinho de ouro"],
        location: {
          lat: -23.5295558,
          lng: -46.83287110000001,
        },
      },
      {
        name: "GARAGE S IMPORTS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
        ],
        location: {
          lat: -23.5046775,
          lng: -46.9492353,
        },
      },
      {
        name: "CASAGRANDE FUN PINT",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -22.7138878,
          lng: -46.7671674,
        },
      },
      {
        name: "FAST FIX BLINDAGEM",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.609068,
          lng: -46.60143129999999,
        },
      },
      {
        name: "LAS VEGAS AUTO ESTUFA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6951794,
          lng: -46.5303473,
        },
      },
      {
        name: "SUPERVISAO IPIRANGA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5915665,
          lng: -46.5980776,
        },
      },
      {
        name: "FAVERO",
        servicos: ["Multimarcas"],
        location: {
          lat: -23.7653544,
          lng: -47.4187158,
        },
      },
      {
        name: "AUTO ESTUFA C.T.F",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6816501,
          lng: -46.5549229,
        },
      },
      {
        name: "CASAGRANDE REPARACOES DE AUTOMOVEIS",
        servicos: ["Vistoria por imagem", "Funilaria e pintura", "Mecânica"],
        location: {
          lat: -22.991075,
          lng: -47.0039496,
        },
      },
      {
        name: "ANARAFA FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -22.9383931,
          lng: -47.1024184,
        },
      },
      {
        name: "FLAMA CAR",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.556938,
          lng: -46.6896142,
        },
      },
      {
        name: "OFICINA MORUMBI",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6097663,
          lng: -46.7488032,
        },
      },
      {
        name: "BFP SANTO AMARO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.658518,
          lng: -46.7066569,
        },
      },
      {
        name: "NOVO ITU",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.2542638,
          lng: -47.2988021,
        },
      },
      {
        name: "BRIZA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5005808,
          lng: -46.6338432,
        },
      },
      {
        name: "SCATTINI",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6112234,
          lng: -46.6636607,
        },
      },
      {
        name: "PRISMA VEICULOS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.9920351,
          lng: -46.2702282,
        },
      },
      {
        name: "AUTO PLAY",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6474541,
          lng: -46.7081944,
        },
      },
      {
        name: "AEROCAR RETOQUES",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.7122915,
          lng: -46.3964826,
        },
      },
      {
        name: "BONNEVILLE",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.667063,
          lng: -46.7155005,
        },
      },
      {
        name: "FERRETO",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.0333028,
          lng: -46.9766706,
        },
      },
      {
        name: "GIANONI E GIANONI",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -22.9603641,
          lng: -47.0048739,
        },
      },
      {
        name: "INFINIT PIRITUBA SERVICOS AUTOMOTIVOS",
        servicos: [
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5028872,
          lng: -46.74491769999999,
        },
      },
      {
        name: "DONICAR",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.4975831,
          lng: -46.4512717,
        },
      },
      {
        name: "AUTO MECANICA E FUNILARIA NOVA VINHEDO LTDA ME",
        servicos: ["Multimarcas"],
        location: {
          lat: -23.0230173,
          lng: -46.9892217,
        },
      },
      {
        name: "DIMAS NORTE II",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.4999314,
          lng: -46.6126843,
        },
      },
      {
        name: "VAZ CENTRO AUTOMOTIVO",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.109713,
          lng: -46.5382662,
        },
      },
      {
        name: "PRIMUS SOLUCOES EM SINISTROS",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -22.9220589,
          lng: -47.0669412,
        },
      },
      {
        name: "CARFIX",
        servicos: [
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.2075318,
          lng: -45.8842291,
        },
      },
      {
        name: "S-CAR SERVICE",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5030857,
          lng: -47.6016677,
        },
      },
      {
        name: "SMOKE CAR EXPRESS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.6641922,
          lng: -46.5989317,
        },
      },
      {
        name: "KMAR CENTRO TECNICO AUTOMOTIVO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.7147844,
          lng: -46.42159909999999,
        },
      },
      {
        name: "GARAGEM CENTRO DE ESTÉTICA REPAROS AUTOMOTIVOS",
        servicos: [
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.3897166,
          lng: -46.3152555,
        },
      },
      {
        name: "MIZUTA CAR",
        servicos: [
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5165383,
          lng: -46.1909581,
        },
      },
      {
        name: "GURI EXPRESS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.194138,
          lng: -46.8765627,
        },
      },
      {
        name: "NEXTCAR",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.2510167,
          lng: -47.0559541,
        },
      },
      {
        name: "ZITO CAR",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
        ],
        location: {
          lat: -23.6630762,
          lng: -47.22678699999999,
        },
      },
      {
        name: "PRIMOS REPARACAO AUTOMOTIVAS",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -22.9872505,
          lng: -47.1073184,
        },
      },
      {
        name: "TREND STUDIO",
        servicos: [
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5307867,
          lng: -46.6490764,
        },
      },
      {
        name: "ORTIZ SERVICOS",
        servicos: ["Multimarcas", "Funilaria e pintura", "Mecânica"],
        location: {
          lat: -23.6058066,
          lng: -46.5512121,
        },
      },
      {
        name: "LUCAR",
        servicos: [
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.4721035,
          lng: -46.5875047,
        },
      },
      {
        name: "SPEED GARAGE",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.4675288,
          lng: -46.58529129999999,
        },
      },
      {
        name: "AUTOCAR REPARACAO AUTOMOTIVA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Mecânica"],
        location: {
          lat: -23.438914,
          lng: -46.5915245,
        },
      },
      {
        name: "J&F RECUPERADORA DE VEICULOS",
        servicos: ["Multimarcas", "Funilaria e pintura", "Mecânica"],
        location: {
          lat: -23.5041488,
          lng: -46.4562912,
        },
      },
      {
        name: "BILOTI REPAROS AUTOMOTIVOS LTDA",
        servicos: ["Funilaria e pintura", "Mecânica"],
        location: {
          lat: -23.5327393,
          lng: -46.2069031,
        },
      },
      {
        name: "AMERICA CENTRO AUTOMOTIVO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.9527117,
          lng: -46.3199213,
        },
      },
      {
        name: "ROGERIO ALVES DE CARVALHO FUNILARIA ME",
        servicos: ["Multimarcas", "Funilaria e pintura", "Martelinho de ouro"],
        location: {
          lat: -22.9612023,
          lng: -46.54043129999999,
        },
      },
      {
        name: "AWD FUNILARIA E PINTURA",
        servicos: [
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.0199317,
          lng: -46.98121250000001,
        },
      },
      {
        name: "ALEMAO FUNILARIA E PINTURA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5516272,
          lng: -46.6464675,
        },
      },
      {
        name: "RENOVACAO CENTRO DE REPARACAO AUTOMOTIVA",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.5206043,
          lng: -46.6100189,
        },
      },
      {
        name: "META SERVIÇOS AUTOMOTIVO LTDA - ME",
        servicos: ["Multimarcas"],
        location: {
          lat: -23.5307237,
          lng: -46.6768806,
        },
      },
      {
        name: "M R B SERVICOS DE LAVAGEM DE MOTOS",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5594212,
          lng: -46.58294189999999,
        },
      },
      {
        name: "OPHICINA",
        servicos: ["Multimarcas", "Funilaria e pintura", "Martelinho de ouro"],
        location: {
          lat: -23.5057283,
          lng: -46.6614248,
        },
      },
      {
        name: "PROSERVICE",
        servicos: ["Multimarcas"],
        location: {
          lat: -23.5246369,
          lng: -46.6296596,
        },
      },
      {
        name: "PADDOCK MOTOCENTER",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
        ],
        location: {
          lat: -23.544919,
          lng: -46.5672626,
        },
      },
      {
        name: "CAPS SANTANA",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.4869411,
          lng: -46.61792519999999,
        },
      },
      {
        name: "RADU CAR SERVICE",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.4815015,
          lng: -46.63229820000001,
        },
      },
      {
        name: "JOCASP SERVICOS AUTOMOTIVOS",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.632901,
          lng: -46.6314196,
        },
      },
      {
        name: "TREND AUTO SERVICE EXPRESS",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.4915291,
          lng: -46.6892101,
        },
      },
      {
        name: "RAVENA MOTO CENTER LTDA",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5452817,
          lng: -46.5446547,
        },
      },
      {
        name: "VIC MOTOS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.4950603,
          lng: -46.7020482,
        },
      },
      {
        name: "EDCAR SERVICOS AUTOMOTIVOS",
        servicos: ["Multimarcas"],
        location: {
          lat: -23.4990123,
          lng: -46.7071438,
        },
      },
      {
        name: "A - PILKINGTON SANTO AMARO 3003 5255",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.6388984,
          lng: -46.6732788,
        },
      },
      {
        name: "CONSERTO REVELIA",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5557714,
          lng: -46.6395571,
        },
      },
      {
        name: "PANADES MOTOS",
        servicos: ["Vistoria por imagem", "Multimarcas", "Mecânica"],
        location: {
          lat: -23.6433713,
          lng: -46.7148427,
        },
      },
      {
        name: "VIANVEL",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.6234176,
          lng: -46.7393491,
        },
      },
      {
        name: "SALES MOTO PECAS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
        ],
        location: {
          lat: -23.6708267,
          lng: -46.6688881,
        },
      },
      {
        name: "JOAO PAULO DE CAMARGO MOTOS",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.6070532,
          lng: -46.7777034,
        },
      },
      {
        name: "CAPS TABOAO DA SERRA BR",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.607868,
          lng: -46.768204,
        },
      },
      {
        name: "ROSSETI CAR COMERCIO E SERVICOS AUTOMOTIVOS LTDA",
        servicos: ["Multimarcas"],
        location: {
          lat: -23.7028614,
          lng: -46.7013525,
        },
      },
      {
        name: "TORQUE TAMBORE SERVICOS AUTOMOTIVOS EIRELI",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.4925982,
          lng: -46.8333147,
        },
      },
      {
        name: "OFICINA THK",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.5080392,
          lng: -46.84909280000001,
        },
      },
      {
        name: "RICAR AUTO ESTUFA",
        servicos: ["Multimarcas"],
        location: {
          lat: -23.7386208,
          lng: -46.5376078,
        },
      },
      {
        name: "RCAR REPAROS AUTOMOTIVOS",
        servicos: ["Multimarcas"],
        location: {
          lat: -23.5251045,
          lng: -46.32355190000001,
        },
      },
      {
        name: "FUNILARIA E PINTURA MAIRIPORA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.256573,
          lng: -46.593809,
        },
      },
      {
        name: "BANANEIRA FUNILARIA E PINTURA",
        servicos: ["Multimarcas", "Funilaria e pintura", "Martelinho de ouro"],
        location: {
          lat: -23.7026575,
          lng: -47.0501173,
        },
      },
      {
        name: "WILL S CAR REP AUTOM",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.1753213,
          lng: -46.85197549999999,
        },
      },
      {
        name: "LORO TRUCK CENTER",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.1729113,
          lng: -46.88035439999999,
        },
      },
      {
        name: "MARTELINHO DE OURO",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.9636952,
          lng: -46.3914785,
        },
      },
      {
        name: "CAPS SÃO VICENTE",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.9569637,
          lng: -46.3753007,
        },
      },
      {
        name: "CAPS SANTOS VILA MATHIAS",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.9494498,
          lng: -46.3279348,
        },
      },
      {
        name: "REGIS MOTOS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
        ],
        location: {
          lat: -23.9446482,
          lng: -46.3236058,
        },
      },
      {
        name: "CRICRI MOTOS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Mecânica",
          "Elétrica",
        ],
        location: {
          lat: -23.9492382,
          lng: -46.3195934,
        },
      },
      {
        name: "FUNILARIA E PINTURA FERNACAR",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.0925905,
          lng: -46.9503857,
        },
      },
      {
        name: "CAPS GUARUJA",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.9925904,
          lng: -46.2570511,
        },
      },
      {
        name: "GOLDCAR REPARACOES AUTOMOTIVAS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.2695288,
          lng: -47.2854398,
        },
      },
      {
        name: "SAGA MOTO CENTER",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
        ],
        location: {
          lat: -22.9801014,
          lng: -47.000538,
        },
      },
      {
        name: "QUATRO RODAS JACAREI",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.2839117,
          lng: -45.9645768,
        },
      },
      {
        name: "AUTO NOVA FUNILARIA E PINTURA",
        servicos: [
          "Vistoria por imagem",
          "Funilaria e pintura",
          "Mecânica",
          "Elétrica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.2814491,
          lng: -45.9464351,
        },
      },
      {
        name: "AUTO MECANICA SANTO ANTONIO",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -24.1625976,
          lng: -46.7695145,
        },
      },
      {
        name: "OFICINA CONFIANCA",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -23.2606401,
          lng: -45.9138854,
        },
      },
      {
        name: "CAMP AUTO CENTER",
        servicos: ["Multimarcas", "Funilaria e pintura", "Martelinho de ouro"],
        location: {
          lat: -22.9440646,
          lng: -47.0880465,
        },
      },
      {
        name: "SENE FUNILARIA E PINTURA",
        servicos: ["Vistoria por imagem", "Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -22.9249198,
          lng: -47.079803,
        },
      },
      {
        name: "FAST STEEL REPARACOES AUTOMOBILISTICAS",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -22.9186133,
          lng: -47.0725991,
        },
      },
      {
        name: "FG MOTOS",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.1963694,
          lng: -45.8772193,
        },
      },
      {
        name: "MEC MOTOS",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -23.5030834,
          lng: -47.4694627,
        },
      },
      {
        name: "MOTO IMPORT - SOMENTE MOTO",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -22.9024149,
          lng: -47.0754679,
        },
      },
      {
        name: "JET BALBEK",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -23.4653038,
          lng: -47.4794128,
        },
      },
      {
        name: "CERQUEIRA CENTRO TECNICO AUTOMOTIVO CAMPINAS",
        servicos: [
          "Vistoria por imagem",
          "Multimarcas",
          "Funilaria e pintura",
          "Mecânica",
          "Martelinho de ouro",
        ],
        location: {
          lat: -22.9071418,
          lng: -47.1046418,
        },
      },
      {
        name: "CAPS AMOREIRAS",
        servicos: ["Vistoria por imagem", "Multimarcas"],
        location: {
          lat: -22.8707556,
          lng: -47.044334,
        },
      },
      {
        name: "CAPPI REPARADORA DE VEICULOS",
        servicos: ["Multimarcas", "Funilaria e pintura"],
        location: {
          lat: -22.7081911,
          lng: -46.7785384,
        },
      },
    ];
    setCarServices(carServices);
  };

  const fetchCarServiceDetails = async (service: CarService) => {
    if (!placesService) return;

    const request = {
      query: service.name,
      fields: ["place_id"],
      locationBias: service.location,
    };

    placesService.findPlaceFromQuery(request, (results, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        results &&
        results[0]
      ) {
        const placeId = results[0].place_id;

        const detailsRequest = {
          placeId: placeId!,
          fields: [
            "formatted_phone_number",
            "formatted_address",
            "opening_hours",
          ],
        } as google.maps.places.PlaceDetailsRequest;

        placesService.getDetails(detailsRequest, (place, detailsStatus) => {
          if (
            detailsStatus === google.maps.places.PlacesServiceStatus.OK &&
            place
          ) {
            const updatedService: CarService = {
              ...service,
              phoneNumber: place.formatted_phone_number,
              cep: place.formatted_address?.match(/\d{5}-\d{3}/)?.[0],
              openingHours: place.opening_hours?.weekday_text?.join(", "),
            };
            setCarServices((prevServices) =>
              prevServices.map((s) =>
                s.name === service.name ? updatedService : s
              )
            );
          }
        });
      }
    });
  };

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const onMapLoad = (map: google.maps.Map) => {
    setPlacesService(new google.maps.places.PlacesService(map));
    map.addListener("bounds_changed", () => {
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
      <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
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
                key={service.name}
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
                  {selectedService.phoneNumber && (
                    <p>Phone: {selectedService.phoneNumber}</p>
                  )}
                  {selectedService.cep && <p>CEP: {selectedService.cep}</p>}
                  {selectedService.openingHours && (
                    <p>Hours: {selectedService.openingHours}</p>
                  )}
                  {!selectedService.phoneNumber && (
                    <button
                      onClick={() => fetchCarServiceDetails(selectedService)}
                    >
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
            <li key={service.name}>
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
