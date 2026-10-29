import AuthNav from "@/app/component/AuthNav";
import { Suspense } from "react";

export default function MenuLayout({ children }) {
    return (
    <div className="min-h-full flex flex-col" >
        <Suspense fallback={<nav aria-hidden className="h-14" />}>
            <AuthNav />
        </Suspense>
        {children}
    </div>
);
}
