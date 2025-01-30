"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({
    className,
    total,
    limit,
}: {
    className?: string;
    limit: number;
    total: number;
}) => {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1"); 
    const totalPages = Math.max(1, Math.ceil(total / limit)); 
    const router = useRouter();
    const pathname = usePathname();

    const prev = () => {
        if (page <= 1) return; 
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set("page", (page - 1).toString());
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    const next = () => {
        if (page >= totalPages) return; 
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set("page", (page + 1).toString());
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    if (totalPages === 0) return null; 

    return (
        <div className="flex items-center justify-center gap-4">
            <button
                className={`${className} rounded-lg bg-white/10 px-2 py-0.5 duration-200 hover:bg-white/20`}
                onClick={prev}
                disabled={page <= 1} 
            >
                Previous
            </button>
            <span>
                {page} of {totalPages}
            </span>
            <button
                className={`${className} rounded-lg bg-white/10 px-2 py-0.5 duration-200 hover:bg-white/20`}
                onClick={next}
                disabled={page >= totalPages} 
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
