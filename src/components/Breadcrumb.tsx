import { FC } from "react";
import { useNavigate } from "react-router-dom";

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
        isPage: boolean;
    }[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
    const navigate = useNavigate();

    return (
        <BreadcrumbBase className="my-10">
            <BreadcrumbList>
                {items.map(({ id, name, isPage }) => {
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
                                <BreadcrumbLink className="cursor-pointer" onClick={() => navigate(-1)}>
                                    {name}
                                </BreadcrumbLink>
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
