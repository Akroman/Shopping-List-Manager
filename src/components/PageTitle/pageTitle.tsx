import { useMatches } from "react-router-dom";
import { RouteHandle } from "../../lib";

export const PageTitle = () => {
    const matches = useMatches();
    const currentHandle = matches.at(-1)?.handle as RouteHandle;

    return <>
        {currentHandle?.title && <h2 className="mb-4">{currentHandle.title}</h2>}
    </>;
};