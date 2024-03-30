import { FC } from "react";

import {
    Breadcrumb as BreadcrumbBase,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";

interface BreadcrumbProps {
    items: {
        id: number;
        name: string;
        link?: string;
        isPage: boolean;
    }[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
    return (
        <BreadcrumbBase className="my-10">
            <BreadcrumbList>
                {items.map(({ id, name, link, isPage }) => {
                    if (isPage) {
                        return (
                            <>
                                <BreadcrumbItem key={id}>
                                    <BreadcrumbPage>{name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        );
                    }

                    return (
                        <>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={link}>{name}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </>
                    );
                })}
            </BreadcrumbList>
        </BreadcrumbBase>
    );
};

export default Breadcrumb;
