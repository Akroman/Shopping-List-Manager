import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { getLists, List } from "../../../lib";
import { useLoaderData } from "react-router-dom";
import { List as ListComponent } from "../../../components";

export const Overview = () => {
    const lists = useLoaderData() as Array<List>;

    return <>
        <LinkContainer to="/list/create" className="mb-5">
            <Button variant="outline-dark">Vytvořit</Button>
        </LinkContainer>

        {lists.map((list) => (
            <ListComponent key={list.id} list={list} />
        ))}
    </>;
};

export const loader = async () => await getLists();