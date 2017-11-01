export type IPropertyType = "boolean" | "number" | "string";
export type IPropertyDefaultType = boolean | number | string;
export interface INocModel {
    id: {
        type: "number",
        size: 8
    }
}

export interface IModel extends INocModel {
    [key: string]: IProperty
}

export interface IProperty {
    type: IPropertyType,
    size?: number,
    maxLength?: number,
    required?: boolean,
    default?:IPropertyDefaultType
}