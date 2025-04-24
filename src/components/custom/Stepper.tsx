// в файле Steps.tsx
import React from "react";

interface Step {
  title: string;
  command: string;
}

export function Stepper({ steps }: { steps: Step[] }) {
  return (
    <div className="relative pl-8">
      {/* 1) Абсолютно позиционированная линия */}
      <div className="absolute top-[12px] left-4 w-px h-full bg-gray-400" />

      {/* 2) Сами шаги */}
      <div className="space-y-8">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start space-x-4">
            {/* 3) Кружок поверх линии */}
            <div className="relative z-10">
              <div className="w-6 h-6 rounded-full bg-gray-800 text-white text-sm flex items-center justify-center">
                {i + 1}
              </div>
            </div>
            {/* 4) Контент */}
            <div>
              <h3 className="font-semibold text-white mb-1">{step.title}</h3>
              <pre className="bg-gray-800 text-white p-2 rounded text-sm">
                {step.command}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
