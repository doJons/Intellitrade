import { Injectable  } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ICandleStick } from "./candlestick";

@Injectable({
    providedIn: 'root'
})

export class CandleStickService{
    private bUrl = "https://api.binance.com";
    constructor(private http:HttpClient){

    }
    public getCandleSticks(ticker:string, interval:string, limit:string):Observable<ICandleStick[]>{
        var queryString = "/api/v3/klines?symbol=" + ticker + "&interval=" + interval + "&limit=" + limit;
        return this.http.get<ICandleStick[]>(this.bUrl+queryString).pipe();
    }

    // private handleError( err:HttpErrorResponse){
    //     errMessage = '';
    //     return throwError(errMessage);


    // }
}