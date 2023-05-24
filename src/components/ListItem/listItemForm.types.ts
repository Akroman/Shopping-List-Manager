export enum ListItemFormView {
    Create = "Create",
    Edit = "Edit"
}

export interface ListItemFormData {
    readonly itemName: string;
}

export interface ListItemFormProps {
    readonly action: string;
    readonly view: ListItemFormView;
    readonly itemName?: string;
}