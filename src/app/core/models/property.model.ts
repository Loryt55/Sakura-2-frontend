export interface Property {
  id: number;
  ownerFullName: string;
  name: string;
  address: string;
  city: string;
  rooms: number;
  pricePerMonth: number;
}

export interface PropertyForm {
  ownerId: number;
  name: string;
  address: string;
  city: string;
  rooms: number;
  pricePerMonth: number;
}
