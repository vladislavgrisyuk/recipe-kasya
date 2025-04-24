"use client";

import React, { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { Calendar } from "@/components/ui/calendar"; // Убедитесь, что путь правильный
import { addDays } from "date-fns";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  UniqueIdentifier,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence, LayoutGroup, easeInOut } from "framer-motion";

// --- Тип для элемента списка еды ---
type MealItem = {
  id: UniqueIdentifier;
  content: string;
};

// --- Вспомогательная функция для генерации начальных данных ---
let idCounter = 0;
const generateInitialData = (data: string[][]): MealItem[][] => {
  idCounter = 0;
  return data.map((column) =>
    column.map((itemContent) => ({
      id: `meal-item-${idCounter++}`,
      content: itemContent,
    }))
  );
};

const initialMealStrings: string[][] = [
  ["Овсянка", "Банан"],
  ["Йогурт"],
  ["Курица", "Рис", "Овощи"],
  ["Орехи", "Яблоко"],
  ["Рыба", "Картофель"],
];

// --- Draggable Item Component ---
// Используем isDragging пропс для скрытия оригинала
function DraggableItemWrapper({
  item,
  isDragging,
}: {
  item: MealItem;
  isDragging?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 250ms ease",
    cursor: "grab",
    position: "relative",
  };

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      // Возвращаем исходные стили карточки
      className={`bg-card shadow-lg text-foreground p-2 rounded mb-1 list-none `}
      layout // Оставляем для анимации соседних элементов
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ opacity: { duration: 1.2 }, layout: { duration: 1.2 } }}
    >
      {item.content}
    </motion.li>
  );
}

// --- Column Component ---
// Добавляем activeDragItemId для корректной передачи isDragging в DraggableItemWrapper
function DroppableColumn({
  id,
  items,
  activeDragItemId,
}: {
  id: UniqueIdentifier;
  items: MealItem[];
  activeDragItemId: UniqueIdentifier | null;
}) {
  const itemIds = useMemo(() => items.map((item) => item.id), [items]);
  const { setNodeRef } = useDroppable({ id }); // ← регистрируем колонку

  return (
    <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
      <motion.div
        ref={setNodeRef} // ← привязываем
        className="bg-background/50 shadow-lg text-muted-foreground flex-1 m-3 p-2 rounded flex flex-col min-h-[100px]"
        layout
        transition={{ layout: { duration: 0.1, ease: "easeOut" } }}
      >
        <ul className="space-y-1 flex-grow">
          {items.map((item) => (
            <DraggableItemWrapper
              key={item.id}
              item={item}
              isDragging={item.id === activeDragItemId}
            />
          ))}
        </ul>
      </motion.div>
    </SortableContext>
  );
}

