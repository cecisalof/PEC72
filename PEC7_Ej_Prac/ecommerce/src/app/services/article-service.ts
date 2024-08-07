import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


interface ArticleWithId {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    isOnSale: boolean;
    quantityInCart: number;
  }
  
  interface ArticleQuantityChange {
    article: ArticleWithId;
    quantity: number;
  }

  
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(query?: string): Observable<ArticleWithId[]> {
    let params = new HttpParams();
    if (query) {
      params = params.set('q', query);
    }
    return this.http.get<ArticleWithId[]>(`http://localhost:3000/api/articles`, { params: params, responseType: 'json' as 'json' });
  }

  changeQuantity(articleID: number, changeInQuantity: number): Observable<any> {
    return this.http.patch('http://localhost:3000/api/articles/' + articleID, {changeInQuantity: changeInQuantity});
  }

  create(article: ArticleWithId): Observable<ArticleWithId> {
    return this.http.post<ArticleWithId>('http://localhost:3000/api/articles', article);
  }
}

