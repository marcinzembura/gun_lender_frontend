import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { FaBars, FaTimes, GiPistolGun } from "react-icons/fa";
import "./Navbar.css"

export default function NavbarAdmin() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header>
			<h3>GUN LENDER</h3>
			<nav ref={navRef}>
				<a href="/admin/wszystkie-bronie">Wszystkie bronie</a>
				<a href="/admin/dodawanie-broni">Dodaj broń</a>
				<a href="/admin/bronie">Bronie</a>
				<a href="/admin/dodawanie-amunicji">Dodaj amunicję</a>
				<a href="/admin/amunicje">Amunicje</a>
				<a href="/admin/wszystkie-rezerwacje">Wszystkie rezerwacje</a>
				<a href="/admin/uzytkownicy">Uzytkownicy</a>
				<a href="/admin/ustawienia">Ustawienia</a>
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
