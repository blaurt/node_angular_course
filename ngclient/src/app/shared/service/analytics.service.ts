import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Category } from "../interfaces/category";
import { IOverviewPage } from "../interfaces/overviewPage";
import { IAnalyticsPage } from "../interfaces/analytics";

@Injectable({
  providedIn: "root"
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getOverview(): Observable<IOverviewPage> {
    return this.http.get<IOverviewPage>("/api/analytics/overview");
  }

  getAnalytics(): Observable<IAnalyticsPage> {
    return this.http.get<IAnalyticsPage>(`/api/analytics/analytics`);
  }
}
