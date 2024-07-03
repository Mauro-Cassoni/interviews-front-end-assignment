import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import axios from "axios";
import { iDifficulty } from "../store/slices/difficultySlice";
import Loader from "../components/Loader";

export const Homepage: React.FC = () => {
    const [difficulties , setDifficulties ] = useState<iDifficulty[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCuisines = async () => {
            try {
                const response = await axios.get<iDifficulty[]>("http://localhost:8080/difficulties");
                setDifficulties(response.data);
                setLoading(false);
            } catch {
                setError(error || "Error fetching cuisines.");
                setLoading(false);
            }
        };
        fetchCuisines();
    }, [])

    if (loading) return <Loader />
    if (error) return <div>Error: {error}</div>;


    return (
        <div className="max-w-[1920px] w-full m-auto">
            {difficulties.map((difficulty) => (
                <div key={difficulty.id}>
                    <Carousel id={difficulty.id} name={difficulty.name} />
                </div>
            ))}
        </div>
    );
};

export default Homepage;
