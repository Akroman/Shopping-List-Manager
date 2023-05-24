import { addItemToList, getAllItemNames, getList, listContainsItem } from "../../../lib";
import { redirect, useLoaderData } from "react-router-dom";
import { ListItemForm, ListItemFormData, ListItemFormView, ListItemTable } from "../../../components";
import { ManageActionParams, ManageLoaderData, ManageLoaderParams } from "./manage.types";

export const Manage = () => {
    const { list } = useLoaderData() as ManageLoaderData;

    return <>
        <div className="mb-5">
            <ListItemForm action={`/list/manage/${list.id}`} view={ListItemFormView.Create} />
        </div>

        <ListItemTable list={list} />
    </>;
};

export const loader = async ({ params }: { params: ManageLoaderParams }) => {
    const list = await getList(params.listId);
    const existingItemNames = await getAllItemNames();

    return { list, existingItemNames };
}

export const action = async ({ request, params }: { request: Request, params: ManageActionParams }) => {
    const formData = await request.formData();
    const itemData = (Object.fromEntries(formData) as unknown) as ListItemFormData;

    if (await listContainsItem(itemData.itemName, params.listId)) {
        alert(`Položka s názvem ${itemData.itemName} již existuje`);
        return null;
    }

    await addItemToList(itemData.itemName, params.listId);

    return redirect(`/list/manage/${params.listId}`);
};