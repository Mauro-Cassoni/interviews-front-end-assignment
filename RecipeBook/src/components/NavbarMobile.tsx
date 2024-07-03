import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


export default function NavbarMobile() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        document.title = getTitleFromPathname(location.pathname);
        setActiveTab(location.pathname);
    }, [location]);

    const isActive = (path: string) => {
        return path === activeTab ? 'active' : '';
    };

    const getTitleFromPathname = (pathname: string): string => {
        switch (pathname) {
            case '/':
                return 'RecipeBook';
            case '/recipes':
                return 'RecipeBook - Recipes';
            case '/search':
                return 'RecipeBook - Search';
            default:
                return 'RecipeBook';
        }
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <ul className="navbar flex justify-center gap-5 px-10 py-5 w-full border-t-2 border-[var(--primary)] bg-[var(--bg)]">
                <li className={isActive('/recipes')}>
                    <Link to={'/recipes'}>Recipes</Link>
                </li>
                <li className={isActive('/')}>
                    <Link to={'/'}>Home</Link>
                </li>
                <li className={isActive('/search')}>
                    <Link to={'/search'}>Search</Link>
                </li>
            </ul>
        </div>
    );
}