// --- Main Page Component ---
export default function ProfilePage() {
  const [date, setDate] = useState<Date>(new Date());
  const tomorrow = addDays(new Date(), 1);

  const [mealContents, setMealContents] = useState<MealItem[][]>(() =>
    generateInitialData(initialMealStrings)
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeItem, setActiveItem] = useState<MealItem | null>(null);

  const columnIds = useMemo(
    () => mealContents.map((_, i) => `column-${i}`),
    [mealContents.length]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  // --- Логика поиска контейнера и индекса (без изменений) ---
  const findContainerAndIndex = (
    id: UniqueIdentifier | undefined
  ): { containerIndex: number; itemIndex: number; item?: MealItem } | null => {
    if (!id) return null;
    for (let i = 0; i < mealContents.length; i++) {
      const itemIndex = mealContents[i].findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        return {
          containerIndex: i,
          itemIndex: itemIndex,
          item: mealContents[i][itemIndex],
        };
      }
    }
    const containerIndex = columnIds.findIndex((colId) => colId === id);
    if (containerIndex !== -1) {
      return { containerIndex: containerIndex, itemIndex: -1 };
    }
    return null;
  };

  // --- Обработчики событий Drag (без изменений логики) ---
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
    const activeLoc = findContainerAndIndex(active.id);
    if (activeLoc?.item) {
      setActiveItem(activeLoc.item);
    } else {
      setActiveItem(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      setActiveItem(null);
      return;
    }
    const activeLocation = findContainerAndIndex(active.id);
    if (!activeLocation) {
      setActiveId(null);
      setActiveItem(null);
      return;
    }
    const { containerIndex: activeContainerIndex, itemIndex: activeIndex } =
      activeLocation;
    let overLocation = findContainerAndIndex(over.id);
    let overContainerIndex: number;
    let overIndex: number;
    if (overLocation) {
      overContainerIndex = overLocation.containerIndex;
      overIndex =
        overLocation.itemIndex === -1
          ? mealContents[overContainerIndex].length
          : overLocation.itemIndex;
    } else {
      const overContainerId = over.data.current?.sortable?.containerId;
      const containerIndexMatch = columnIds.findIndex(
        (colId) => colId === overContainerId
      );
      if (containerIndexMatch !== -1) {
        overContainerIndex = containerIndexMatch;
        overIndex = mealContents[overContainerIndex].length;
      } else {
        setActiveId(null);
        setActiveItem(null);
        return;
      }
    }
    if (
      activeContainerIndex === overContainerIndex &&
      activeIndex === overIndex
    ) {
      setActiveId(null);
      setActiveItem(null);
      return;
    }
    setMealContents((prevContents) => {
      const newContents = prevContents.map((col) => [...col]);
      const activeColumn = newContents[activeContainerIndex];
      const overColumn = newContents[overContainerIndex];
      if (activeContainerIndex === overContainerIndex) {
        newContents[activeContainerIndex] = arrayMove(
          activeColumn,
          activeIndex,
          overIndex
        );
      } else {
        const [movedItem] = activeColumn.splice(activeIndex, 1);
        if (!movedItem) return prevContents;
        const validOverIndex = Math.max(
          0,
          Math.min(overColumn.length, overIndex)
        );
        overColumn.splice(validOverIndex, 0, movedItem);
      }
      return newContents;
    });
    setActiveId(null);
    setActiveItem(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setActiveItem(null);
  };

  // --- Рендер компонента ---
  return (
    <LayoutGroup>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {/* Возвращаем исходную структуру main и заголовка */}
        <main className="w-full p-5">
          <h1 className="text-3xl font-bold mb-4">Добро пожаловать!</h1>
          {/* Возвращаем исходную сетку */}
          <div className="grid grid-cols-[5fr_1fr] gap-4">
            {/* Канбан-доска с несколькими SortableContext */}
            {/* Возвращаем исходный контейнер для колонок */}
            <div className="bg-muted/30 rounded-xl p-4 flex">
              {mealContents.map((items, idx) => (
                <DroppableColumn
                  key={columnIds[idx]}
                  id={columnIds[idx]}
                  items={items}
                  activeDragItemId={activeId} // Передаем ID для стилизации оригинала
                />
              ))}
            </div>

            {/* Календарь */}
            {/* Возвращаем исходный блок с календарем */}
            <div className="bg-muted/30 rounded-xl p-4 flex flex-col gap-4">
              <label className="text-sm font-medium">Дата</label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)} // Безопасное обновление даты
                className="rounded-md border shadow" // Стили для календаря
                modifiers={{ special: tomorrow }}
                modifiersClassNames={{
                  special: "bg-green-200 text-green-900", // Стили для модификатора
                }}
              />
            </div>
          </div>
        </main>

        {/* DragOverlay (без изменений) */}
        {typeof window === "object" &&
          createPortal(
            <DragOverlay
              dropAnimation={{
                duration: 200,
                easing: "cubic-bezier(0.42, 0, 0.58, 1)",
              }}
            >
              {activeItem ? (
                <motion.li
                  className="bg-card shadow-xl text-foreground p-2 rounded list-none opacity-95" // Стиль для оверлея
                >
                  {activeItem.content}
                </motion.li>
              ) : null}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </LayoutGroup>
  );
}
