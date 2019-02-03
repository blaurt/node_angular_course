import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { User } from "../shared/interfaces/user";
import { LoginPageComponent } from "../login-page/login-page.component";
import { MaterialService } from "../shared/service/material.service";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"]
})
export class RegisterPageComponent extends LoginPageComponent
  implements OnInit {
  public form: FormGroup;
  // constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  async onSubmit() {
    this.form.disable();
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    try {
      const result = await this.auth.register(user).toPromise();
      MaterialService.toast("Successfully registered");
      this.router.navigate(["/login"], { queryParams: { registered: true } });
    } catch (error) {
      this.form.enable();
      MaterialService.toast(error.error);
    }
  }
}
