'use client'
import { useState, useMemo } from "react"
import DishCard from '../dish/DishCard';
import CategoryBar from "../category/CategoryBar";

function FilterShell ({ dishes }) {
    const [filter, setFilter] = useState("All");

    const categories = useMemo(() => {
        if (filter === "All") return dishes;
        return dishes.filter((d) => d.category === filter);
    }, [filter, dishes]);    

    return (
      <div className="">
        <CategoryBar
          categories={categories}
          selected={filter}
          onSelect={setFilter}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((d) => (
            <DishCard key={d.id} {...d} category={d.category} />
          ))}
        </div>
      </div>
    );
}

export default FilterShell
