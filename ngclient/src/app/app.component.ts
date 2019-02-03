import { Component, OnInit } from "@angular/core";
import { AuthService } from "./shared/service/auth.service";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>"
})
export class AppComponent implements OnInit {
  title = "ngclient";

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const token = localStorage.getItem("auth-token");
    token && this.auth.setToken(token);
  }
}
