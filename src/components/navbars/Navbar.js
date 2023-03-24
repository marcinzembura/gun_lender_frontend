import { useRef } from "react";
import { FaBars, FaTimes, GiPistolGun } from "react-icons/fa";
import "./Navbar.css"

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header>
			<h3>GUN LENDER</h3>
			<nav ref={navRef}>
				<a href="/">Wszystkie bronie</a>
				<a href="/logowanie">Logowanie</a>
				<a href="rejestracja">Rejestracja</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;