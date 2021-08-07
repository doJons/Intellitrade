
import { CandleStick } from "../candlesticks/candlestick";
import { CandleStickService } from "../candlesticks/candlestick.service";
import { Component, VERSION ,ViewChild,OnInit, Input} from '@angular/core';

import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexYAxis,ApexXAxis,ApexTitleSubtitle, ApexNonAxisChartSeries} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};


export enum NearMin{
    Init,
    GoodBuy,

}
@Component({
    selector: 'pm-candles',
    templateUrl: './candlestick-chart.component.html',

})

export class CandleStickChartComponent implements OnInit{

    pageTitle:string = "Ticker Name";
    @Input() ticker:string = "ADAUSDT";
    @Input() interval:string = "4h";
    @Input() limit:string = "50";
    description:string = "";
    binanceLink:string = "";


    candlesticks:CandleStick[];
    @ViewChild("chart") chart: ChartComponent
    @Input() algoType:string = "NearMin";

    chartColor = "white";

     
    public chartOptions: Partial<ChartOptions> | any;

    
    constructor(private candleStickService:CandleStickService){
     
    }

   
    createChartData(candlesticks:CandleStick[]){
      var data = [];
      for(var i =0; i < candlesticks.length; i++){
        var candlesick = candlesticks[i];
        data.push({
          x: new Date(candlesick.openTime),
          y: [Number(candlesick.open), Number(candlesick.high), Number(candlesick.low), Number(candlesick.close)]
        })
      }

      return data;
    }
    binanceLauncher(){
      var url = "https://www.binance.com/en/trade/" + this.ticker + "?layout=pro&theme=dark&type=spot";
      window.open(url);

    }
    setColorAndDescription(color:string, description:string){
      this.chartColor = color;
      this.description = description;

    }
  
    nearMinAlgo(candlesticks:CandleStick[]){
      var chunk = parseInt(this.limit) *.25 | 0;
      var range = 0;
      var min = 10000000000;
      var lows = [];
      for(var i =0 ; i < candlesticks.length; i++){
        var candlestick = candlesticks[i];
        var low = parseFloat(candlestick.low);
        var tempArray = candlesticks.slice(i, chunk + i);
        lows.push(this.getMin(tempArray));
        i = i + chunk;
        
      }

      var sum = 0;
      for(var i =0; i< lows.length; i++){
        sum += lows[i];
      }

      var avg = sum/lows.length;

      var currentPrice = parseFloat(this.candlesticks[this.candlesticks.length-1].open);
      if(currentPrice < avg){
        this.algoType = "GoodBuy";
        this.setColorAndDescription("LightGreen", "Good Buy, current price is lower then the NearMin Algo avg.")
      }
      
      if(this.algoType == "GoodBuy"){
        this.chartColor = "LightGreen";
      }

     
    }
    getMin(candlesticks:CandleStick[]){
      var min = 10000000000000;
      for(var i = 0; i <candlesticks.length; i++){
        var low = parseFloat(candlesticks[i].low)
        if( low < min){
          min = low;
        }
      }

      return min;
    }

    RSI(candlesticks:CandleStick[]){
      var segmentIteration = parseInt(this.limit) *.25 | 0;
      for(var i =0 ; i < candlesticks.length; i++){
        var candlestick = candlesticks[i];
        var min = candlestick.low;

        
      }
    }

    getCandleSticks(){
            this.candleStickService.getCandleSticks(this.ticker, this.interval, this.limit).subscribe({
                next:candlesticks => {
                    this.candlesticks = [];
                    for(var i =0; i <candlesticks.length; i++){
                        var candlestick = new CandleStick(candlesticks[i]);
                        this.candlesticks.push(candlestick);
                    }
                    if(this.algoType == "NearMin"){
                      this.nearMinAlgo(this.candlesticks);
                    }
                 

                    var data = this.createChartData(this.candlesticks);
                    

                    this.chartOptions = {
                      series: [
                        {
                          name: "candle",
                          data: data
                        }
                      ],
                      chart: {
                        background: this.chartColor,
                        animations: {
                          enabled: false,
                          easing: 'easeinout',
                          speed: 800,
                          animateGradually: {
                              enabled: true,
                              delay: 150
                          },
                          dynamicAnimation: {
                              enabled: false,
                              speed: 500
                          }
                      },
                        type: "candlestick",
                        height: 350
                      },
                      title: {
                        text: "CandleStick Chart",
                        align: "left"
                      },
                      xaxis: {
                        type: "datetime"
                      },
                      yaxis: {
                        tooltip: {
                          enabled: true
                        }
                      }
                    };
                }
            })
        }

    ngOnInit():void{
      this.getCandleSticks();
    }
}