import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ProductsRouterModule } from './products-router.module';
import { CommonModule } from '@angular/common';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './products.service';
import { FilterProductsComponent } from './filter-products/filter-products.component';


@NgModule({
    declarations: [
        ProductsComponent,
        AddProductsComponent,
        EditProductsComponent,
        ViewProductsComponent,
        FilterProductsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProductsRouterModule
    ],
    providers: [ProductService],
})
export class ProductsModule { }
