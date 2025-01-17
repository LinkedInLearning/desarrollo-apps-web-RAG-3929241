
import { Routes, Route } from 'react-router-dom'
import Buscador from './components/Buscador'
import Perfil from './components/Perfil'
import Listado from './components/Listado'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/buscador" element={<Buscador />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/listado" element={<Listado />} />
            <Route path="*" element={<Listado />} />
        </Routes>)
}

export default AppRoutes