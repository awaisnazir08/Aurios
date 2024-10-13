'use client';

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            {/* Wrap the Button with a div or span to avoid the nested button issue */}
            <SheetTrigger asChild>
                <div>
                    <Button variant='ghost' size='icon' className="md:hidden">
                        <Menu />
                    </Button>
                </div>
            </SheetTrigger>
            <SheetContent side='left' className='p-0'>
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;