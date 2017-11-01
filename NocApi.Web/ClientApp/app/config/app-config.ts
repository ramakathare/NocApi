import { IAppConfig } from './app-config.interface';
import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken("app.config");

export const AppConfig: IAppConfig = {   
    apiEndpoint: "http://localhost:1337"
};
