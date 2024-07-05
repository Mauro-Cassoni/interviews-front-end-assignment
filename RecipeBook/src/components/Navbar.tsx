import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeButton from './ThemeButton';


const getThemeFromLocalStorage = () => {
    if (localStorage.getItem('theme')) {
        return localStorage.getItem('theme')
    } else {
        return 'dark-mode'
    }
}

export default function Navbar() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('');
    const [theme, setTheme] = useState(getThemeFromLocalStorage());

    const changeTheme = () => {
        if (theme === 'dark-mode') {
            setTheme('light-mode')
        } else {
            setTheme('dark-mode');
        }
    }

    useEffect(() => {
        if (theme !== null) {
            document.documentElement.className = theme;
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

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
            case '/account':
                return 'RecipeBook - Account';
            case '/account/new-recipe':
                return 'RecipeBook - New Recipe';
            default:
                return 'RecipeBook';
        }
    };

    return (
        <div className="h-full w-full flex items-center px-10 py-5 border-b-2 border-[var(--primary)] bg-[var(--bg)] justify-between">
            <ul className="navbar flex gap-5">
                <li className={isActive('/')}>
                    <Link to={'/'}>RecipeBook</Link>
                </li>
                <li className={isActive('/recipes')}>
                    <Link to={'/recipes'}>Recipes</Link>
                </li>
                <li className={isActive('/search')}>
                    <Link to={'/search'}>Search</Link>
                </li>
                <li className='self-end'>
                </li>
            </ul>
            <div className='flex items-center gap-5 navbar'>
                <ul>
                    <li className={isActive('/account')}>
                        <Link to={'/account'}>Account</Link>
                    </li>
                </ul>
                <ThemeButton onClick={changeTheme} />
            </div>
        </div>
    );
}
