export type ListItems = Map<string, string>;

export interface List {
    id: string;
    name: string;
    items: ListItems;
}