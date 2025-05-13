import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type IItem from "@/types/mock"
import Container from "./list-container";
import { Item } from "./sort-item";
import { mockData } from "@/constants/dragmock"
interface ItemData {
  id: string;
  title: string;
  status: string;
}

interface Items {
  root: ItemData[];
  container1: ItemData[];
  container2: ItemData[];
}

export default function List() {
  const sortedMocs = (status: IItem['status']): IItem[] => {
    return useMemo(() => mockData.filter((item) => item.status === status), [status]);
  };
  const [items, setItems] = useState<Items>({
    root: sortedMocs("new"),
    container1: sortedMocs("in-progress"),
    container2: sortedMocs("completed"),
  });
  const [activeId, setActiveId] = useState<string | null>(null);


  function findContainer(id: string): string | undefined {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) =>
      items[key as keyof Items].some((item) => item.id === id)
    );
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;

    setActiveId(id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const { id } = active;
    const overId = over?.id as string;
    const activeContainer = findContainer(id as string);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer as keyof Items];
      const overItems = prev[overContainer as keyof Items];
      const activeIndex = activeItems.findIndex((item) => item.id === id);
      const overIndex = overItems.findIndex((item) => item.id === overId);

      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem = over && overIndex === overItems.length - 1;
        const modifier = isBelowLastItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }
      const activeItem = activeItems[activeIndex];
      let newStatus = "new";
      if (overContainer === "container1") {
        newStatus = "in-progress";
      } else if (overContainer === "container2") {
        newStatus = "completed";
      }

      const updatedItem = {
        ...activeItem,
        status: newStatus,
      };
     console.log("oldContainer",activeContainer=='root'?'first':activeContainer=='container1'?'second':'third', "currentContainer",overContainer=='root'?'first':overContainer=='container1'?'second':'third', "updatedItem",updatedItem);
      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer as keyof Items].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...prev[overContainer as keyof Items].slice(0, newIndex),
          updatedItem,
          ...prev[overContainer as keyof Items].slice(
            newIndex,
            prev[overContainer as keyof Items].length
          ),
        ],
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const { id } = active;
    const overId = over?.id as string;

    const activeContainer = findContainer(id as string);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer as keyof Items].findIndex(
      (item) => item.id === active.id
    );
    const overIndex = items[overContainer as keyof Items].findIndex(
      (item) => item.id === overId
    );

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer as keyof Items],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);
  }

  return (
    <div className="flex gap-4 p-4 w-full bg-[#f5f5f5]">
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}>
        <div className="flex gap-3.5 w-full">
          <Container id="root" items={items.root} />
          <Container id="container1" items={items.container1} />
          <Container id="container2" items={items.container2} />
        </div>
        <DragOverlay>
          {activeId ? (
            <Item
              id={activeId}
              title={
                items.root.find((item) => item.id === activeId)?.title || ""
              }
              status={
                items.root.find((item) => item.id === activeId)?.status || "new"
              }
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
