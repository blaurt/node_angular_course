import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { MaterialService } from "../../service/material.service";

@Component({
  selector: "app-side-layout",
  templateUrl: "./side-layout.component.html",
  styleUrls: ["./side-layout.component.scss"]
})
export class SideLayoutComponent implements AfterViewInit {
  @ViewChild("floating") floatingRef: ElementRef;

  ngAfterViewInit(): void {
    MaterialService.initializeFloatingButton(this.floatingRef);
  }
  constructor(private auth: AuthService, private router: Router) {}

  public links = [
    {
      path: "/overview",
      name: "Overview"
    },
    {
      path: "/analytics",
      name: "Analytics"
    },
    {
      path: "/history",
      name: "History"
    },
    {
      path: "/order",
      name: "Add order"
    },
    {
      path: "/categories",
      name: "Categories"
    }
  ];

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
}
