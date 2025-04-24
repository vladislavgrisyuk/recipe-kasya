// app/page.tsx или pages/index.tsx
import RecipeCard from "@/components/custom/RecipeCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  faStar,
  faListUl,
  faPlusCircle,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import NewRecipeForm from "@/components/custom/NewRecipeForm";
import { List, Star, PlusCircle, Utensils } from "lucide-react";

export default function HomePage2() {
  const recipes = [
    {
      title: "Блюдо 1",
      imageUrl: "https://unsplash.it/500/300?random=1",
      description: "Описание 1…",
      cookTime: "20 мин",
      ingredientsCount: 4,
    },
    {
      title: "Блюдо 2",
      imageUrl: "https://unsplash.it/500/300?random=2",
      description: "Описание 2…",
      cookTime: "25 мин",
      ingredientsCount: 6,
    },
    {
      title: "Блюдо 3",
      imageUrl: "https://unsplash.it/500/300?random=3",
      description: "Описание 3…",
      cookTime: "15 мин",
      ingredientsCount: 3,
    },
    {
      title: "Блюдо 4",
      imageUrl: "https://unsplash.it/500/300?random=4",
      description: "Описание 4…",
      cookTime: "30 мин",
      ingredientsCount: 5,
    },
    {
      title: "Блюдо 4",
      imageUrl: "https://unsplash.it/500/300?random=4",
      description: "Описание 4…",
      cookTime: "30 мин",
      ingredientsCount: 5,
    },
    {
      title: "Блюдо 4",
      imageUrl: "https://unsplash.it/500/300?random=4",
      description: "Описание 4…",
      cookTime: "30 мин",
      ingredientsCount: 5,
    },
    // ...добавьте ещё по необходимости
  ];

  return (
    // заменили container на full-width
    <main className="w-full">
      <div className="p-5">
        <h1 className="text-3xl font-bold mb-4">Добро пожаловать!</h1>
        <p>Здесь ваш контент.</p>
      </div>

      {/* убрали max-w-xl */}
      <Dialog>
        <Tabs defaultValue="preview">
          <div className="flex items-center justify-between px-5">
            <TabsList className="ml-2 flex items-center shadow-md">
              <TabsTrigger value="preview">
                <List className="w-4 h-4 mr-1" /> Весь список
              </TabsTrigger>
              <TabsTrigger value="code">
                <Star fill="currentColor" className="w-4 h-4 mr-1" /> Избранное
              </TabsTrigger>
            </TabsList>
            <DialogTrigger asChild className="shadow-xl">
              <Button className="!shadow-md">
                <FontAwesomeIcon icon={faPlusCircle} className="" />
                Создать
              </Button>
            </DialogTrigger>
          </div>

          <Separator />

          <TabsContent value="preview">
            <div
              className="
              grid
              grid-cols-1      /* мобильные */
              sm:grid-cols-2   /* ≥640px: 2 колонки */
              md:grid-cols-3   /* ≥768px: 3 колонки */
              lg:grid-cols-4   /* ≥1024px: 4 колонки */
              xl:grid-cols-4   /* ≥1280px: 5 колонки */
              gap-6 p-6
            "
            >
              {recipes.map((r, i) => (
                <RecipeCard key={i} {...r} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="code">
            <div
              className="
              grid
              grid-cols-1      /* мобильные */
              sm:grid-cols-2   /* ≥640px: 2 колонки */
              md:grid-cols-3   /* ≥768px: 3 колонки */
              lg:grid-cols-4   /* ≥1024px: 4 колонки */
              xl:grid-cols-4   /* ≥1280px: 5 колонки */
              gap-6 p-6
            "
            >
              {recipes.map((r, i) => (
                <RecipeCard key={i} {...r} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            {/* border border-gray-300 shadow-md rounded-2xl p-4 */}
            <div className="">
              <DialogTitle>
                <FontAwesomeIcon icon={faUtensils} className="mr-1 w-4 h-4" />
                Новый рецепт
              </DialogTitle>
              <Separator className="mt-3 mb-1" />
            </div>
          </DialogHeader>

          <NewRecipeForm />
        </DialogContent>
      </Dialog>
    </main>
  );
}
