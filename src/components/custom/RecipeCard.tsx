"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import styles from "@/app/styles/common.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUtensils } from "@fortawesome/free-solid-svg-icons";

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
    <Card
      className={`${styles.recipeCard} p-0 overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow`}
    >
      <CardContent className="p-0">
        <div className="p-3">
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={200}
            className={`${styles.recipeImg} w-full h-48 object-cover"`}
          />
        </div>
        <div className="pl-4 pr-4 pb-4 space-y-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          <div className="flex justify-between text-xs text-muted-foreground pt-2">
            <span className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="mr-1" />
              {cookTime}
            </span>
            <span className="flex items-center">
              <FontAwesomeIcon icon={faUtensils} className="mr-1" />
              {ingredientsCount} ингр.
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
