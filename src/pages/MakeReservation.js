import React from 'react';
import MakeReservationForm from '../components/MakeReservationForm';
import NavbarUser from '../components/navbars/NavbarUser';

export default function MakeReservation() {
    return (<>
        <NavbarUser/>
        <MakeReservationForm />
    </>);
}