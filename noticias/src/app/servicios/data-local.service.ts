import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

	noticias:any[]=[];

  constructor(private storage:Storage, private toastController: ToastController) { 
  	this.cargarFavoritos();
  }

  guardarNoticia(noticia:any){
  	//console.log(noticia);
  	const existe = this.noticias.find(noti => noti.title === noticia.title);

  	if (!existe){
	  	this.noticias.unshift(noticia);
	  	this.storage.set('favoritos',this.noticias);
  	}
  	this.presentToast("Agregado a favoritos");
  }

  async cargarFavoritos(){
  	const favoritos = await this.storage.get('favoritos')
  	//return this.noticias;
  	if (favoritos != null){
  		this.noticias = favoritos;  		
  	}
  	return this.noticias;
  }

  borrarNoticia(noticia:any){
  	this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
  	this.storage.set('favoritos', this.noticias);
  	this.presentToast("Eliminado de favoritos");
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
  

}
