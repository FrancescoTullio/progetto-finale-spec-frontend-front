import { useState, useEffect } from "react";
import { TypeVideogameShort } from "../types/Type";
import { isVideogameArray } from "../types/Type"

function UseVidegames() {
    const url: string = "http://localhost:3001/videogames"

    const [videogames, setVidegames] = useState<TypeVideogameShort[] | null>(null)



    const fetchData = async () => {

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data: unknown = await response.json();

            if (!isVideogameArray(data)) {
                throw new Error(`formato dei dati non conforme`)
            }

            setVidegames(data)


        } catch (err) {
            if (err instanceof Error) {
                console.error("Errore con il recupero dei videogame:", err.message);
            } else {
                console.error("Errore sconosciuto:", err);
            }
        }
    };




    useEffect(() => {
        fetchData()
    }, [])


    return { videogames,}
}

export default UseVidegames