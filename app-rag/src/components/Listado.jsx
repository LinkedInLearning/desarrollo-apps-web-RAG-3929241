import { useState, useEffect } from 'react';

const Listado = ({ filtrarPropiedades, titulo }) => {
    const [propiedades, setPropiedades] = useState([]);
    const [todasPropiedades, setTodasPropiedades] = useState([]);

    useEffect(() => {
        fetch('/data/propiedades.json')
            .then(response => response.json())
            .then(data => {
                setPropiedades(data);
                setTodasPropiedades(data);
            })
            .catch(error => console.error('Error al cargar las propiedades:', error));
    }, []);

    useEffect(() => {
        if (filtrarPropiedades) {
            const propiedadesFiltradas = filtrarPropiedades(todasPropiedades);
            setPropiedades(propiedadesFiltradas);
        } else {
            setPropiedades(todasPropiedades);
        }
    }, [filtrarPropiedades, todasPropiedades]);

    return (
        <div className="container">
            <h1 className="my-4">{titulo}</h1>

            {propiedades.map((propiedad, index) => (
                <div className="row" key={index}>
                    <div className="col" >
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{propiedad.titulo}</h5>
                                <ul>
                                    <li>Ubicación: {propiedad.ubicacion}</li>
                                    <li>Metros Cuadrados {propiedad.metrosCuadrados}</li>
                                    <li>{propiedad.habitaciones} Habitaciones ,  {propiedad.banos} Baños </li>
                                    <li>Precio: € {propiedad.precio}  </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
};

Listado.defaultProps = {
    titulo: 'Listado de Propiedades'
};

export default Listado;