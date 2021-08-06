import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductModule } from './products/product.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CandleStickService } from './candlesticks/candlestick.service';
import { CandleStickChartComponent } from './candlesticks/candlestick-chart.component';
import { ChartListComponent } from './charts/chart-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ChartListComponent,
    CandleStickChartComponent,
  
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
         path: 'welcome', component: WelcomeComponent },

         {
          path: 'chart', component: ChartListComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    ProductModule,
    NgApexchartsModule,

  ],
  //schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
