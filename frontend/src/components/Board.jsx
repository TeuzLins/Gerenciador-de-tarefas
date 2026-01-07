import { useMemo, useState } from "react";
import {
  DndContext,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const initialColumns = [
  {
    id: "todo",
    title: "A Fazer",
    cards: [
      { id: "card-1", title: "Mapear requisitos" },
      { id: "card-2", title: "Criar entidades JPA" },
    ],
  },
  {
    id: "doing",
    title: "Em Progresso",
    cards: [{ id: "card-3", title: "Configurar drag & drop" }],
  },
  {
    id: "done",
    title: "Concluído",
    cards: [{ id: "card-4", title: "Configurar Tailwind" }],
  },
];

function DraggableCard({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-lg border border-slate-200 bg-white p-3 text-sm shadow-sm"
    >
      {card.title}
    </div>
  );
}

export default function Board() {
  const [columns, setColumns] = useState(initialColumns);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const cardsById = useMemo(() => {
    const mapping = new Map();
    columns.forEach((column) => {
      column.cards.forEach((card) => {
        mapping.set(card.id, column.id);
      });
    });
    return mapping;
  }, [columns]);

  const findColumnIdByCardId = (cardId) => cardsById.get(cardId);

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const activeColumnId = findColumnIdByCardId(active.id);
    const overColumnId = findColumnIdByCardId(over.id) || over.id;

    if (!activeColumnId || !overColumnId) return;

    if (activeColumnId === overColumnId) {
      setColumns((current) =>
        current.map((column) => {
          if (column.id !== activeColumnId) return column;
          const oldIndex = column.cards.findIndex((card) => card.id === active.id);
          const newIndex = column.cards.findIndex((card) => card.id === over.id);
          if (oldIndex === -1 || newIndex === -1) return column;
          return {
            ...column,
            cards: arrayMove(column.cards, oldIndex, newIndex),
          };
        })
      );
      return;
    }

    setColumns((current) => {
      const next = current.map((column) => ({ ...column, cards: [...column.cards] }));
      const source = next.find((column) => column.id === activeColumnId);
      const destination = next.find((column) => column.id === overColumnId);
      if (!source || !destination) return current;

      const cardIndex = source.cards.findIndex((card) => card.id === active.id);
      if (cardIndex === -1) return current;

      const [movedCard] = source.cards.splice(cardIndex, 1);
      const overIndex = destination.cards.findIndex((card) => card.id === over.id);
      const insertIndex = overIndex === -1 ? destination.cards.length : overIndex;
      destination.cards.splice(insertIndex, 0, movedCard);

      return next;
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Projeto Trello Clone</h1>
          <p className="text-sm text-slate-600">Arraste os cartões entre as listas.</p>
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          Novo cartão
        </button>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <section
              key={column.id}
              className="flex w-72 flex-shrink-0 flex-col gap-4 rounded-xl bg-slate-50 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-700">{column.title}</h2>
                <span className="rounded-full bg-slate-200 px-2 py-1 text-xs text-slate-600">
                  {column.cards.length}
                </span>
              </div>

              <SortableContext
                items={column.cards.map((card) => card.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-3">
                  {column.cards.map((card) => (
                    <DraggableCard key={card.id} card={card} />
                  ))}
                </div>
              </SortableContext>

              <button className="rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-medium text-slate-500">
                Adicionar cartão
              </button>
            </section>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
