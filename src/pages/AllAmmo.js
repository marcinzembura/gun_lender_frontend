import React from 'react';
import SignInForm from '../components/SignInForm';
import AllAmmoCard from '../components/AllAmmoCard';
import NavbarUser from '../components/navbars/NavbarUser';

export default function AllAmmo() {
    return (<>
        <NavbarUser/>
        <AllAmmoCard/>
    </>);
}