import { DeleteActionParams } from "./delete.types";
import { deleteItemFromList } from "../../../lib";
import { redirect } from "react-router-dom";

export const action = async ({ params }: { params: DeleteActionParams }) => {
    await deleteItemFromList(params.itemId, params.listId);
    return redirect(`/list/manage/${params.listId}`);
};