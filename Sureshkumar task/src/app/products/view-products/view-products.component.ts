import { Component, OnInit, ViewChild } from '@angular/core';
import { editProducts, addProducts } from '../../app-constants';
import { ProductService } from '../products.service';

@Component({
    templateUrl: './view-products.component.html',
    styleUrls: ['./view-products.component.css']
})

export class ViewProductsComponent implements OnInit {
    private availableProducts: Array<any>;
    private editProducts = editProducts;
    private showProduct: any;
    @ViewChild('myModal') myModal;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.setActiveTab(0);
        setTimeout(() => {
            this.availableProducts = JSON.parse(localStorage.getItem('products'));
            debugger
        }, 100);

    }
    showProductDetails(productId: number) {
        this.showProduct = this.availableProducts.find(product => {
            if (product.id === productId) {
                return true;
            }
        });
        addProducts.productCategories.forEach((category) => {
            if (category.id === this.showProduct.category) {
                this.showProduct.categoryName = category.name;
            }
        });

        document.getElementById('editModalButton').click();
    }
    getFilteredProducts(filteredProducts) {
        if (filteredProducts && filteredProducts.length > 0) {
            this.availableProducts = filteredProducts;
        } else {
            this.availableProducts = JSON.parse(localStorage.getItem('products'));
        }
    }
}
