import React, { useContext, useEffect, useState } from "react";
import logo from "@/assets/images/tablature.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink, To, useNavigate } from "react-router-dom";
import { AuthContext } from "@/App";

const Navbar = () => {
	// const [isDark, setIsDark] = useState(darkTheme); //toggles dark theme
	const {isLoggedIn} = useContext(AuthContext); //toggles login status

	// Nav Items
	const navlinks = [
		["Home", "/", <Icon inline icon='material-symbols:home-outline' className="w-6 h-6" />],
		// ["Courses", "/courses", <BookmarkSquareIcon className="w-6 h-6" />],
		["Tab", "/songs", <Icon inline icon='mingcute:file-music-line' className="w-6 h-6" />],
	];

	// Mapping Nav items to Navlinks
	const navLinkCards = navlinks.map(([title, url, icon]) => {
		return (
			<NavLink
				to={url as To}
				key={`${title}Link`}
				className="text-center justify-center select-none font-semibold active:bg-neutral-800/50 hover:bg-neutral-800/80 rounded-md py-2 px-4 flex gap-2"
			>
				{icon}
				{title}
			</NavLink>
		);
	});

	React.useEffect(() => {
		// if user is already logged in, redirect to home page
		// console.log(isLoggedIn)
	}, []);

	// If User not logged in redirects to sign up
	// useEffect(() => {
	// 	if (!authenticated) navigate("/");
	// }, [authenticated]);

	// Updates state when button has been toggled
	// useEffect(() => {
	// 	if (isDark) {
	// 		localStorage.setItem("dark-theme", isDark);
	// 		document.documentElement.classList.add("dark");
	// 	} else {
	// 		localStorage.removeItem("dark-theme");
	// 		document.documentElement.classList.remove("dark");
	// 	}

	// 	console.log(localStorage.getItem("dark-theme"));
	// }, [isDark]);

	return (
		<nav className="absolute top-0 z-10 container left-1/2 -translate-x-1/2 flex flex-col justify-evenly text-white">
			<div className="container justify-between flex mx-auto">
				<NavLink to={'/' as To} className={`flex gap-10 items-center m-7`}>
					{/* <Link className="select-none" to="/"> */}
					<img src={logo} />
					{/* </Link> */}
				</NavLink>

				<div className="my-auto bg-neutral-900 bg-opacity-90 rounded-xl px-5 py-2">
					<ul className="flex text-sm flex-row gap-3 capitalize">
						{navLinkCards}

						{isLoggedIn ? <Dropdown /> : (
							<NavLink
								to={'/login' as To}
								key={`LoginLink`}
								className="text-center justify-center select-none font-semibold active:bg-neutral-800/50 hover:bg-neutral-800/80 rounded-md py-2 px-4 flex gap-2"
							>
								<Icon inline icon='basil:login-solid' className="w-6 h-6" />
								Login
							</NavLink>
						)}
					</ul>
				</div>
			</div>
		</nav >
	);
};


const Dropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext); //toggles login status
	const navigate = useNavigate();

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleLogout = () => {
		// Perform logout logic here
		if(isLoggedIn) {
			setIsLoggedIn(false);
			localStorage.removeItem('token');
			navigate('/login', { replace: true });
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			const dropdown = document.getElementById("dropdown");

			if (dropdown && !dropdown.contains(target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);


	return (
		<div id='dropdown' className="dropdown relative">

			<button
				onClick={handleToggle}
				className="text-center justify-center items-center cursor-pointer group select-none font-semibold active:bg-neutral-800/50 hover:bg-neutral-800/80 rounded-md py-2 px-4 flex gap-2"
			>
				<Icon icon='mdi:account' className="w-5 h-5" />
				{localStorage.getItem('username') || 'User'}
				<Icon icon='mdi:chevron-down' className={`transform transition-transform w-5`} />
			</button>

			{isOpen && (
				<div className="w-full absolute z-10 right-0 rounded bg-neutral-600/90 dark:bg-neutral-400/20">
					<button
						onClick={handleLogout}
						className="w-full text-center justify-center select-none font-semibold active:bg-neutral-800/50 hover:bg-neutral-800/80 rounded-md py-2 px-4 flex gap-2"
					>
						<Icon inline icon='basil:login-solid' className="w-6 h-6" />
						<span>Logout</span>
					</button>
				</div>
			)}
		</div>
	);
};

// Usage:
// <Dropdown />

export default Navbar;
