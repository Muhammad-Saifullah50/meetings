import Image from 'next/image';
import React from 'react';

const Loader = ({ size }: { size?: number }) => {
    return (
        <div
            className="flex items-center justify-center h-screen"
            style={{ height: size ? `${size}px` : undefined, width: size ? `${size}px` : undefined }}
        >
            <Image
                src={'/loader.svg'}
                alt="loader"
                width={size || 80}
                height={size || 80}
            />
        </div>
    );
};

export default Loader;
