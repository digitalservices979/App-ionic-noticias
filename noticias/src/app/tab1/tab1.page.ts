import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../servicios/noticias.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

	noticias:any;

  constructor(private noticiaService:NoticiasService) {}

  ngOnInit(){
  	this.noticiaService.listaNoticias().subscribe(res =>{
  		this.noticias = res.articles;
  		//console.log(res);
  	})
  }

}
