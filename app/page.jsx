import Home from "./ui/home/Home";

export const metadata = {
  title: "Ethiopian food delivery in Addis Ababa",
  description: "Explore Addis Eats, browse Ethiopian dishes, and order fresh favourites for delivery in Addis Ababa.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Home />
    </div>
  );
}
