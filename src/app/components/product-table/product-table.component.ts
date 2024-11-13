import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ProductChartComponent } from '../product-chart/product-chart.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  products: Product[] = [];
  productForm: FormGroup;
  editMode = false;
  chartData: any;
  displayModal: boolean = false;
  categoryMaster : any[] =  [
    { name: 'Electronic', code: '001' },
    { name: 'Kitchen', code: '002' },
];
  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
show:boolean=false;
onSubmit(product:Product): void {
    if (this.productForm.invalid) return;
    if (this.editMode) {
      const index = this.products.findIndex(
        (prod) => prod.id === product?.id
      );
      if (index !== -1) {
        this.products[index] = product
      }
    } else {
      product.id = Date.now()
      this.products.push(product);
    }

    this.chartData = this.products.map((product: any) => ({
      name: product.name,
      value: product.price,
    }));
    this.productForm.reset();
    this.show = true;
    this.editMode = false;
  }


  showAddProductModal() {
    this.displayModal = true;
    this.editMode = false;
    this.productForm.reset();
  }
  editProduct(product: Product): void {
    this.displayModal = true;
    this.editMode = true;
    this.productForm.patchValue(product);
  }
  deleteProduct(id: number): void {
    this.products = this.products.filter((p) => p.id !== id);
    this.chartData = this.products.map((product:any) => ({
      name: product.name,
      value: product.price,
    }));
  }
}
