import { BsFillSunFill } from 'react-icons/bs';
import { IoMoon } from 'react-icons/io5';

interface iThemeButton {
    onClick: () => void;
    className?: string;
}

export default function ThemeButton({ onClick, className }: iThemeButton) {
    return (
        <button className={`${className}
            bg-[var(--bg-theme)] flex items-center gap-2 rounded-2xl p-1`}
            onClick={onClick}>
            <span className="text-[var(--dark-text)] bg-[var(--dark-button)] p-1 rounded-2xl"><IoMoon /></span>
            <span className="text-[var(--light-text)] bg-[var(--light-button)] p-1 rounded-2xl"><BsFillSunFill /></span>
        </button>

    )
}
