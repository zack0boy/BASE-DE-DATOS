import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Footer } from "../../component/footer/footer";
import { LoginComponet } from "../../component/login-componet/login-componet";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [Footer, CommonModule, LoginComponet],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Redirect to principal if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/principal']);
    }
  }
}
