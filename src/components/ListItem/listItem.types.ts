import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

export interface ListItemProps {
    readonly itemId: string;
    readonly itemName: string;
    readonly listId: string;
    readonly draggableProps: DraggableProvidedDraggableProps;
    readonly dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}