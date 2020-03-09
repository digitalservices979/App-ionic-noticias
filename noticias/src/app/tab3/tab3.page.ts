import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../servicios/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
	noticias:any;
	num_noticias:any;

  constructor(private dataLocal:DataLocalService) {}

  ngOnInit(){
  	this.noticias = this.dataLocal.cargarFavoritos();
  	this.num_noticias = this.noticias;
  	console.log(this.num_noticias);
  }

}
