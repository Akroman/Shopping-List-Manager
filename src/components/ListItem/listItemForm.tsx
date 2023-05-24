import { Button, Col, Row } from "react-bootstrap";
import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { Form, useLoaderData } from "react-router-dom";
import { FormEvent, useState } from "react";
import { ListItemFormProps, ListItemFormView } from "./listItemForm.types";
import { ManageLoaderData } from "../../routes/List/Manage";
import { LIST_ITEM_NAME_MAX_LENGTH } from "../../lib";

export const ListItemForm = ({ action, view, itemName }: ListItemFormProps) => {
    const { existingItemNames } = useLoaderData() as ManageLoaderData;

    const [suggestions, setSuggestions] = useState<Array<string>>(existingItemNames);
    const [autocompleteValue, setAutocompleteValue] = useState<string>(itemName ?? "");

    const searchItemNames = (event: AutoCompleteCompleteEvent) => {
        setSuggestions(() => {
            return existingItemNames.filter((itemName) => itemName.startsWith(event.query));
        });
    };

    const handleSubmit = (event: FormEvent) => {
        if (autocompleteValue === "") {
            alert("Název položky nemůže být prázdný");
            event.preventDefault();
        }
    };

    return <Form method="post" action={action} onSubmit={handleSubmit}>
        <Row>
            <Col xs={5} lg={3}>
                <AutoComplete
                    name="itemName"
                    id="itemName"
                    value={autocompleteValue}
                    suggestions={suggestions}
                    completeMethod={searchItemNames}
                    onChange={(event) => setAutocompleteValue(event.value)}
                    placeholder="Nová položka"
                    autoFocus={view === ListItemFormView.Edit}
                    maxLength={LIST_ITEM_NAME_MAX_LENGTH}
                />
            </Col>

            {view === ListItemFormView.Create &&
                <Col>
                    <Button type="submit" variant="outline-dark">Přidat</Button>
                </Col>
            }
        </Row>
    </Form>;
};