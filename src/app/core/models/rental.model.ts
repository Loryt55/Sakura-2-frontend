export interface Rental {
  id: number;
  propertyName: string;
  propertyCity: string;
  userFullName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
}

export interface RentalForm {
  propertyId: number;
  userId: number;
  startDate: string;
  endDate: string;
}
