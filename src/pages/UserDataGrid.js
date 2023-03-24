import React from 'react';
import UserDataGridForm from '../components/UserDataGridForm';
import NavbarAdmin from '../components/navbars/NavbarAdmin';

export default function UserDataGrid() {
    return (
        <>
            <NavbarAdmin />
            <UserDataGridForm />
        </>
    );
}