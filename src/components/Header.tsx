import { useLocation, useNavigate } from "react-router-dom";

import Container from "@/components/Container";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

const menuItems = [
    {
        id: 1,
        title: "Лиги",
        href: "/",
    },
    {
        id: 2,
        title: "Команды",
        href: "/teams",
    },
];

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <Container className="flex flex-row items-center gap-10 py-5">
                <h3 className="font-bold text-2xl">SoccerStat</h3>
                <NavigationMenu>
                    <NavigationMenuList className="gap-2">
                        {menuItems.map(({ id, title, href }) => (
                            <NavigationMenuItem key={id} className="cursor-pointer" onClick={() => navigate(href)}>
                                <NavigationMenuLink
                                    active={location.pathname === href}
                                    className={navigationMenuTriggerStyle()}
                                >
                                    {title}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </Container>
            <Separator />
        </>
    );
};

export default Header;
