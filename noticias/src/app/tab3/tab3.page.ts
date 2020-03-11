import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../servicios/data-local.service';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
	noticias:any;
	num_noticias:any;

  constructor(private dataLocal:DataLocalService, private actionSheetController:ActionSheetController, private socialSharing:SocialSharing) {}

  ngOnInit(){
  	this.noticias = this.dataLocal.cargarFavoritos();
  	this.num_noticias = this.noticias;  	
  }

  async lanzarMenu(noticia){
     const actionSheet = await this.actionSheetController.create({
      buttons: [
       {
        text: 'Compartir',
        icon: 'share-social',
        cssClass:"action-dark",
        handler: () => {
          //console.log('Share clicked');
          this.socialSharing.share(noticia.title,noticia.source.name,'',noticia.url)
        }
      },
       {
        text: 'Borrar de favoritos',
        icon: 'trash',
        cssClass:"action-dark",
        handler: () => {
          //console.log('Favorito');
          this.dataLocal.borrarNoticia(noticia);
        }
      },
       {
        text: 'Cancelar',
        icon: 'close',
        cssClass:"action-dark",
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
