import { FC, PropsWithChildren } from "react";

import { cn } from "@/lib/utils.ts";

interface ContainerProps extends PropsWithChildren {
    className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
    return <div className={cn("container my-auto", className)}>{children}</div>;
};

export default Container;
