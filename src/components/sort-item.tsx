import { useSortable } from "@dnd-kit/sortable";

interface ItemProps {
  id: string;
  title: string;
  status: string;
}

export function Item({ title, status }: ItemProps) {

  return (
    <div  className="cursor-grab shadow-md my-2 transition-all ease-in-out border border-[#e2e8f0] duration-300 py-0 px-4 rounded-md h-10 flex items-center justify-between bg-white">
      <span>{title}</span>
      <span className={`py-1 px-3 text-xs rounded-xl ${status === "new" ? "bg-[#e3f2fd] text-[#1976d2]" : status === "in-progress" ? "bg-[#fff3e0] text-[#f57c00]" : "bg-[#e8f5e9] text-[#2e7d32]"}`}>{status}</span>
    </div>
  );
}

export default function SortableItem({ id, title, status }: ItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "item",
      item: { id, title, status },
    },
  });


  return (
    <div ref={setNodeRef} className={`cursor-grab relative ${isDragging?'opacity-50 z-10':'opacity-100'}`} {...attributes} {...listeners}>
      <Item id={id} title={title} status={status} />
    </div>
  );
}
