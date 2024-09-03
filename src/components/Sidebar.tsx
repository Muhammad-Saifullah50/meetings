'use client'
import { sidebarLinks } from "@/data"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { usePathname } from "next/navigation"

export const Sidebar = () => {

    const pathname = usePathname();
    return (
        <aside className="flex flex-col justify-start bg-dark-secondary w-1/5 p-1">
            <div className="flex flex-col justify-center w-full gap-3">
                {sidebarLinks.map((link) => {

                    const isActive = link.route === pathname;
                    return (
                        <div key={link.label} className={cn(
                            'flex justify-start items-center w-full p-4 rounded-xl gap-3',
                            {'bg-blue': isActive }
                        )}>
                            <Image
                                src={link.icon}
                                alt={link.label}
                                width={24}
                                height={24}
                            />
                            <h2 className="">{link.label}</h2>
                        </div>
                                    )

                })}
        </div>
        </aside >
    )
}
