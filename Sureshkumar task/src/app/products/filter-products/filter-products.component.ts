import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { addProducts, errorMessage } from '../../app-constants';

@Component({
    selector: 'app-filter-products',
    templateUrl: './filter-products.component.html',
    styleUrls: ['./filter-products.component.css']
})

export class FilterProductsComponent implements OnInit {
    private filterForm: FormGroup;
    private filterProducts = addProducts;
    private isFormSubmitted: boolean = false;
    private errorMessage = errorMessage;
    @Output() filteredProducts = new EventEmitter<any>();
    constructor(private fb: FormBuilder) { }
    ngOnInit() {
        this.buildForm();
    }
    buildForm() {
        this.filterForm = this.fb.group({
            name: [''],
            category: [''],
            minPrice: [''],
            maxPrice: ['']
        }, { validator: this.validatePrices });
    }
    validatePrices(formGroup) {
        const minPrice = formGroup.controls['minPrice'];
        const maxPrice = formGroup.controls['maxPrice'];
        if (minPrice.value && maxPrice.value) {
            if (Number(maxPrice.value) >= Number(minPrice.value)) {
                maxPrice.setErrors(null);
            } else {
                maxPrice.setErrors({ invalidMaxPrice: true });
            }
        }
    }
    filterProductList() {
        if (!this.isFormSubmitted) {
            this.isFormSubmitted = true;
        }
        if (this.filterForm.valid) {
            setTimeout(() => {
                const availableProducts = JSON.parse(localStorage.getItem('products'));
                const filterAppliedProducts = availableProducts.filter((product) => {
                    let isPassedFilters = true;
                    const name = this.filterForm.controls.name.value.toLowerCase();
                    const minPrice = this.filterForm.controls.minPrice.value;
                    const maxPrice = this.filterForm.controls.maxPrice.value;
                    const category = this.filterForm.controls.category.value;
                    if (name) {
                        if (product.name.toLowerCase().includes(name) === false) {
                            isPassedFilters = false;
                        }
                    }
                    if (minPrice && maxPrice && isPassedFilters) {
                        if (Number(product.price) >= Number(minPrice) === false ||
                            Number(product.price) <= Number(maxPrice) === false) {
                            isPassedFilters = false;
                        }
                    } else if (minPrice && isPassedFilters) {
                        if (Number(product.price) >= Number(minPrice) === false) {
                            isPassedFilters = false;
                        }
                    } else if (maxPrice && isPassedFilters) {
                        if (Number(product.price) <= Number(maxPrice) === false) {
                            isPassedFilters = false;
                        }
                    }
                    if (category && isPassedFilters) {
                        if (Number(category) !== Number(product.category)) {
                            isPassedFilters = false;
                        }
                    }
                    if (isPassedFilters) {
                        return product;
                    }
                });
                this.filteredProducts.emit(filterAppliedProducts);
            }, 0);

        }
    }
    onCancelFilters() {
        this.filterForm.reset();
        this.isFormSubmitted = false;
        this.filterForm.controls.category.setValue('');
        this.filteredProducts.emit(0);        
    }
}
