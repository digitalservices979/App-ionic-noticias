import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private httpClient: HttpClient) {
   }

   listaNoticias():Observable<any>{
   	return this.httpClient.get('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2715858fa496402d8910c54dafcea11f');
   }

   listaNoticiaCategoria(categoria:string):Observable<any>{
   	return this.httpClient.get('http://newsapi.org/v2/top-headlines?country=us&category='+categoria+'&apiKey=2715858fa496402d8910c54dafcea11f');
   }
}
