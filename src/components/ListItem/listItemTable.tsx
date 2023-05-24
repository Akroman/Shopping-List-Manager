import { ListItemTableProps } from "./listItemTable.types";
import { ListItem } from "./listItem";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { ListItems, moveListItem } from "../../lib";
import { useEffect, useState } from "react";
import { StrictModeDroppable } from "../StrictModeDroppable";

export const ListItemTable = ({ list }: ListItemTableProps) => {
    const [listItems, setListItems] = useState<ListItems>(list.items);

    useEffect(() => setListItems(list.items), [list]);

    const handleDragEnd = async (result: DropResult) => {
        if (result.destination) {
            const updatedList = await moveListItem(result.source.index, result.destination.index, list.id);
            if (updatedList) {
                setListItems(updatedList.items);
            }
        }
    };

    return <DragDropContext onDragEnd={handleDragEnd}>
        <StrictModeDroppable droppableId={list.id}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {[...listItems.entries()].map(([itemId, itemName], index) => (
                        <Draggable key={itemId} draggableId={itemId} index={index}>
                            {(provided) => (
                                <ListItem
                                    itemId={itemId}
                                    itemName={itemName}
                                    listId={list.id}
                                    ref={provided.innerRef}
                                    draggableProps={provided.draggableProps}
                                    dragHandleProps={provided.dragHandleProps}
                                />
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </StrictModeDroppable>
    </DragDropContext>;
};