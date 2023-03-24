import React, { useState, useEffect } from 'react';
import AddGunForm from '../components/AddGunForm';
import NavbarAdmin from '../components/navbars/NavbarAdmin';
import Utils from '../services/Utils';


export default function AddGun() {
    const [hasAccess, setHasAccess] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const result = true //tutaj nowy call do backendu
            setHasAccess(result);
        };
        fetchData();
    });

    if (hasAccess === undefined) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            Ładuje strone...
        </div>;
    }

    return (
        <>
            <NavbarAdmin />
            <AddGunForm />
        </>);
}