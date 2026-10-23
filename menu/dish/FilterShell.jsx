'use client'
import { useState, useMemo } from "react"
import DishList from '../dish/DishList';
import CategoryBar from "../category/CategoryBar";
import useSWR from "swr";
import Spinner from "./Spinner";

const url = '/menu.json';

const fetcher = (url) => fetch(url).then((r) => r.json());

function  FilterShell () {
    const { data, error, isLoading } = useSWR(url, fetcher);

    const [filter, setFilter] = useState("All");
    
     
    const dishes = useMemo(() => {
      return (
        data?.categories?.flatMap((cat) =>
          cat.items.map((item) => ({ ...item, category: cat.category })),
        ) ?? []
      );
    }, [data]);

    const categories = useMemo(() => {
      if (filter === "All") return dishes;
      return dishes.filter((d) => d.category === filter);
    }, [filter, dishes]);

    
    if (isLoading) return <Spinner />;
    if (error) return <p>Could not load the Menu.</p>;
  
    return (
      <div className="w-auto">
        <CategoryBar
          categories={categories}
          selected={filter}
          onSelect={setFilter}
        />
        <div className="">
          <DishList dishes={categories} />
        </div>
      </div>
    );
}

export default FilterShell
