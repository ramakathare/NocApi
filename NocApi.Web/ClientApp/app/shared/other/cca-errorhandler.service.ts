import { ErrorHandler } from '@angular/core';

export class CcaErrorHandler implements ErrorHandler {
    handleError(error:any) {
        console.error(error);
    }
}