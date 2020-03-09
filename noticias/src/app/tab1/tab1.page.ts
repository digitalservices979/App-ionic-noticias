import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../servicios/noticias.service';
import { Observable } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { DataLocalService } from '../servicios/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias:any;

  constructor(private noticiaService:NoticiasService, private actionSheetController: ActionSheetController, private socialSharing:SocialSharing, private dataLocal: DataLocalService) {}

  ngOnInit(){
    this.noticiaService.listaNoticias().subscribe(res =>{
      this.noticias = res.articles;
      //console.log(res);
    })
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
        text: 'Favorito',
        icon: 'heart',
        cssClass:"action-dark",
        handler: () => {
          //console.log('Favorito');
          this.dataLocal.guardarNoticia(noticia);
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
