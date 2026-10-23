'use client'

import Link from "next/link";
import Image from "next/image";
import foodImage from '@/public/assets/habesha_food.jpg'
import useCartStore  from "@/app/store/useCartStore";

const DishCard = ({
    id,
    nameEn,
    nameAm,
    priceETB,
    spiceLevel,
    isFasting,
    isSpecial,
    category,
}) => {
    

    const secondaryBadge = isFasting ? { label: "Fasting", className: "badge-fasting" } : null;
    
    const { addItem } = useCartStore();
    function addToCart() {
        addItem({
            id,
            nameEn,
            nameAm,
            priceETB,
            spiceLevel,
            isFasting,
            isSpecial,
            category,
            qty: 1,
        });
        }

        return (
        <article className="group flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <Link href={`/menu/${id}`} className="flex h-full flex-col">
            <div className="relative h-40 w-full overflow-hidden">
                <Image
                loading="eager"
                src={foodImage}
                alt={`${nameEn} (${nameAm})`}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-300 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {category}
                </span>

                <h3 className="text-lg font-semibold text-gray-900">{nameAm}</h3>

                <div className="flex flex-wrap gap-2">
                {isSpecial && (
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                    ⭐ Special
                    </span>
                )}
                {secondaryBadge && (
                    <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${secondaryBadge.className}`}
                    >
                    {secondaryBadge.label}
                    </span>
                )}
                </div>

                <p className="mt-auto pt-2 text-base font-bold text-amber-600">
                {priceETB} ETB
                </p>
            </div>
            </Link>
            <button
            type="button"
            onClick={addToCart}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-xl transition ease-in-out md-"
            >
            Add to Cart
            </button>
        </article>
    );
}


export default DishCard;
