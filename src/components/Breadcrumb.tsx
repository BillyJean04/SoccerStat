import { FC } from "react";
import { useNavigate } from "react-router-dom";

import {
    Breadcrumb as BreadcrumbBase,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
                            <div key={id} className="flex items-center gap-2">
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </div>
                        );
                    }

                    return (
                        <div key={id} className="flex items-center gap-2">
                            <BreadcrumbItem>
                                <BreadcrumbLink className="cursor-pointer" onClick={() => navigate(-1)}>
                                    {name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </div>
                    );
                })}
            </BreadcrumbList>
        </BreadcrumbBase>
    );
};

export default Breadcrumb;
