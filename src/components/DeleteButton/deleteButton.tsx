import { Button } from "react-bootstrap";
import { Form } from "react-router-dom";
import { FormEvent } from "react";
import { DeleteButtonProps } from "./deleteButton.types";

export const DeleteButton = ({ action, confirmText, children }: DeleteButtonProps) => {
    const handleDelete = (event: FormEvent) => {
        if (!confirm(confirmText)) {
            event.preventDefault();
        }
    };

    return <Form method="post" action={action} onSubmit={handleDelete}>
        <Button variant="danger" type="submit">{children}</Button>
    </Form>;
};