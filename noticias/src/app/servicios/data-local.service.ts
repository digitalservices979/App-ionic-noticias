import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

	noticias:any[]=[];

  constructor(private storage:Storage) { 
  	this.cargarFavoritos();
  }

  guardarNoticia(noticia:any){
  	//console.log(noticia);
  	const existe = this.noticias.find(noti => noti.title === noticia.title);

  	if (!existe){
	  	this.noticias.unshift(noticia);
	  	this.storage.set('favoritos',this.noticias);
  	}
  }

  async cargarFavoritos(){
  	const favoritos = await this.storage.get('favoritos')
  	//return this.noticias;
  	if (favoritos != null){
  		this.noticias = favoritos;  		
  	}
  	return this.noticias;
  }
  

}
