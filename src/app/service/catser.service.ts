import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CatserService {

  constructor(private http:HttpClient) { }

  url="http://localhost:8899/api/";

  addCat(cdata)
  {
    return this.http.post(this.url+'addcat', cdata);
  }

  fetchCat()
  {
    return this.http.get(this.url+'fetchcat');
  }

  delCat(id)
  {
    return this.http.get(this.url+'delcat/'+id);
  }
}
