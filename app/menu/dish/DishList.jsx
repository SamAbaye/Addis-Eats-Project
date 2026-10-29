import DishCard from "./DishCard";
export default function DishList({dishes}) {
    
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dishes.map((d) => (
          <DishCard key={d.id} {...d} />
        ))}
      </div>
    </div>
  );
}
