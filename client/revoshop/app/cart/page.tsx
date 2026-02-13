"use client"

import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";   
import useCartStore from "../stores/cartStore";

const steps = [
    {
        id: 1,
        title: "Shopping Cart"
    }
]

const CartPage = () => {
    const searchParams = useSearchParams();
    // const router = useRouter();
    const { cart, removeFromCart } = useCartStore();

    const activeStep = parseInt(searchParams.get("step") || "1");

    return (
        <div className="flex flex-col gap-8 items-center justify-center mt-12">
            {/* TITLE */}
            <h1 className="text-2xl font-medium">
                Your Shopping Cart
            </h1>
            {/* STEPS */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                {steps.map((step) => (
                <div
                    className={`flex items-center gap-2 border-b-2 pb-4 ${
                    step.id === activeStep ? "border-gray-800" : "border-gray-200"
                    }`}
                    key={step.id}
                >
                    <div
                    className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${
                        step.id === activeStep ? "bg-gray-800" : "bg-gray-400"
                    }`}
                    >
                    {step.id}
                    </div>
                    <p
                    className={`text-sm font-medium ${
                        step.id === activeStep ? "text-gray-800" : "text-gray-400"
                    }`}
                    >
                    {step.title}
                    </p>
                </div>
                ))}
            </div>

            {/* CART CONTENT */}
            <div className="w-full flex flex-col lg:flex-row gap-16">
                {/* CART ITEMS */}
                <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-center">Your cart is empty</p>
                    ) : (
                        cart.map((item) => (
                            // SINGLE CART ITEM
                            <div
                                className="flex items-center justify-between"
                                key={item.id}
                            >
                                {/* IMAGE AND DETAILS */}
                                <div className="flex gap-8">
                                    {/* IMAGE */}
                                    <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                                        <Image
                                            src={item.images?.[0] || '/placeholder.png'}
                                            alt={item.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    {/* ITEM DETAILS */}
                                    <div className="flex flex-col justify-between">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-medium">{item.title}</p>
                                            <p className="text-xs text-gray-500">
                                                Quantity: {item.quantity}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Category: {item.category.name}
                                            </p>
                                        </div>
                                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                                {/* DELETE BUTTON */}
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* CART DETAILS */}
                <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
                    <h2 className="font-semibold">Cart Details</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500">Subtotal</p>
                            <p className="font-medium">
                                ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                            </p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500">Discount (10%)</p>
                            <p className="font-medium">
                                ${(cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.1).toFixed(2)}
                            </p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500">Shipping Fee</p>
                            <p className="font-medium">$10.00</p>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex justify-between">
                            <p className="text-gray-800 font-semibold">Total</p>
                            <p className="font-medium">
                                ${(cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.9 + 10).toFixed(2)}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => {/* Proceed to checkout */}}
                        className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
                    >
                        Proceed to Checkout
                        <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;