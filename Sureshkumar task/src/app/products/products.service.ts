import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {
    private activeTab: Subject<any> = new Subject<any>();

    setActiveTab(tabId: number) {
        this.activeTab.next(tabId);
    }
    getActiveTab(): Observable<any> {
        return this.activeTab.asObservable();
    }
}
