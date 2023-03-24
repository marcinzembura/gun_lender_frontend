import React from 'react';
import SignInForm from '../components/SignInForm';
import AllGunsCard from '../components/AllGunsCard';
import NavbarAdmin from '../components/navbars/NavbarAdmin';

export default function AllGunsAdmin() {
    return (<>
        <NavbarAdmin/>
        <AllGunsCard />
    </>);
}