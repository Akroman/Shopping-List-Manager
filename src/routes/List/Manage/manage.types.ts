import { List } from "../../../lib";

export interface ManageLoaderParams {
    readonly listId: string;
}

export interface ManageLoaderData {
    readonly list: List;
    readonly existingItemNames: Array<string>;
}

export interface ManageActionParams {
    readonly listId: string;
}