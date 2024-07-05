import { Link } from "react-router-dom"

export const Account = () => {
    return (
        <div>
            <div>
                <h2 className="mb-4 text-center font-bold underline-title">Account</h2>
            </div>
            <div>
                <ul className="flex flex-col">
                    <li>
                        <Link className="button" to={'/account/new-recipe'}>New Recipe</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
