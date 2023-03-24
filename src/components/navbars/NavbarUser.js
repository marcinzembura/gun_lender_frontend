import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { FaBars, FaTimes, GiPistolGun } from "react-icons/fa";
import "./Navbar.css"

export default function NavbarUser() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header>
			<h3>GUN LENDER</h3>
			<nav ref={navRef}>
				<a href="/klient/wszystkie-bronie">Wszystkie bronie</a>
				<a href="/amunicja">Amunicja</a>
				<a href="/klient/rezerwacja">Rezerwacja broni</a>
       			 <a href="/klient/zamowienia">Zamówienia</a>
				<a href="/klient/ustawienia">Ustawienia</a>
				<a href="/wylogowanie">Wyloguj się</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
				<Outlet />
			</button>
		</header>
	);
}
