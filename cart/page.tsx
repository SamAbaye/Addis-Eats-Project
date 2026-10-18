'use client'
import Link from 'next/link';
import useCartStore from "../store/useCartStore";


const Cart = () => {
  const items = useCartStore((state) => state.items);
  const incrementItem = useCartStore((state) => state.addItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeCartItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.totalPrice());

  if (items.length === 0) {
    return (
      <div className="mb-6 text-2xl font-bold tracking-tight text-stone-900 px-4 py-10 mx-auto max-w-md">
        <p className="mb-4 text-amber-700">Your cart is empty.</p>
        <div className='flex items-center justify-center'>
          <button className="rounded-md bg-stone-900 px-6 py-3 text-sm font-large text-white transition hover:bg-amber-600 flex justify-center">
            <Link href="/menu">Browse the menu</Link>
          </button>
        </div>
        
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h2 className="mb-6 text-3xl font-bold tracking-tight text-stone-900">
        Your Order
      </h2>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 py-16 text-center">
          <p className="mb-4 text-stone-600">Your cart is empty.</p>
          <Link
            href="/menu"
            className="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
          >
            Browse the menu
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-stone-200 rounded-xl bg-white shadow-md">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap"
              >
                <span className="min-w-0 flex-1 font-medium text-stone-900">
                  {item.nameEn}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => decrementItem(item.id)}
                    aria-label={`Decrease ${item.nameEn}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition hover:border-amber-600 hover:text-amber-600"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-medium">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => incrementItem(item)}
                    aria-label={`Increase ${item.nameEn}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition hover:border-amber-600 hover:text-amber-600"
                  >
                    +
                  </button>
                </div>

                <span className="w-24 text-right font-semibold text-amber-600">
                  {item.priceETB * item.qty} ETB
                </span>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-sm font-medium text-red-600 transition hover:text-red-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between rounded-xl bg-stone-50 p-4">
            <p className="text-lg font-bold text-stone-900">
              Total: {total} ETB
            </p>
            <button
              type="button"
              onClick={clearCart}
              className="text-sm font-medium text-stone-600 underline transition hover:text-red-600"
            >
              Clear Cart
            </button>
          </div>

          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-lg bg-stone-900 px-6 py-3 text-center font-medium text-white transition hover:bg-amber-600"
          >
            Proceed to Checkout
          </Link>
        </>
      )}
    </main>
  );
};

export default Cart;
