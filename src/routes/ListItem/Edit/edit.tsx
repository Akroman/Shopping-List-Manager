import { EditActionParams } from "./edit.types";
import { editItem, listContainsItem, removeAccents } from "../../../lib";
import { redirect } from "react-router-dom";
import { ListItemFormData } from "../../../components";

export const action = async ({ request, params }: { request: Request, params: EditActionParams }) => {
    const formData = await request.formData();
    const itemData = (Object.fromEntries(formData) as unknown) as ListItemFormData;

    if (removeAccents(itemData.itemName) === params.itemId) {
        return redirect(`/list/manage/${params.listId}`);
    }

    if (await listContainsItem(itemData.itemName, params.listId)) {
        alert(`Položka s názvem ${itemData.itemName} již existuje`);
        return redirect(`/list/manage/${params.listId}`);
    }

    await editItem(params.itemId, itemData.itemName, params.listId);

    return redirect(`/list/manage/${params.listId}`);
};