import { Injectable, Inject } from '@angular/core';

@Injectable()
export class CcaHelper{
    constructor() { }

    public serialize(obj) {
        if (obj) {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        }
        return "";
    }

    public serializeRecursive(obj, prefix) {
        if (obj) {
            var str = [], p;
            for (p in obj) {
                if (obj.hasOwnProperty(p)) {
                    var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                    str.push((v !== null && typeof v === "object") ?
                        this.serializeRecursive(v, k) :
                        encodeURIComponent(k) + "=" + encodeURIComponent(v));
                }
            }
            return str.join("&");
        }
        return "";
    }    

    public extend<A>(a: A): A;
    public extend<A, B>(a: A, b: B): A & B;
    public extend<A, B, C>(a: A, b: B, c: C): A & B & C;
    public extend<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
    public extend(...args: any[]): any {
        const newObj = {};
        for (const obj of args) {
            for (const key in obj) {
                //copy all the fields
                newObj[key] = obj[key];
            }
        }
        return newObj;
    };
}



