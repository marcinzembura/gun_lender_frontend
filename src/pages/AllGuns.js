import React from 'react';
import SignInForm from '../components/SignInForm';
import AllGunsCard from '../components/AllGunsCard';
import Navbar from '../components/navbars/Navbar';

export default function AllGuns() {
    return (<>
        <Navbar/>
        <AllGunsCard />
    </>);
}