import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../servicios/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
	@ViewChild(IonSegment,{static:true}) segment: IonSegment;

	categorias:string[] = ["business", "entertainment", "health", "science", "sports", "technology"];
	categoria:string = this.categorias[0];

	noticiasCategoria:any;

  constructor(private noticiaService:NoticiasService) {
  	this.listaCategorias(this.categoria);
  }

  ngOnInit(){
  	this.segment.value = this.categorias[0];
  }

  listaCategorias(categoria:string){
  	this.noticiaService.listaNoticiaCategoria(categoria).subscribe(res =>{
  		this.noticiasCategoria = res.articles;
  	});
  }

  cambioCategoria(categoria){
  	this.listaCategorias(categoria.target.value);
  }

}
