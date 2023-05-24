import { redirect } from "react-router-dom";
import { createList, existsList } from "../../../lib";
import { ListForm, ListFormData, ListFormView } from "../../../components";

export const Create = () => {
    return <ListForm action="/list/create" view={ListFormView.Create} />;
}

export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const listData = (Object.fromEntries(formData) as unknown) as ListFormData;

    if (await existsList(listData.listName)) {
        alert(`Seznam se jménem ${listData.listName} již existuje`);
        return null;
    }

    await createList(listData.listName);

    return redirect("/");
};