import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CandleStickService } from '../candlesticks/candlestick.service';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { ICandleStick, CandleStick } from '../candlesticks/candlestick';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  sub!: Subscription;
  candlesticks:CandleStick[]= [];
  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productService: ProductService, private candlestickService:CandleStickService) {}

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
    this.candlestickService.getCandleSticks("BTCUSDT","4h", "30").subscribe({
      next:candlesticks => {
        this.candlesticks = [];
        for(var i = 0; i<candlesticks.length; i++){
          var yo = candlesticks[i][0];
          var candlestick = new CandleStick(candlesticks[i]);
          this.candlesticks.push(candlestick);
        }
      }
    })
  }
}
