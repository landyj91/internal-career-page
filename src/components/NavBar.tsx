import { buttonVariants } from './ui/button';
import { WelcomeName } from "./WelcomeName";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { Link } from "react-router-dom";
import { useIsAuthenticated } from '@azure/msal-react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu';

const NavBar = () => {
    const isAuthenticated = useIsAuthenticated()
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link to="/" >
                        <NavigationMenuLink>Microsoft identity platform</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>{isAuthenticated && <WelcomeName />}</NavigationMenuItem>
                <NavigationMenuItem>{isAuthenticated ? <SignOutButton /> : <SignInButton />}</NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default NavBar;