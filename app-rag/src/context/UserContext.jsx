import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [edad, setEdad] = useState(18);
    const [estadoCivil, setEstadoCivil] = useState('soltero');
    const [hijos, setHijos] = useState(0);
    const [presupuesto, setPresupuesto] = useState('medio');
    const [intereses, setIntereses] = useState('');

    return (
        <UserContext.Provider value={{ edad, setEdad, estadoCivil, setEstadoCivil, hijos, setHijos, presupuesto, setPresupuesto, intereses, setIntereses }}>
            {children}
        </UserContext.Provider>
    );
};