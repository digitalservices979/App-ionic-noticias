import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../servicios/noticias.service';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../servicios/data-local.service';

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

  constructor(private noticiaService:NoticiasService, private actionSheetController: ActionSheetController, private socialSharing:SocialSharing, private dataLocal: DataLocalService) {
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
