import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Property {
  id: number;
  name: string;
  address: string;
  city: string;
  rooms: number;
  pricePerMonth: number;
}

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl = 'http://localhost:8080/api/properties';

  constructor(private http: HttpClient) {}

  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl);
  }

  addProperty(property: Omit<Property, 'id'>): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, property);
  }

  updateProperty(property: Property): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/${property.id}`, property);
  }

  deleteProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
