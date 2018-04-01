import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './add-products/add-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { ProductsComponent } from './products.component';
import { AuthGuard } from '../auth-guard.service';

const productsRoutes: Routes = [
    {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'app-products',
                pathMatch: 'full'
            },
            {
                path: 'add-products',
                component: AddProductsComponent
            },
            {
                path: 'edit-products',
                component: EditProductsComponent
            },
            {
                path: 'view-products',
                component: ViewProductsComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(
            productsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProductsRouterModule { }