import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ICcaGridData, Guid, ILoadGridRequestData } from './cca-grid.component';

@Injectable()
export class CcaGridService {
    constuctor() { }

    private grid = new Subject<ILoadGridRequestData>();
    gridObservable$ = this.grid.asObservable();

    public loadGrid(gridId: Guid, success?: (result: any) => void, error?: (error: any) => void ) {
        this.grid.next({ action: "loadGrid", gridId: gridId,success:success,error:error}); 
    }

    public loadGridGet(gridId: Guid, success?: (result: any) => void, error?: (error: any) => void) {
        this.grid.next({ action: "loadGridGet", gridId: gridId, success: success, error: error });
    }

    public reLoadGrid(gridId: Guid, success?: (result: any) => void, error?: (error: any) => void) {
        this.grid.next({ action: "reloadGrid", gridId: gridId, success: success, error: error }); 
    }
}