import { HttpHeader } from './http-header.model';

export interface IResponseErrorInterceptor {
    afterResponseErrorAsync(errorresponse: any, url: string, method: string, data: any, headers: HttpHeader[]):void;
}