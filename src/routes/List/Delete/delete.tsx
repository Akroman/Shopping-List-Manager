import { deleteList } from "../../../lib";
import { redirect } from "react-router-dom";
import { DeleteActionParams } from "./delete.types";

export const action = async ({ params }: { params: DeleteActionParams }) => {
    await deleteList(params.listId);
    return redirect("/");
};