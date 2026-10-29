'use client'


function CategoryBar({ selected, onSelect }) {
  const cat = [
    "All",
    "Traditional Stews & Wat",
    "Tibs & Grills",
    "Raw & Cured Delicacies / Kitfo",
    "Fasting & Vegan / Tsom",
    "Beverages & Tej",
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-2.5">
      {cat.map((catagory) => (
        <button
          className={`rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-stone-100 hover:text-stone-900 ${
            selected === catagory
              ? "catagory-btn active border-amber-600 bg-amber-600 text-white"
              : "catagory-btn border-stone-300 bg-white text-stone-700 hover:border-amber-600 hover:text-amber-700"
          }`}
          key={catagory}
          onClick={() => onSelect(catagory)}
        >
          {catagory}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
