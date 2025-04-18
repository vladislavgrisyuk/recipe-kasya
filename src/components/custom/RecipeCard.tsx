"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface RecipeCardProps {
  title: string;
  imageUrl: string;
  description: string;
  cookTime: string;
  ingredientsCount: number;
}

export default function RecipeCard({
  title,
  imageUrl,
  description,
  cookTime,
  ingredientsCount,
}: RecipeCardProps) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 space-y-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          <div className="flex justify-between text-xs text-muted-foreground pt-2">
            <span>⏱ {cookTime}</span>
            <span>🧂 {ingredientsCount} ингредиентов</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
