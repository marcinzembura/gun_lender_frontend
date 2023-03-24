import React from 'react';
import MyReservationForm from '../components/MyReservationForm';
import NavbarUser from '../components/navbars/NavbarUser';

export default function MyReservation() {
    return (
    <>
        <NavbarUser/>
        <MyReservationForm />
    </>
    );
}