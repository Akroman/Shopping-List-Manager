import { Link, useMatches } from "react-router-dom";
import { RouteHandle } from "../../lib";

export const Breadcrumbs = () => {
    let matches = useMatches();
    matches = matches.filter((match) => Boolean((match.handle as RouteHandle)?.crumb));

    const crumbs = matches.map((match, index) => {
        const crumb = (match.handle as RouteHandle)?.crumb;

        return index !== matches.length - 1
            ? <Link to={match.pathname}>{crumb?.(match.data)}</Link>
            : crumb?.(match.data);
    });

    return <div className="mb-5">
        {crumbs.map((crumb, index) => (
            <span key={index}>{crumb} {crumbs.length - 1 !== index && " > "}</span>
        ))}
    </div>;
};