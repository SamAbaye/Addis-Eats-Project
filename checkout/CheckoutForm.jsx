"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCartStore from "@/app/store/useCartStore";
import { placeOrder } from "@/app/orders/actions";
import checkoutSchema  from "@/app/lib/checkoutSchema";

export default function Checkout({ user }) {
    const [serverError, setServerError] = useState("");
    const [mounted, setMounted] = useState(false);

    
    const [placedOrder, setPlacedOrder] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);


    const { items, clearCart } = useCartStore();


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
        fullName: "",
        },
    });

    
    useEffect(() => {
        setMounted(true);

       
        if (user) {
        reset({
            fullName: user.name || "",
        });
        }
    }, [user, reset]);

    
    const onSubmit = async (data) => {
        setServerError("");
        const result = await placeOrder(
        items.map(({ id, qty }) => ({ id, qty })),
        data,
        );

        if (result.error) {
        return setServerError(result.error);
        }

        setPlacedOrder({ ...data, id: result.orderId });
        setOrderPlaced(true);
        clearCart();
    };

    
    if (!mounted) return null;

    
    if (orderPlaced) {
        return (
        <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
            <p className="mb-4">
            Your order ID is: <strong>{placedOrder?.id}</strong>
            </p>
            <Link href="/" className="text-blue-500 underline">
            Return Home
            </Link>
        </div>
        );
    }

    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 max-w-md mx-auto space-y-4"
        >
        <h1 className="text-xl font-bold">Checkout</h1>

        {serverError && (
            <div className="p-3 bg-red-100 text-red-700 rounded">{serverError}</div>
        )}

        <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
            {...register("fullName")}
            type="text"
            className="mt-1 block w-full rounded border p-2 text-black"
            />
            {errors.fullName && (
            <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
            )}
        </div>


        <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
            Place Order
        </button>
    </form>
  );
}
