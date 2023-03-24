import React from 'react';
import SignInForm from '../components/SignInForm';
import AllGunsCard from '../components/AllGunsCard';
import NavbarUser from '../components/navbars/NavbarUser';

export default function AllGunsUser() {
    return (<>
        <NavbarUser/>
        <AllGunsCard />
    </>);
}