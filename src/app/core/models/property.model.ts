export interface Property {
  id: number;
  name: string;
  address: string;
  city: string;
  rooms: number;
  pricePerMonth: number;
}

export interface PropertyForm {
  name: string;
  address: string;
  city: string;
  rooms: number;
  pricePerMonth: number;
}
