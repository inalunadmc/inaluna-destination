// Compact preview data used by the interactive map card popup.
// Each city has: previewImage (matches destination card), pointsOfInterest list, short description.
export const cityPreviews = {
  en: {
    bogota: {
      id: 'bogota',
      title: 'Bogotá',
      previewImage: 'https://images.pexels.com/photos/19676242/pexels-photo-19676242.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      shortDescription: 'Discover our curated capital experience — where culture, gastronomy and history converge.',
      pointsOfInterest: [
        'Historic La Candelaria',
        'Monserrate Peak',
        'Gold Museum',
        'Colonial Architecture',
        'Salt Cathedral of Zipaquirá'
      ]
    },
    cartagena: {
      id: 'cartagena',
      title: 'Cartagena',
      previewImage: 'https://images.pexels.com/photos/18074796/pexels-photo-18074796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      shortDescription: 'A timeless walled city where Caribbean charm and colonial elegance meet.',
      pointsOfInterest: [
        'Walled Old City',
        'Getsemaní Bohemian District',
        'Rosario Islands',
        'Castillo San Felipe',
        'Sunset from the Ramparts'
      ]
    },
    medellin: {
      id: 'medellin',
      title: 'Medellín',
      previewImage: 'https://images.unsplash.com/photo-1671240432518-747abe186105?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwyfHxtZWRlbGxpbiUyMGNpdHl8ZW58MHx8fHwxNzgwMDAwNzg0fDA&ixlib=rb-4.1.0&q=85',
      shortDescription: 'A city defined by innovation, design and urban transformation.',
      pointsOfInterest: [
        'Comuna 13 Urban Art',
        'Plaza Botero',
        'Metrocable Ride',
        'Guatapé & El Peñol',
        'Antioquian Flower Farms'
      ]
    },
    coffee: {
      id: 'coffee',
      title: 'Coffee Region',
      previewImage: 'https://images.pexels.com/photos/15951870/pexels-photo-15951870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      shortDescription: 'Rolling hills, wax palms and timeless coffee traditions.',
      pointsOfInterest: [
        'Cocora Valley Wax Palms',
        'Working Coffee Fincas',
        'Salento & Filandia Villages',
        'Los Nevados National Park',
        'Traditional Willys Jeep Rides'
      ]
    },
    cali: {
      id: 'cali',
      title: 'Cali',
      previewImage: 'https://images.pexels.com/photos/35898540/pexels-photo-35898540.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      shortDescription: 'The salsa capital of the world, where rhythm and culture come to life.',
      pointsOfInterest: [
        'Salsa Dance Academies',
        'San Antonio District',
        'Cristo Rey Statue',
        'Farallones National Park',
        'Traditional Valle Cuisine'
      ]
    }
  },
  es: {
    bogota: {
      id: 'bogota',
      title: 'Bogotá',
      previewImage: 'https://images.pexels.com/photos/19676242/pexels-photo-19676242.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      shortDescription: 'Descubre nuestra experiencia curada de la capital — donde convergen cultura, gastronomía e historia.',
      pointsOfInterest: [
        'La Candelaria Histórica',
        'Cerro de Monserrate',
        'Museo del Oro',
        'Arquitectura Colonial',
        'Catedral de Sal de Zipaquirá'
      ]
    },
    cartagena: {
      id: 'cartagena',
      title: 'Cartagena',
      previewImage: 'https://images.pexels.com/photos/18074796/pexels-photo-18074796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      shortDescription: 'Una ciudad amurallada atemporal donde el encanto caribeño se une a la elegancia colonial.',
      pointsOfInterest: [
        'Ciudad Amurallada',
        'Getsemaní Bohemio',
        'Islas del Rosario',
        'Castillo San Felipe',
        'Atardecer en las Murallas'
      ]
    },
    medellin: {
      id: 'medellin',
      title: 'Medellín',
      previewImage: 'https://images.unsplash.com/photo-1671240432518-747abe186105?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwyfHxtZWRlbGxpbiUyMGNpdHl8ZW58MHx8fHwxNzgwMDAwNzg0fDA&ixlib=rb-4.1.0&q=85',
      shortDescription: 'Una ciudad definida por la innovación, el diseño y la transformación urbana.',
      pointsOfInterest: [
        'Arte Urbano en Comuna 13',
        'Plaza Botero',
        'Recorrido en Metrocable',
        'Guatapé y El Peñol',
        'Fincas Floricultoras'
      ]
    },
    coffee: {
      id: 'coffee',
      title: 'Región Cafetera',
      previewImage: 'https://images.pexels.com/photos/15951870/pexels-photo-15951870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      shortDescription: 'Colinas onduladas, palmas de cera y tradiciones cafeteras atemporales.',
      pointsOfInterest: [
        'Palmas de Cera del Valle del Cocora',
        'Fincas Cafeteras en Operación',
        'Salento y Filandia',
        'Parque Nacional Los Nevados',
        'Recorridos en Jeep Willys'
      ]
    },
    cali: {
      id: 'cali',
      title: 'Cali',
      previewImage: 'https://images.pexels.com/photos/35898540/pexels-photo-35898540.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      shortDescription: 'La capital mundial de la salsa, donde el ritmo y la cultura cobran vida.',
      pointsOfInterest: [
        'Academias de Salsa',
        'Barrio San Antonio',
        'Estatua Cristo Rey',
        'Parque Nacional Farallones',
        'Gastronomía Vallecaucana'
      ]
    }
  }
};
