import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../shared/service/auth.service";
import { User } from "../shared/interfaces/user";
import { Route, Router, ActivatedRoute, Params } from "@angular/router";
import { MaterialService } from "../shared/service/material.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;

  constructor(
    protected auth: AuthService,
    protected router: Router,
    protected route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params["registered"]) {
        MaterialService.toast("You can log in now");
      } else if (params["accessDenied"]) {
        MaterialService.toast("You have to log in first");
      } else if (params["sessionExpired"]) {
        // MaterialService.toast("Please, log in again");
      }
    });
  }

  isEmailInvalid = () =>
    this.form.get("email").invalid && this.form.get("email").touched;

  isPasswordInvalid = () =>
    this.form.get("password").invalid && this.form.get("password").touched;

  async onSubmit() {
    this.form.disable();
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    try {
      const result = await this.auth.login(user).toPromise();
      MaterialService.toast("Successfully logged in");
      this.router.navigate(["/overview"]);
    } catch (error) {
      this.form.enable();
      MaterialService.toast(error.error);
    }
  }
}
