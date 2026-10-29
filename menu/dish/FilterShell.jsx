'use client'
import { useState, useMemo } from "react"
import DishList from '../dish/DishList';
import CategoryBar from "../category/CategoryBar";
import useSWR from "swr";
import Spinner from "./Spinner";
import { useSearchParams } from 'next/navigation';

const url = '/menu.json';

const fetcher = (url) => fetch(url).then((r) => r.json());

function  FilterShell () {
    const { data, error, isLoading } = useSWR(url, fetcher);
    const [filter, setFilter] = useState("All");
    

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q')?.toLowerCase() || '';
    

    const allDishes = useMemo(() => {
      return (
        data?.categories?.flatMap((cat) =>
          cat.items.map((item) => ({ ...item, category: cat.category })),
        ) ?? []
      );
    }, [data]);

    const filteredDishes = useMemo(() => {
      return allDishes.filter((dish) => {
        const matchesCatagory = filter === "All" || filter === dish.category;
        const matchesSearch = searchQuery
          ? dish.nameEn.toLowerCase().includes(searchQuery) ||
            dish.nameAm.toLowerCase().includes(searchQuery)
          : true;
        return matchesCatagory && matchesSearch;
      });
      
    }, [filter, allDishes, searchQuery]);

    
    if (isLoading) return <Spinner />;
    if (error) return <p>Could not load the Menu.</p>;
  
    return (
      <div className="w-auto">
        <CategoryBar
          categories={allDishes}
          selected={filter}
          onSelect={setFilter}
        />
        <div className="">
          <DishList dishes={filteredDishes} />
        </div>
      </div>
    );
}

export default FilterShell
