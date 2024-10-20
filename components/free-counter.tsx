'use client';

import { useEffect, useState } from "react"

interface freeCounterProps {
    apiLimitCount: number,

}

export const FreeCounter = ({
    apiLimitCount = 0
}: freeCounterProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
    return (
        <div>
            Free Counter
        </div>
    )
}