import { List } from "../../lib";

export enum ListFormView {
    Create = "Create",
    Edit = "Edit"
}

export interface ListFormData {
    readonly listName: string;
}

export interface ListFormProps {
    readonly action: string;
    readonly view: ListFormView;
    readonly list?: List;
}