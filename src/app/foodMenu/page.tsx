"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";

export default function ProfilePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const tomorrow = addDays(new Date(), 1);

  return (
    <main className="w-full p-5">
      <h1 className="text-3xl font-bold mb-4">Добро пожаловать!</h1>

      <div className="grid grid-cols-[5fr_1fr] gap-4">
        {/* Левая часть: меню на каждый день */}
        <div className="bg-muted rounded-xl p-4">
          <div className="gap-4">
            {" "}
            {/* grid grid-cols-4 auto-rows-[150px] */}
            <div className="flex">
              <p className="text-xm font-bold flex-1 mb-4 text-center">
                Завтрак
              </p>
              <p className="text-xm font-bold flex-1 mb-4 text-center">
                Завтрак
              </p>
              <p className="text-xm font-bold flex-1 mb-4 text-center">
                Завasasdтрак
              </p>
              <p className="text-xm font-bold flex-1 mb-4 text-center">
                Завтрак
              </p>
              <p className="text-xm font-bold flex-1 mb-4 text-center">
                Завтрак
              </p>
            </div>
            <div className="flex">
              <div className="bg-green-800 flex-1 m-3">asd</div>
              <div className="bg-green-800 flex-1 m-3">asd</div>
              <div className="bg-green-800 flex-1 m-3">asd</div>
              <div className="bg-green-800 flex-1 m-3">asd</div>
              <div className="bg-green-800 flex-1 m-3">asd</div>
            </div>
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
