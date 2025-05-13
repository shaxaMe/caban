import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./sort-item";

interface ItemData {
  id: string;
  title: string;
  status: string;
}

interface ContainerProps {
  id: string;
  items: ItemData[];
}


export default function Container({ id, items }: ContainerProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: "container",
      container: id,
    },
  });

  const style = {
    background: isOver ? "#f8fafc" : "#ffffff",
  };

  return (
    <SortableContext
      id={id}
      items={items.map((item) => item.id)}
      strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} style={style} className="bg-white p-4 m-2 flex-1 rounded-lg shadow-md"> 
        { items.length ? items.map((item) => (
          <SortableItem
            key={item.id}
            id={item.id}
            title={item.title}
            status={item.status}
          />
        )) : ""}
        {
            items.length === 0 && (
                <div className="h-full flex justify-center items-center">
                    <p className="text-gray-500 text-center">No items</p>
                </div>
            )
        }
      </div>
    </SortableContext>
  );
}
