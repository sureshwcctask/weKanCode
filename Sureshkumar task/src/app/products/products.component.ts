import { Component, OnInit, OnDestroy } from '@angular/core';
import { products } from '../app-constants';
import { } from '@angular/core/src/metadata/lifecycle_hooks';
import { ProductService } from './products.service';
import { Router } from '@angular/router';


@Component({
    templateUrl: 'products.component.html'
})

export class ProductsComponent implements OnInit, OnDestroy {
    private products = products;
    private currentActiveTab: number = 0;
    private subscription: any;
    private userDetail: any;
    constructor(private productService: ProductService,
        private router: Router) { }
    ngOnInit() {
        this.subscription = this.productService.getActiveTab().subscribe((activeTab) => {
            if (activeTab) {
                this.currentActiveTab = activeTab;
            }
        });
        this.userDetail = JSON.parse(localStorage.getItem('userDetails'));
    }
    logout() {
        localStorage.setItem('userDetails', null);
        localStorage.setItem('products', null);
        this.router.navigate(['/login']);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
