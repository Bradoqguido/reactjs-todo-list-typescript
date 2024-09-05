import React, { useContext, useEffect } from "react";
import { ContextoTema } from "../../context/contextTema";

const Sobre = () => {
    const tema = useContext(ContextoTema)

    useEffect(() => {
        console.log('tema sobre: ', tema)
    }, [tema])

    return (
        <div>
            <h1>Sobre Works</h1>
            <h2>{tema}</h2>
        </div>
    )
}

export default Sobre;