"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";

export default function ProfilePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];

  const tomorrow = addDays(new Date(), 1);

  return (
    <main className="w-full p-5">
      <h1 className="text-3xl font-bold mb-4">Добро пожаловать!</h1>

      <div className="grid grid-cols-[5fr_1fr] gap-4">
        {/* Левая часть: меню на каждый день */}
        <div className="bg-muted/20 rounded-xl p-4">
          <div className="grid grid-cols-4 auto-rows-[150px] gap-4">
            {days.map((day, idx) => (
              <div
                key={day}
                onClick={() => setSelectedDay(idx)}
                className={`cursor-pointer rounded-lg bg-white shadow flex items-center justify-center text-center p-4 transition-all duration-200
                  ${selectedDay === idx ? "row-span-2" : "row-span-1"}`}
              >
                <span className="font-medium">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Правая часть с календарем */}
        <div className="bg-muted/40 rounded-xl p-4 flex flex-col gap-4">
          <label className="text-sm font-medium">Дата</label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
            modifiers={{ special: tomorrow }}
            modifiersClassNames={{ special: "bg-green-200 text-green-900" }}
          />
        </div>
      </div>
    </main>
  );
}
