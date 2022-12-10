import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable()

export class FileService {
    

    constructor(private _http: HttpClient) { }
    
  private baseUrl = 'http://localhost:8080';
    
    // httpOtions for multipart/form-data
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data'
        })
    }

    downloadFile(file:String){
        var body = {filename:file};

        return this._http.post( `${this.baseUrl}/download`,body,{
            responseType : 'blob',
            headers:new HttpHeaders().append('Content-Type','application/json')
        });
    }

    uploadFile(formData: FormData) {
        let id = formData.get('research_id');
        const req = new HttpRequest('POST', `${this.baseUrl}/upload/${id}`, formData, {
            reportProgress: true,
            responseType: 'json',
        });
          return this._http.request(req);
    }
    

}