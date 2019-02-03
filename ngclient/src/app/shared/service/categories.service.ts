import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpResponse, HttpClient } from "@angular/common/http";
import { Category } from "../interfaces/category";
import { Message } from "../interfaces/message";

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>("/api/categories");
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/categories/${id}`);
  }

  create(name: string, image?: File): Observable<Category> {
    const body = new FormData();
    if (image) {
      body.append("image", image, image.name);
    }
    body.append("name", name);
    return this.http.post<Category>(`/api/categories`, body);
  }

  update(id: string, name: string, image?: File): Observable<Category> {
    const body = new FormData();
    if (image) {
      body.append("image", image, image.name);
    }
    body.append("name", name);
    return this.http.put<Category>(`/api/categories/${id}`, body);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/categories/${id}`);
  }
}
