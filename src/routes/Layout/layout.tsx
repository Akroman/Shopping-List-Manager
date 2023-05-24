import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Breadcrumbs, PageTitle } from "../../components";

export const Layout = () => {
    return <Container>
        <h1 className="mb-5">Můj košík</h1>
        <Breadcrumbs />
        <PageTitle />

        <Outlet />
    </Container>;
};