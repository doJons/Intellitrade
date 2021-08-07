import { ChangeDetectorRef, Component, Injectable, OnInit, OnChanges, Input } from "@angular/core";
import { CandleStick } from "../candlesticks/candlestick";
import { CandleStickService } from "../candlesticks/candlestick.service";


@Component ({
    //selector: 'app-chart',
    templateUrl: './chart-list.component.html',
    styleUrls:['./chart-list.component.css']
})

export class ChartListComponent implements OnInit{
    pageTitle:string = "Ticker List";
    ticker:string = "ADAUSDT";
    @Input() interval: string = "4h";
    @Input() limit: string = "50";
    candlesticks:CandleStick[];
    errorMessage: string;
    public watchList:string[] = [];
    @Input() algoType:string = "NearMin";

    constructor(private candleStickService:CandleStickService, private cd:ChangeDetectorRef){}

  
    getCandleSticks(ticker:string, interval:string, limit:string){
        this.candleStickService.getCandleSticks(ticker, interval, limit).subscribe({
            next:candlesticks => {
                this.candlesticks = [];
                for(var i =0; i <candlesticks.length; i++){
                    var candlestick = new CandleStick(candlesticks[i]);
                    this.candlesticks.push(candlestick);
                }
                return candlesticks;
            }
        })
    }
    // getCandleSticks(){
    //     this.candleStickService.getCandleSticks(this.ticker, this.interval, this.limit).subscribe({
    //         next:candlesticks => {
    //             this.candlesticks = [];
    //             for(var i =0; i <candlesticks.length; i++){
    //                 var candlestick = new CandleStick(candlesticks[i]);
    //                 this.candlesticks.push(candlestick);
    //             }
    //         }
    //     })
    // }

    ngOnInit():void{
        
    }
    searchLargeCaps():void{
        this.watchList = [];
        this.cd.detectChanges();
        this.watchList = [
            
            "BTCUSDT",
            "ETHUSDT",
            "BNBUSDT",
            "ADAUSDT",
            "XRPUSDT",
            "DOGEUSDT",
            "DOTUSDT",
            "UNIUSDT",
            "BCHUSDT",
            "LTCUSDT",
            "LINKUSDT",
            "SOLUSDT",
            "MATICUSDT",
            "ETCUSDT",
            "XLMUSDT",
            "THETAUSDT",
            "ICPUSDT",
            "VETUSDT",
            "FILUSDT",
            "TRXUSDT",
            "XMRUSDT",
         
        ]

    }
    searchDEFI():void{
        this.watchList = [];
        this.cd.detectChanges();
        this.watchList = [
            
            "UNIUSDT",
            "LINKUSDT",
            "LUNAUSDT",
            "AAVEUSDT",
            "CAKEUSDT",
            "GRTUSDT",
            "MKRUSDT",
            "COMPUSDT",
            "AVAXUSDT",
            "YFIUSDT",
            "YFIIUSDT",
            "SNXUSDT",
            "SUSHIUSDT",
            "RUNEUSDT",
            "BNTUSDT",
            "BATUSDT",
            "ZRXUSDT",
            "ANKRUSDT",
            "CRVUSDT",
            "FTMUSDT",
            "BAKEUSDT",
            "1INCHUSDT",
            "RSRUSDT",
            "KAVAUSDT",
            "RENUSDT",
            "KNCUSDT",
            "XVSUSDT",
            "LRCUSDT",
            "OCEANUSDT",
            "OGNUSDT",
            "RLCUSDT",
            "ALPHAUSDT",
            "SXPUSDT",
            "INJUSDT",
            "SRMUSDT",
            "BALUSDT",
            "KEEPUSDT",
            "DODUSDT",
            "COTIUSDT",
         
        ]

    }
    searchNFTs():void{
        this.watchList = [];
        this.cd.detectChanges();
        this.watchList = [
            
            "THETEAUSDT",
            "AXSUSDT",
            "CHZUSDT",
            "MANAUSDT",
            "ENJUSDT",
            "FLOWUSDT",
            "BAKEUSDT",
            "SANDUSDT",
            "WAXPUSDT",
            "OGNUSDT",
            "XTZUSDT",
            "DGBUSDT",
            "ALICEUSDT",
            "CHRUSDT",
            "SLPUSDT",
            "TLMUSDT",
            "DEGOUSDT",
            "SYSUSDT",
            "SUPERUSDT",
            "COCOSUSDT",
            "DASHUSDT",
            "CHZUSDT",
            "ZECUSDT",
            "MANAUSDT",
            "ENJUSDT",
            "YFIUSDT",
            "SNXUSDT",
            "RUNEUSDT",
            "SUSHIUSDT",
            "ZILUSDT",
            "BNTUSDT",
            "ONEUSDT",
            "QTUMUSDT",
         
        ]

    }
    searchMidCaps():void{
        this.watchList = [];
        this.cd.detectChanges();
        this.watchList = [
            
            "LUNAUSDT",
            "AAVEUSDT",
            "EOSUSDT",
            "AXSUSDT",
            "CAKEUSDT",
            "AMPUSDT",
            "ALGOUSDT",
            "MKRUSDT",
            "ATOMUSDT",
            "SHIBUSDT",
            "IOTAUSDT",
            "XTZUSDT",
            "NEOUSDT",
            "COMPUSDT",
            "AVAXUSDT",
            "HBARUSDT",
            "TFUELUSDT",
            "EGLDUSDT",
            "WAVESUSDT",
            "KSMUSDT",
            "DASHUSDT",
            "CHZUSDT",
            "ZECUSDT",
            "MANAUSDT",
            "ENJUSDT",
            "YFIUSDT",
            "SNXUSDT",
            "RUNEUSDT",
            "SUSHIUSDT",
            "ZILUSDT",
            "BNTUSDT",
            "ONEUSDT",
            "QTUMUSDT",
            "TRUUSDT"
         
        ]

    }
    ngOnChanges():void{
        this.watchList = this.watchList;
    }

    
}
