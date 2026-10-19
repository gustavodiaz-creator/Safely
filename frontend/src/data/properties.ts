export interface Property {
  id: string;
  title: string;
  address: string;
  priceUSD: number;
  reservationUSDC: number;
  imageUrl: string;
  docHash: string; // Hash del contrato/documento de propiedad
}

export const PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Apartamento de Lujo en El Poblado",
    address: "Calle 10 # 30-15, Medellín",
    priceUSD: 180000,
    reservationUSDC: 500,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    docHash: "e29f9608d9ba6889c61c618e2567377cdaf2e446e11a9d568e374debab6d71f"
  },
  {
    id: "2",
    title: "Penthouse Vista Panorámica",
    address: "Carrera 43A # 1-50, Envigado",
    priceUSD: 250000,
    reservationUSDC: 1000,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    docHash: "a4b89218d9ba6889c61c618e2567377cdaf2e446e11a9d568e374debab6a32b"
  },
  {
    id: "3",
    title: "Loft Moderno e Iluminado",
    address: "Circular 4 # 72-10, Laureles",
    priceUSD: 120000,
    reservationUSDC: 300,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    docHash: "c9823108d9ba6889c61c618e2567377cdaf2e446e11a9d568e374debab6f881"
  }
];