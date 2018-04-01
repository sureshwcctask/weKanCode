import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { editProducts } from '../../app-constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addProducts, errorMessage, products } from '../../app-constants';
import { ProductService } from '../products.service';

declare var $:any;

@Component({
    templateUrl: './edit-products.component.html',
    styleUrls: ['./edit-products.component.css']
})

export class EditProductsComponent implements OnInit, OnDestroy {
    private availableProducts: Array<any>;
    private editProducts = editProducts;
    private removeProductId: number = 0;
    private editProductForm: FormGroup;
    private editProductImage: string = '';
    private ediProductCategories = addProducts.productCategories;
    private editProductInfo = addProducts;
    private isFormSubmitted: boolean = false;
    private errorMessage = errorMessage;
    private isProdEditSuccess: boolean = false;
    constructor(private fb: FormBuilder,
        private productService: ProductService) {
    }

    ngOnInit() {
        this.availableProducts = JSON.parse(localStorage.getItem('products'));
        this.buildForm();
        this.productService.setActiveTab(1);
    }
    buildForm() {
        this.editProductForm = this.fb.group({
            id: ['', Validators.required],
            name: ['', Validators.required],
            category: ['', Validators.required],
            price: ['', Validators.required],
            description: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(1000)]]
        });
    }
    editProduct(productId: number) {
        const editableProduct = this.availableProducts.find((prod) => {
            if (prod.id === productId) {
                return true;
            }
        });
        if (editableProduct) {
            this.isFormSubmitted = false;
            this.editProductForm.setValue({
                id: editableProduct.id,
                name: editableProduct.name,
                category: editableProduct.category,
                price: editableProduct.price,
                description: editableProduct.description
            });
            this.editProductImage = editableProduct.image;
        }
    }
    encodeImageFileAsURL(element) {
        const scope = this;
        const file = element.target.files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            scope.editProductImage = reader.result;
        };
        reader.readAsDataURL(file);
    }
    getFilteredProducts(filteredProducts) {
        if (filteredProducts && filteredProducts.length > 0) {
            this.availableProducts = filteredProducts;
        }
    }
    onCancelUpdate() {
        this.editProductForm.reset();
        this.editProductForm.controls.category.setValue('');
        this.editProductImage = '';
        this.isFormSubmitted = false;
    }
    updateProduct() {
        if (!this.isFormSubmitted) {
            this.isFormSubmitted = true;
        }
        if (this.editProductForm.valid) {
            this.availableProducts.map((product) => {
                if (product.id === this.editProductForm.controls.id.value) {
                    product.name = this.editProductForm.controls.name.value,
                        product.category = this.editProductForm.controls.category.value,
                        product.price = this.editProductForm.controls.price.value,
                        product.description = this.editProductForm.controls.description.value,
                        product.image = this.editProductImage;
                }
            });
            const updatedProducts = this.availableProducts;
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            $('#editProductModal').modal('hide');
            this.isProdEditSuccess = true;
            setTimeout(() => {
                this.isProdEditSuccess = false;
            }, 3000);
        }
    }
    removeProduct() {
        const updatedProducts = this.availableProducts.filter(product => {
            if (product.id !== this.removeProductId) {
                return product;
            }
        });
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        this.availableProducts = updatedProducts;
    }
    ngOnDestroy() { }
}
