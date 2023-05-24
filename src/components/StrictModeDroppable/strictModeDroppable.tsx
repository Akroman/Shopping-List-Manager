/**
 * Droppable doesn't work with React.StrictMode, this component is a workaround so we can use React.StrictMode
 * Credit goes to: https://github.com/atlassian/react-beautiful-dnd/issues/2399#issuecomment-1175638194
 */
import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
    const [enabled, setEnabled] = useState<boolean>(false);

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));
        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) {
        return null;
    }

    return <Droppable {...props}>{children}</Droppable>;
};