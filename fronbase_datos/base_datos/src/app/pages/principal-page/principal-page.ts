import { Component } from '@angular/core';
import { Content } from "../../component/content/content";
import { Footer } from "../../component/footer/footer";
import { Header } from "../../component/header/header";

@Component({
  selector: 'app-principal-page',
  imports: [Content, Footer, Header],
  templateUrl: './principal-page.html',
  styleUrl: './principal-page.css',
})
export class PrincipalPage {

}
