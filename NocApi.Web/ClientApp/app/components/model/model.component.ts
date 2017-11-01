import { Component, Inject } from '@angular/core';
import { INocModel, IProperty, IPropertyType } from '../../models/INocModel';
import { APP_CONFIG, IAppConfig } from '../../config';
import { CcaGridService, Guid, ICcaGridData } from '../../../modules/cca-grid';

@Component({
    selector: 'noc-model',
    templateUrl: './model.component.html',
    styleUrls: ['./model.component.css']
})
export class ModelComponent {
    properties: IProperty[];
    model: INocModel[];

    modelsGrid: ICcaGridData;
    
    constructor(private ccagridservice: CcaGridService,
        @Inject(APP_CONFIG) private config: IAppConfig
    ) {

    }

    ngOnInit() {
        let that = this;
        this.modelsGrid = {
            className: "modelsGrid",
            gridId: Guid.newGuid(),
            model: [
                { display: "Model", field: "name", width: "30%" },
                { display: "Name", field: "name", width: "30%" },
                { display: "Type", field: "type", width: "30%" },
                { display: "Default", field: "default", width: "30%" },
                { display: "Required", field: "required", width: "30%" },
                { display: "Max Length", field: "maxLength", width: "30%" },
            ],
            sort: { field: "name" },
            url: new URL(`${this.config.apiEndpoint}/api/models`),
            actions: {
                "Edit": {
                    className: "modelsGridDataEdit", action: (index) => { console.log(index); }
                },
                "delete": {
                    className: "modelsGridDataDelete", action: (index) => { console.error(index); }
                }
            }
        }
        this.ccagridservice.loadGrid(this.modelsGrid.gridId);

    }

    submit() {
        console.log("data", this.model);
    }
    addProperty(name: string, property: IProperty) {
        this.model[name] = property;
    }
}
