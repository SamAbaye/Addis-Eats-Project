'use client'

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), { ssr: false });

function DisplayMap () {
    return (
        <div>
            <Map/>
        </div>
    );
}

export default DisplayMap