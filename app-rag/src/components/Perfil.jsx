import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext.jsx';

const Perfil = () => {
    const { edad, setEdad, estadoCivil, setEstadoCivil, hijos, setHijos, presupuesto, setPresupuesto, intereses, setIntereses } = useContext(UserContext);

    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);


    const handleGuardar = () => {
        setMostrarConfirmacion(true);
        setTimeout(() => {
            setMostrarConfirmacion(false);
        }, 3000);
    };

    return (
        <div>

            <h1 className='fs-2'>Perfil de usuario</h1>
            <form>
                <div className="form-group">
                    <div>
                        <label htmlFor="edadInput">Edad:</label>
                        <input
                            id="edadInput"
                            className="form-control"
                            type="number"
                            min="18"
                            max="80"
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="estadoCivilSelect">Estado civil:</label>
                        <select
                            id="estadoCivilSelect"
                            className="form-control"
                            value={estadoCivil}
                            onChange={(e) => setEstadoCivil(e.target.value)}
                        >
                            <option value="soltero">Soltero/a</option>
                            <option value="casado">Casado/a</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="hijosInput">Hijos:</label>
                        <input
                            id="hijosInput"
                            className="form-control"
                            type="number"
                            min="0"
                            max="20"
                            value={hijos}
                            onChange={(e) => setHijos(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="presupuestoSelect">Presupuesto:</label>
                        <select
                            id="presupuestoSelect"
                            className="form-control"
                            value={presupuesto}
                            onChange={(e) => setPresupuesto(e.target.value)}
                        >
                            <option value="bajo">bajo</option>
                            <option value="medio">medio</option>
                            <option value="alto">alto</option>
                        </select>
                    </div>
                    <div >
                        <label htmlFor="interesesTextarea">Intereses:</label>
                        <textarea
                            id="interesesTextarea"
                            className="form-control"
                            value={intereses}
                            onChange={(e) => setIntereses(e.target.value)}
                        />
                    </div>
                    <p></p>
                    <button type="button" className="btn btn-primary " onClick={handleGuardar}>Guardar</button>
                </div>
            </form>

            {mostrarConfirmacion && (
                <div className="alert alert-success d-flex align-items-center " role="alert">
                    <div>
                        Cambios guardados correctamente
                    </div>
                </div>
            )}


        </div>
    );
};

export default Perfil;