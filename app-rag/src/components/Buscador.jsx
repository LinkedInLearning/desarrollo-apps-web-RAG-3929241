import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import Listado from './Listado';
import axios from 'axios';
import Loading from './Loading.jsx';
import MensajeIA from './MensajeIA.jsx';

const Buscador = () => {

    const { edad, estadoCivil, hijos, presupuesto, intereses } = useContext(UserContext);
    const [resultados, setResultados] = useState(null);
    const [filtroIds, setFiltroIds] = useState([]);
    const [searching, setSearching] = useState(false);
    const [mensajeIA, setMensajeIA] = useState("");


    const matchID = (data) => {
        setFiltroIds(data.map(propiedad => propiedad.id));
    };

    const filtrarPropiedades = (propiedades) => {
        if (filtroIds.length === 0) {
            return propiedades;
        }
        return propiedades.filter(propiedad => filtroIds.includes(propiedad.id))
            .sort((a, b) => propiedades.findIndex(p => p.id === a.id) - propiedades.findIndex(p => p.id === b.id));
    };

    const busquedaSemantica = async () => {
        const usuario = { edad, estadoCivil, hijos, presupuesto, intereses };
        setSearching(true);
        try {
            const response = await axios.post('http://localhost:3000/busqueda', usuario);

            matchID(response.data.propiedadesEncontradas);
            setSearching(false);
            setMensajeIA(response.data.sugerenciaIA.sugerencia);

            setResultados(response.data);



        } catch (error) {
            console.error('Error al buscar la casa perfecta:', error);
        }
    };

    return (
        <div className="container mt-3">
            {!resultados && (
                <div className="d-flex justify-content-center align-items-center pt-3">
                    <button className='btn btn-primary pt-10' onClick={busquedaSemantica}>Busca la casa perfecta con ayuda de IA</button>
                </div>
            )}
            {searching && (
                <div className="d-flex justify-content-center align-items-center pt-3">
                    <Loading />
                </div>

            )}
            {resultados && (
                <div className='row'>
                    <div className='col-8 mt-4' >
                    <MensajeIA mensaje={mensajeIA} />
                        </div>
                    <Listado titulo="Propiedades sugeridas" filtrarPropiedades={filtrarPropiedades} />
                </div>
            )}
        </div>
    );
};

export default Buscador;