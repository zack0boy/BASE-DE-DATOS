import { Component } from '@angular/core';
import { Content } from "../../component/content/content";
import { Header } from "../../component/header/header";
import { Footer } from "../../component/footer/footer";

@Component({
  selector: 'app-login-page',
  imports: [Footer],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

}
