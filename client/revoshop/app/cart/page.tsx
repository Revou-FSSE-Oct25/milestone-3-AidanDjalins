"use client"

import { Product } from "@/types/product";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const steps = [
    {
        id: 1,
        title: "Shopping Cart"
    }
]

type ProductListProps = {
  products: Product[];
};

const CartPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

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
        </div>
    );
};

export default CartPage
