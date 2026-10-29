import React from 'react'
import SpecialDisplay from '../special/SpecialDisplay'
import { Suspense } from 'react'
function Home() {
    return (
        <section className="mx-auto max-w-5xl px-4 py-10">
            <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Today&apos;s Special Menu
            </h1>

            <Suspense
                fallback={
                    <p className="animate-pulse text-center text-gray-500">
                    Loading Special Menu...
                    </p>
                }
                >
                <SpecialDisplay />
            </Suspense>
        </section>
    );
}

export default Home