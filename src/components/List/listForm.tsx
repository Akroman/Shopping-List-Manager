import { Form as RouterForm } from "react-router-dom";
import { Button, Col, Form as BootstrapForm, Row } from "react-bootstrap";
import { ListFormProps, ListFormView } from "./listForm.types";
import { DeleteButton } from "../DeleteButton";
import { LIST_NAME_MAX_LENGTH } from "../../lib";

export const ListForm = ({ action, view, list }: ListFormProps) => {
    return <>
        <RouterForm method="post" action={action} id="listForm" />

        <BootstrapForm.Group as={Row} className="mb-3" controlId="listName">
            <Col xs={2}>
                <BootstrapForm.Label>Název</BootstrapForm.Label>
            </Col>

            <Col xs={6} md={4}>
                <BootstrapForm.Control
                    type="text"
                    name="listName"
                    required
                    maxLength={LIST_NAME_MAX_LENGTH}
                    defaultValue={list?.name ?? ""}
                    form="listForm"
                />
            </Col>
        </BootstrapForm.Group>

        <Row>
            <Col xs={3} lg={1}>
                <Button type="submit" variant="outline-dark" form="listForm">
                    {view === ListFormView.Create ? "Vytvořit" : "Upravit"}
                </Button>
            </Col>

            {view === ListFormView.Edit && list !== undefined &&
                <Col xs={3} lg={1}>
                    <DeleteButton action={`/list/delete/${list.id}`} confirmText={`Určitě smazat seznam ${list.name}?`}>
                        Smazat
                    </DeleteButton>
                </Col>
            }
        </Row>
    </>;
};