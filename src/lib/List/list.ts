import localforage from "localforage";
import { List, ListItems } from "./list.types";
import { removeAccents } from "../utils/utils.ts";

export const LIST_NAME_MAX_LENGTH = 1000;
export const LIST_ITEM_NAME_MAX_LENGTH = 1000;
const LISTS_KEY = "lists";

export const getLists = async (): Promise<Array<List>> => {
    const lists = await localforage.getItem<Array<List>>(LISTS_KEY);
    return lists ?? [];
};

export const createList = async (name: string) => {
    const items: ListItems = new Map<string, string>();
    const id = removeAccents(name);
    const list: List = { id, name, items };

    await addList(list);

    return list;
};

export const getList = async (id: string) => {
    const lists = await getLists();
    return lists.find(list => list.id === id);
};

export const existsList = async (name: string) => await getList(removeAccents(name)) !== undefined;

export const deleteList = async (id: string) => {
    const lists = await getLists();
    await setLists(lists.filter((list) => list.id !== id))
};

export const listContainsItem = async (itemName: string, listId: string) => {
    const list = await getList(listId);
    return list && list.items.has(removeAccents(itemName));
};

export const addItemToList = async (itemName: string, listId: string) => {
    return await updateList(listId, (list) => list.items.set(removeAccents(itemName), itemName));
};

export const deleteItemFromList = async (itemId: string, listId: string) => {
    return await updateList(listId, (list) => list.items.delete(itemId));
};

export const moveListItem = async (sourceItemIndex: number, destinationItemIndex: number, listId: string) => {
    return await updateList(listId, (list) => {
        const items = [...list.items];

        const [removed] = items.splice(sourceItemIndex, 1);
        items.splice(destinationItemIndex, 0, removed);

        list.items = new Map<string, string>(items);
    });
};

export const editItem = async (itemId: string, newItemName: string, listId: string) => {
    return await updateList(listId, (list) => {
        const items = [...list.items];

        const itemIndex = items.findIndex(([id]) => itemId === id);
        items[itemIndex] = [removeAccents(newItemName), newItemName];

        list.items = new Map<string, string>(items);
    });
};

export const getAllItemNames = async () => {
    const lists = await getLists();
    return [... new Set<string>(lists.flatMap((list) => [...list.items.values()]))];
};

export const editListName = async (id: string, newName: string) => {
    return await updateList(id, (list) => {
        list.name = newName;
        list.id = removeAccents(newName);
    });
};

const addList = async (list: List) => {
    const lists = await getLists();
    lists.unshift(list);

    await setLists(lists);
};

const updateList = async (id: string, updateFn: (list: List) => void) => {
    const listToUpdate = await getList(id);

    if (listToUpdate) {
        updateFn(listToUpdate);

        const lists = await getLists();
        const listIndex = lists.findIndex((list) => id === list.id);
        lists[listIndex] = listToUpdate;

        await setLists(lists);
    }

    return listToUpdate;
};

const setLists = (lists: Array<List>) => localforage.setItem(LISTS_KEY, lists);