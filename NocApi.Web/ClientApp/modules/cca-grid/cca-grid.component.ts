import {
    Component, Input, OnInit, OnDestroy,
    // animation imports
    //trigger, state, style, transition, animate, Inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import { CcaHttp, IQueryObject } from '../cca-http'
import { CcaGridService } from './cca-grid.service';
import { CcaHelper } from '../cca-helper';
import { Observable } from "rxjs/Rx";


export class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
export class ILoadGridRequestData {
    action: string;
    gridId: Guid;
    success?: (param) => void;
    error?: (param) => void;
}
export class ICcaGridModel {
    field: string;
    display?: string;
    width?: string;
    format?: (row: any, value: any) => string;
    search?: boolean;
    sort?: boolean;
    hidden?: boolean;
}
export class ICcaSort {
    field: string;
    isascending?: boolean;
}

export class ICcaGridPageData {
    selectedPageSize?: number;
    totalPages?: number;
    currentPage?: number;
    totalRecords?: number;
    currentFromRecord?: number;
    currentToRecord?: number;
}

export class ICcaGridRowAction {
    [index: string]: ICcaGridRowActionInner;
}

export class ICcaGridRowActionInner {
    className: string;
    action: (index) => void;
    disabledRows?: number[];
}

export class ICcaGridData {
    className: string;
    gridId: Guid;
    rows?: any[];
    model: ICcaGridModel[];
    url: URL;
    sort: ICcaSort;
    pageSizes?: number[];
    pageData?: ICcaGridPageData;
    filterData?: any; //optional if you have to pass additional parameters to api
    operatorData?: any;
    condtionObject?: any;
    gridLoadComplete?: () => void; //optional,
    normalized?: boolean;
    searchable?: boolean;
    sortable?: boolean;
    selectable?: "single" | "multi";
    searchData?: any;
    actions?: ICcaGridRowAction;
    onLoadSuccess?: (result) => void;
    onLoadError?: (error) => void;
    onLoadComplete?: () => void;
    beforeLoad?: () => void;
    pagination?: boolean;
    loadingGrid?: boolean = true;
    gridLoadFailed?: boolean = false;
}

@Component({
    selector: 'cca-grid',
    templateUrl: './cca-grid.component.html',
    styleUrls: ['./cca-grid.component.css']
})
export class CcaGrid implements OnInit, OnDestroy {
    @Input("griddata") data: ICcaGridData;

    gridsubscription: Subscription;

  
    isInitCalled: boolean = false;
    allSelected: boolean = false;

    constructor(private chttp: CcaHttp,
        private ccagridservice: CcaGridService,
        private ccahelper: CcaHelper,
        private _sanitizer: DomSanitizer
    ) {

        let that = this;
        this.gridsubscription = this.ccagridservice.gridObservable$.subscribe((data: ILoadGridRequestData) => {
            if (!this.isInitCalled) //if isInit is called yet, setTimeout is called to wait for the isInit to happen.
                setTimeout(() => { that.loadGridRows(data.gridId, data.success, data.error,data.action); });
            else
                that.loadGridRows(data.gridId, data.success, data.error,data.action);
        });
    }

    ngOnInit() {
        if (this.data == null) {
            console.error("data can not be null"); return;
        }
        this.normalizeGridData(this.data);
        this.isInitCalled = true;
    }
    ngOnDestroy() {
        this.gridsubscription.unsubscribe();
    }

    loadGridRows(gridId: Guid, success?: (result: any) => void, error?: (error: any) => void, action?: string) {

        if (this.data == null) {
            console.error("data can not be null"); return;
        }
        var that = this;
        

        var data = this.data;

        

        if (gridId != data.gridId) return;

        data.loadingGrid = true;


        this.normalizeGridData(data);

        if (data.beforeLoad) data.beforeLoad();

        var paginationQueryParams: string = this.ccahelper.serialize(data.pageData);
        var searchQueryParams: string = this.ccahelper.serialize(data.searchData);
        var sort: string = "sort=" + data.sort.field;
        var sortOrder: string = "sortorder=" + (data.sort.isascending ? "ASC" : "DESC");
        var url = data.url.href + "?" + sort + "&" + sortOrder + "&" + paginationQueryParams;

       

        

        for (const key in (data.searchData || {})) {
            //copy all the fields
            data.filterData[key] = data.searchData[key];
        }


        

        var obs: Observable<any>;
        
        if (action == "loadGridGet")
            obs = this.chttp.getObservable(url + "&" + this.ccahelper.serialize(data.filterData));
        else {
            var queryObject: IQueryObject = {
                filterObject: data.filterData,
                operatorObject: data.operatorData,
                condtionObject: data.condtionObject
            }
            obs = this.chttp.postObservableWithOperators(url, queryObject);
        }
         
        obs.subscribe(result => {
            data.rows = result.rows;

            data.pageData.currentFromRecord = result.currentFromRecord;
            data.pageData.currentToRecord = result.currentToRecord;
            data.pageData.selectedPageSize = result.selectedPageSize;
            data.pageData.totalPages = result.totalPages;
            data.pageData.totalRecords = result.totalRecords;
            data.pageData.currentPage = result.currentPage;

            data.gridLoadFailed = false;
            data.loadingGrid = false

            this.allSelected = true;
            for (let item of data.rows) {
                if (!item.selected) {
                    this.allSelected = false;
                    break;
                }
            }
            data.rows.forEach((item, index) => {
                
            });

            if (success) success(result);
            if (data.onLoadComplete) data.onLoadSuccess(result);
        }, (er) => {
            data.gridLoadFailed = true;
            data.loadingGrid = false;
            if (er) console.error(er);
            if (data.onLoadComplete) data.onLoadError(er);
        }, () => {
            if (data.onLoadComplete) data.onLoadComplete();
        });
    }

    normalizeGridData(data: ICcaGridData) {
        if (data.normalized) return;
        data.normalized = true;
        let that = this;

        if (data.pagination == null) data.pagination = true;

        if (data.model) {
            for (let item of data.model) {
                item.display = item.display || item.field.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
                item.format = item.format || ((row: any, value: any) => { return value; });

                if (item.search == null) item.search = true;
                if (item.sort == null) item.sort = true;
            }
        }

        if (data.actions) {
            for (let key in data.actions) {
                data.actions[key].disabledRows = data.actions[key].disabledRows || [];
            }
        }

        if (data.sort) if (data.sort.isascending == null) data.sort.isascending = false;
        data.pageSizes = data.pageSizes || [5, 10, 20, 30, 50, 100];
        data.pageData = data.pageData || { selectedPageSize: 5, totalPages: 1, currentPage: 1, totalRecords: 1, currentFromRecord: 1, currentToRecord: 1 };
        data.rows = data.rows || [];

        if (data.searchable == null) data.searchable = true;
        if (data.sortable == null) data.sortable = true;

        if (data.searchable) data.searchData = {};

        if (!data.searchable) {
            if (data.model) {
                for (let item of data.model) {
                    item.search = false;
                }
            }
        }

        if (!data.sortable) {
            if (data.model) {
                for (let item of data.model) {
                    item.sort = false;
                }
            }
        }
        data.filterData = data.filterData || {};
        data.operatorData = data.operatorData || {};
        data.condtionObject = data.condtionObject || "or";
    }
    selectChanged(r) {
        if (this.data.selectable == "single" && r.selected) {
            for (let item of this.data.rows) {
                if (r !== item) item.selected = false;
            }
        }
        if (this.data.selectable == "multi" && !r.selected) {
            this.allSelected = false;
        }
    }
    selectAllChanged() {
        for (let item of this.data.rows) {
            item.selected = this.allSelected;
        }
    }
    getColumnValue(m: ICcaGridModel, row: any) {
        return m.format ?
            m.format(row, row[m.field]) :
            //this._sanitizer.bypassSecurityTrustHtml(m.format(row, row[m.field])) :
            row[m.field];
    }
    changeSort(field: string, sortable: boolean) {
        if (!sortable) return;
        var isAscending = this.data.sort.isascending;
        this.data.sort = {
            field: field,
            isascending: !isAscending
        }
        this.loadGridRows(this.data.gridId);
    }
    pageSizeChanged() {
        this.loadGridRows(this.data.gridId);
    }
    enterKeySearch() {
        this.loadGridRows(this.data.gridId);
    }
    pageNumberChanged() {
        this.loadGridRows(this.data.gridId);
    }
    goToFirstPage() {
        this.data.pageData.currentPage = 1;
        this.loadGridRows(this.data.gridId);
    }
    goToPreviousPage() {
        if (this.data.pageData.currentPage > 1)--this.data.pageData.currentPage;
        this.loadGridRows(this.data.gridId);
    }
    goToNextPage() {
        if (this.data.pageData.currentPage < this.data.pageData.totalPages)++this.data.pageData.currentPage;
        this.loadGridRows(this.data.gridId);
    }
    goToLastPage() {
        this.data.pageData.currentPage = this.data.pageData.totalPages;
        this.loadGridRows(this.data.gridId);
    }
}
