import RecipeCard from "@/components/custom/RecipeCard";

export default function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Добро пожаловать!</h1>
      <p>Здесь ваш контент.</p>
      <RecipeCard
        title="Картошка с грибами"
        imageUrl="https://unsplash.it/500/300?random"
        description="Простое деревенское блюдо с ароматом чеснока и сливок."
        cookTime="30 мин"
        ingredientsCount={5}
      />
    </>
  );
}
