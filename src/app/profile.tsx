// app/page.tsx или pages/index.tsx
import React from "react";
import RecipeCard from "@/components/custom/RecipeCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { List, Star, PlusCircle, Utensils } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NewRecipeForm from "@/components/custom/NewRecipeForm";

export default function ProfilePage() {
  const recipes = [
    {
      title: "Блюдо 1",
      imageUrl: "https://unsplash.it/500/300?random=1",
      description: "Описание 1…",
      cookTime: "20 мин",
      ingredientsCount: 4,
    },
    {
      title: "Блюдо 2",
      imageUrl: "https://unsplash.it/500/300?random=2",
      description: "Описание 2…",
      cookTime: "25 мин",
      ingredientsCount: 6,
    },
    {
      title: "Блюдо 3",
      imageUrl: "https://unsplash.it/500/300?random=3",
      description: "Описание 3…",
      cookTime: "15 мин",
      ingredientsCount: 3,
    },
    {
      title: "Блюдо 4",
      imageUrl: "https://unsplash.it/500/300?random=4",
      description: "Описание 4…",
      cookTime: "30 мин",
      ingredientsCount: 5,
    },
    // ...добавьте ещё по необходимости
  ];

  return (
    <main className="w-full">
      <div className="p-5">
        <h1 className="text-3xl font-bold mb-4">Добро пожаловать!</h1>
        <p>Здесь ваш контент.</p>
      </div>

      <Dialog>
        <Tabs defaultValue="preview">
          <div className="flex items-center justify-between px-5">
            <TabsList className="ml-2 flex items-center shadow-md">
              <TabsTrigger value="preview" className="flex items-center">
                <List className="w-4 h-4 mr-1" /> Весь список
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center">
                <Star className="w-4 h-4 mr-1" /> Избранное
              </TabsTrigger>
            </TabsList>

            <DialogTrigger asChild>
              <Button className="flex items-center !shadow-md">
                <PlusCircle className="w-4 h-4 mr-1" /> Создать
              </Button>
            </DialogTrigger>
          </div>

          <Separator />

          <TabsContent value="preview">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
              {recipes.map((r, i) => (
                <RecipeCard key={i} {...r} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="code">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
              {recipes.map((r, i) => (
                <RecipeCard key={i} {...r} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Utensils className="w-4 h-4 mr-1" /> Новый рецепт
            </DialogTitle>
            <Separator className="mt-3 mb-1" />
          </DialogHeader>
          <NewRecipeForm />
        </DialogContent>
      </Dialog>
    </main>
  );
}
