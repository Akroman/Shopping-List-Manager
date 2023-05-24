import { ListForm, ListFormData, ListFormView } from "../../../components";
import { editListName, existsList, removeAccents } from "../../../lib";
import { redirect, useLoaderData } from "react-router-dom";
import { EditActionParams } from "./edit.types";
import { ManageLoaderData } from "../Manage";

export const Edit = () => {
    const { list } = useLoaderData() as ManageLoaderData;

    return <ListForm action={`/list/edit/${list.id}`} view={ListFormView.Edit} list={list} />
};

export const action = async ({ request, params }: { request: Request, params: EditActionParams }) => {
    const formData = await request.formData();
    const listData = (Object.fromEntries(formData) as unknown) as ListFormData;

    if (removeAccents(listData.listName) === params.listId) {
        return redirect("/");
    }

    if (await existsList(listData.listName)) {
        alert(`Seznam se jménem ${listData.listName} již existuje`);
        return null;
    }

    await editListName(params.listId, listData.listName);

    return redirect("/");
};