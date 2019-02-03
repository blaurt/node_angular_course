import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"]
})
export class LoaderComponent implements OnInit {
  constructor() {}

  public static visible: boolean = false;

  public self: typeof LoaderComponent = LoaderComponent;

  ngOnInit() {}

  public static showPreloader(): void {
    this.visible = true;
  }

  public static hidePreloader(): void {
    this.visible = false;
  }
}
