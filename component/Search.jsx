'use client'
import React from 'react'
import { useSearchParams, useRouter, usePathname } from "next/navigation";
const Search = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const query = searchParams.get("q") || "";

    const handleSearch = (term) => {
        const params = new URLSearchParams(searchParams);
        
        if (term) {
            params.set('q', term);
        } else {
          params.delete('q'); // Clears the parameter out of the URL if input is empty
        }
        router.push(`${pathname}?${params.toString()}`);
    };
    return (
        <div className="w-full max-w-md mx-4">
            <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for dishes, starters, desserts..."
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-red-400"
            />
        </div>
    );
}

export default Search
