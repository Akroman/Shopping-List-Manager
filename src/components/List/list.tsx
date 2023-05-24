import { ListProps } from "./list.types";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { DeleteButton } from "../DeleteButton";

export const List = ({ list }: ListProps) => {
    return <Row className="mb-3">
        <Col xs={3}>
            <Link to={`/list/manage/${list.id}`}>{list.name}</Link>
        </Col>
        <Col xs={2}>
            <LinkContainer to={`/list/edit/${list.id}`}>
                <Button variant="outline-dark">Upravit</Button>
            </LinkContainer>
        </Col>
        <Col xs={2}>
            <DeleteButton action={`/list/delete/${list.id}`} confirmText={`Určitě smazat seznam ${list.name}?`}>
                Smazat
            </DeleteButton>
        </Col>
    </Row>;
};