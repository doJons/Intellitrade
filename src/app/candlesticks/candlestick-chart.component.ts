
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


@Component({
    selector: 'pm-candles',
    templateUrl: './candlestick-chart.component.html',

})

export class CandleStickChartComponent implements OnInit{

    pageTitle:string = "Ticker Name";
    @Input() ticker:string = "ADAUSDT";
    @Input() interval:string = "4h";
    @Input() limit:string = "50";
    candlesticks:CandleStick[];
    @ViewChild("chart") chart: ChartComponent
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

    getCandleSticks(){
            this.candleStickService.getCandleSticks(this.ticker, this.interval, this.limit).subscribe({
                next:candlesticks => {
                    this.candlesticks = [];
                    for(var i =0; i <candlesticks.length; i++){
                        var candlestick = new CandleStick(candlesticks[i]);
                        this.candlesticks.push(candlestick);
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