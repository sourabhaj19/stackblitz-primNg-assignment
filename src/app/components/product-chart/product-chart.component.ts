import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.scss']
})
export class ProductChartComponent{
  @Input() products: Product[] = [];
  chartData: any[] = [];

  updateChart(productList:any): void {
    this.chartData = productList.map((product:any) => ({
      name: product.name,
      value: product.price,
    }));
  }
}
