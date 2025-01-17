import { Link } from 'react-router-dom';

const MensajeIA = ({ mensaje }) => {
    return (
        <div className=" justify-content-start mb-4">
            <div className="p-3 bg-light rounded border" style={{ position: 'relative', width:'90%' , marginLeft:'40px' }}>
                <span style={{ fontSize: '3em' , position:"absolute" , left:"-56px" }}>🤖</span>
                <p className="mb-1 text-dark font-monospace">" {mensaje} "</p>

            </div>
            <p className="mt-0 mb-0 text-secondary small" style={{ marginLeft:'40px' }} >Busqueda basada en tu <Link to="/perfil">Perfil de Usuario</Link></p>
        </div>
    );
};

export default MensajeIA;