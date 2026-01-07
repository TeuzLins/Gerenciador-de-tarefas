import { useMemo, useState } from "react";
import { DndContext, closestCorners, useDroppable } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const initialColumns = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      { id: "c1", title: "Draft card layout" },
      { id: "c2", title: "Review API contract" },
    ],
  },
  {
    id: "doing",
    title: "Doing",
    cards: [{ id: "c3", title: "Wire up drag and drop" }],
  },
  {
    id: "done",
    title: "Done",
    cards: [{ id: "c4", title: "Create board shell" }],
  },
];

export default function Board() {
  const [columns, setColumns] = useState(initialColumns);

  const columnIds = useMemo(() => columns.map((column) => column.id), [columns]);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const sourceColumnId = active.data.current?.columnId;
    const destinationColumnId = over.data.current?.columnId;
    if (!sourceColumnId || !destinationColumnId) return;

    setColumns((prev) => {
      const next = prev.map((column) => ({
        ...column,
        cards: [...column.cards],
      }));

      const sourceColumn = next.find((column) => column.id === sourceColumnId);
      const destinationColumn = next.find(
        (column) => column.id === destinationColumnId
      );
      if (!sourceColumn || !destinationColumn) return prev;

      const sourceIndex = sourceColumn.cards.findIndex(
        (card) => card.id === active.id
      );
      if (sourceIndex < 0) return prev;

      const moving = sourceColumn.cards[sourceIndex];
      const destinationIndex = destinationColumn.cards.findIndex(
        (card) => card.id === over.id
      );
      const insertIndex =
        destinationIndex >= 0 ? destinationIndex : destinationColumn.cards.length;

      if (sourceColumnId === destinationColumnId) {
        sourceColumn.cards = arrayMove(
          sourceColumn.cards,
          sourceIndex,
          insertIndex
        );
        return next;
      }

      sourceColumn.cards.splice(sourceIndex, 1);
      destinationColumn.cards.splice(insertIndex, 0, moving);
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Focus Board</h1>
            <p className="text-sm text-slate-400">
              Plan, build, and ship in a clear flow.
            </p>
          </div>
          <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900">
            New Card
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className="grid gap-6 md:grid-cols-3">
            {columns.map((column) => (
              <ColumnView key={column.id} column={column} />
            ))}
          </div>
        </DndContext>
      </main>
    </div>
  );
}

function ColumnView({ column }) {
  const { setNodeRef } = useDroppable({
    id: `column-${column.id}`,
    data: { columnId: column.id },
  });

  return (
    <section
      ref={setNodeRef}
      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          {column.title}
        </h2>
        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
          {column.cards.length}
        </span>
      </div>

      <SortableContext
        items={column.cards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {column.cards.map((card) => (
            <CardItem key={card.id} card={card} columnId={column.id} />
          ))}
        </div>
      </SortableContext>

      <button className="mt-4 w-full rounded-xl border border-dashed border-slate-700 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 transition hover:border-slate-500 hover:text-slate-200">
        Add Card
      </button>
    </section>
  );
}

function CardItem({ card, columnId }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: { columnId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 shadow-sm transition ${
        isDragging ? "opacity-60" : "opacity-100"
      }`}
      {...attributes}
      {...listeners}
    >
      <p className="font-medium leading-snug">{card.title}</p>
      <p className="mt-2 text-xs text-slate-500">Drag to reprioritize</p>
    </article>
  );
}
