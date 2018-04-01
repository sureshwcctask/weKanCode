import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { addProducts, errorMessage, products } from '../../app-constants';
import { ProductService } from '../products.service';

@Component({
    templateUrl: './add-products.component.html',
    styleUrls: ['./add-products.component.css']
})

export class AddProductsComponent implements OnInit, OnDestroy {
    private addProductsForm: FormGroup;
    private addProducts = addProducts;
    private products = products;
    private isFormSubmitted: boolean = false;
    private errorMessage = errorMessage;
    private productImage: string;
    private isProdAddSuccess: boolean = false;
    constructor(private fb: FormBuilder,
        private productService: ProductService) { }
    ngOnInit() {
        this.buildForm();
        this.productService.setActiveTab(2);
    }
    buildForm() {
        this.addProductsForm = this.fb.group({
            name: ['', Validators.required],
            category: ['', Validators.required],
            price: ['', Validators.required],
            description: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(1000)]]
        });
        this.addProductsForm.valueChanges.subscribe((data) => {
            if (this.isProdAddSuccess) {
                this.isProdAddSuccess = false;
            }
        });
    }
    addProduct() {
        if (!this.isFormSubmitted) {
            this.isFormSubmitted = true;
        }
        if (this.addProductsForm.valid && this.productImage) {
            const availableProducts = JSON.parse(localStorage.getItem('products'));
            let maxIdOfProducts: any;
            if (availableProducts.length > 0) {
                maxIdOfProducts = availableProducts.reduce(function (prev, current) {
                    return (prev.id > current.id) ? prev : current;
                });
            }
            const addProduct: Object = {
                id: (maxIdOfProducts && Number(maxIdOfProducts.id) > 0) ? maxIdOfProducts.id + 1 : 1,
                name: this.addProductsForm.controls.name.value,
                category: this.addProductsForm.controls.category.value,
                price: this.addProductsForm.controls.price.value,
                description: this.addProductsForm.controls.description.value,
                image: this.productImage
            };
            availableProducts.unshift(addProduct);
            localStorage.setItem('products', JSON.stringify(availableProducts));
            this.addProductsForm.reset();
            this.addProductsForm.controls.category.setValue('');
            this.productImage = '';
            this.isFormSubmitted = false;
            this.isProdAddSuccess = true;
        }
    }
    cancelProduct() {
        this.addProductsForm.reset();
        this.addProductsForm.controls.category.setValue('');
        this.productImage = '';
        this.isFormSubmitted = false;
    }
    encodeImageFileAsURL(element) {
        const scope = this;
        const file = element.target.files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            scope.productImage = reader.result;
        };
        reader.readAsDataURL(file);
    }
    ngOnDestroy() {

    }
}
