import { Component } from '@angular/core';
import { appLogin, errorMessage } from '../app-constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private appConst = appLogin;
  private errorMessage = errorMessage;
  private loginForm: FormGroup;
  private isLoginFormSubmitTried: boolean = false;
  private isValidLogin: boolean = true;
  private subscription: any;
  constructor(private fb: FormBuilder,
    private http: Http,
    private router: Router) { }
  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
    });
    this.loginForm.valueChanges.subscribe((data) => {
      this.isValidLogin = true;
    });
  }
  onLogin() {
    this.isValidLogin = true;
    if (!this.isLoginFormSubmitTried) {
      this.isLoginFormSubmitTried = true;
    }
    if (this.loginForm.valid) {
      const userName = this.loginForm.controls.userName.value;
      const password = this.loginForm.controls.password.value;
      const url = 'assets/json/user-details.json';
      this.subscription = this.http.get(url).subscribe((data) => {
        const userDetails = data.json();
        let isDetailsExists: boolean = false;
        for (let i = 0; i < userDetails.length; i++) {
          if (userDetails[i].userName === userName &&
            userDetails[i].password === password) {
            isDetailsExists = true;
            const userDetail = { name: userDetails[i].name };
            localStorage.setItem('userDetails', JSON.stringify(userDetail));
            break;
          }
        }
        if (isDetailsExists) {
          const productsUrl = 'assets/json/products.json';
          this.http.get(productsUrl).subscribe((resp) => {
            const defaultProducts = JSON.stringify(resp.json());
            localStorage.setItem('products', defaultProducts);
          });
          this.router.navigate(['products/view-products']);
        } else {
          this.isValidLogin = false;
        }
      });
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
