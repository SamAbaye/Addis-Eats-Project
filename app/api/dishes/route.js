// import { pageDishes, searchDishes } from "@/app/lib/dishes";

// ?q=tibs  -> search results
// ?page=2  -> one page of the full list
// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const q = searchParams.get("q");

//   if (q !== null) {
//     return Response.json({ dishes: searchDishes(q) });
//   }
//   return Response.json(pageDishes(searchParams.get("page")));
// }
const url = '/menu.json';
export async function GET(request) {
  try {
    const response = await fetch(url);
    if(!response.ok){
      return Response.json({ error: "Request failed" }, { status: 500 }); 
    } else {
      const data = await response.json();
      return Response.json(data);
    }
  }
  catch (error) {
    console.log(error);
  }
}