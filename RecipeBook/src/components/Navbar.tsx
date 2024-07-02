import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="h-full w-full">
            <ul>
                <li>
                    <Link to={'/'}>RecipeBook</Link>
                </li>
                <li>
                    <Link to={'/all'}>ALL</Link>
                </li>
            </ul>
        </div>
    )
}
