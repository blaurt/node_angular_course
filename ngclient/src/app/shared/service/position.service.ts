import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Message } from "../interfaces/message";
import { Position } from '../interfaces/position';

@Injectable({
  providedIn: "root"
})
export class PositionService {
  constructor(private http: HttpClient) {}

  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/positions/${categoryId}`);
  }

  create(position: Position): Observable<Position> {
    return this.http.post<Position>("/api/positions", position);
  }

  update(id: string, position: Position): Observable<Position> {
    return this.http.put<Position>(`/api/positions/${id}`, position);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/positions/${id}`);
  }
}
