import { Injectable } from "@angular/core";
import { Order } from "../interfaces/order";
import { Observable } from "rxjs";
import { Message } from "../interfaces/message";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<Order[]> {
    return this.http.get<Order[]>("/api/orders");
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`/api/orders/${id}`);
  }

  create(order: Order): Observable<Order> {
    const body = new FormData();
    body.append("name", name);
    return this.http.post<Order>(`/api/orders`, body);
  }

  update(id: string, name: string, image?: File): Observable<Order> {
    const body = new FormData();
    if (image) {
      body.append("image", image, image.name);
    }
    body.append("name", name);
    return this.http.put<Order>(`/api/orders/${id}`, body);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/orders/${id}`);
  }
}
