import { ListItemProps } from "./listItem.types";
import { X } from "react-bootstrap-icons";
import { DeleteButton } from "../DeleteButton";
import { forwardRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ListItemForm } from "./listItemForm";
import { ListItemFormView } from "./listItemForm.types";

export const ListItem = forwardRef((
    { itemId, itemName, listId, draggableProps, dragHandleProps }: ListItemProps,
    ref
) => {
    const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);

    const handleEditClick = () => {
        setIsBeingEdited((prevState) => !prevState);
    };

    return <Row className="mb-3" ref={ref} {...draggableProps} {...dragHandleProps}>
        <Col xs={2} sm={1}>
            <DeleteButton
                action={`/listItem/delete/${itemId}/${listId}`}
                confirmText={`Určitě smazat položku ${itemName}?`}
            >
                <X />
            </DeleteButton>
        </Col>

        <Col sm={2} lg={1}>
            <Button variant="outline-dark" onClick={handleEditClick}>{isBeingEdited ? "Zrušit" : "Upravit"}</Button>
        </Col>

        <Col>
            {isBeingEdited
                ? <ListItemForm
                    action={`/listItem/edit/${itemId}/${listId}`}
                    view={ListItemFormView.Edit}
                    itemName={itemName}
                />
                : itemName
            }
        </Col>
    </Row>;
});