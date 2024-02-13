import { useEffect, useState } from "react";
import logo from "@/assets/images/tablature.png";

// Nav Items
// const navlinks = [
// 	["Home", "/", <HomeIcon className="stroke-2 w-5" />],
// 	// ["Courses", "/courses", <BookmarkSquareIcon className="stroke-2 w-5" />],
// 	["Lecturers", "/lecturers", <IdentificationIcon className="stroke-2 w-5" />],
// ];

// Mapping Nav items to Navlinks
// const navLinkCards = navlinks.map(([title, url, icon]) => {
// 	return (
// 		<NavLink
// 			to={url}
// 			key={`${title}Link`}
// 			className="group text-center justify-center select-none font-semibold active:bg-black/50 hover:bg-black/20 rounded-md py-2 px-4 flex gap-2"
// 		>
// 			{icon}
// 			{title}
// 		</NavLink>
// 	);
// });

// retrieve the boolean for toggling dark theme
const darkTheme = localStorage.getItem("dark-theme");

const Navbar = () => {
	const [isShowing, setIsShowing] = useState(false); //toggles hamburger navbar
	const [isDark, setIsDark] = useState(darkTheme); //toggles dark theme

	//storing login data
	const [LoginForm, setLoginForm] = useState({
		email: "",
		password: "",
	});

	//handle changes in login data
	// const handleLoginForm = (e) => {
	// 	setLoginForm((prevState) => ({
	// 		...prevState,
	// 		[e.target.name]: e.target.value,
	// 	}));
	// };

	// Submit Form with Redux
	// const submitLoginForm = (data) => {
	// 	data.email = data.email.toLowerCase();
	// };

	// If User not logged in redirects to sign up
	// useEffect(() => {
	// 	if (!authenticated) navigate("/");
	// }, [authenticated]);

	// Updates state when button has been toggled
	useEffect(() => {
		if (isDark) {
			localStorage.setItem("dark-theme", isDark);
			document.documentElement.classList.add("dark");
		} else {
			localStorage.removeItem("dark-theme");
			document.documentElement.classList.remove("dark");
		}

		console.log(localStorage.getItem("dark-theme"));
	}, [isDark]);

	// let contents;

	// Displays contents variable depending on
	// the user's authentication status
	// contents = (
	// 	<>
	// 		{/* Hamburger Menu */}
	// 		<Transition
	// 			className="overflow-hidden lg:hidden absolute border-b-4 border-neutral-500/50 bg-neutral-800/90 h-screen w-1/3 right-0 top-20"
	// 			show={isShowing}
	// 			enter="transition z-0 ease-in-out duration-300 transform"
	// 			enterFrom="translate-x-full"
	// 			enterTo="translate-x-0"
	// 			leave="-transition ease-in-out duration-300 transform"
	// 			leaveFrom="-translate-x-0"
	// 			leaveTo="translate-x-full"
	// 		>
	// 			<div className="">
	// 				<div className="container grid gap-3 my-5 mx-auto">
	// 					<div className=" flex gap-2 justify-center items-center text-2xl font-bold uppercase">
	// 						<UserCircleIcon className="stroke-1 w-8" />
	// 						{localStorage.getItem("auth")}
	// 					</div>
	// 					<hr className="border-neutral-900/90" />
	// 					{navLinkCards}
	// 					<li
	// 						onClick={() => dispatch(logoutUser(authToken))}
	// 						className="text-center justify-center cursor-pointer group select-none font-semibold active:bg-black hover:bg-neutral-900 rounded-md py-2 px-4 flex gap-2"
	// 					>
	// 						<ArrowLeftOnRectangleIcon className="stroke-2 w-5" />
	// 						Sign out
	// 					</li>
	// 				</div>
	// 			</div>
	// 		</Transition>
	// 		{/* Full-width menu */}
	// 		<div className="lg:grid lg:grid-flow-col lg:grid-cols-3 lg:gap-5 hidden">
	// 			{navLinkCards}
	// 			{/* User Dropdown */}
	// 			<Popover className="relative">
	// 				{({ open }) => (
	// 					<>
	// 						<Popover.Button className="text-center justify-center items-center cursor-pointer group select-none font-semibold active:bg-black hover:bg-neutral-900 rounded-md py-2 px-4 flex gap-2">
	// 							<UserIcon className="stroke-2 w-5" />
	// 							{localStorage.getItem("auth")}
	// 							<ChevronDownIcon
	// 								className={` transform transition-transform w-5
	// 										${open ? "rotate-180 duration-200" : ""}
	// 									`}
	// 							/>
	// 						</Popover.Button>

	// 						<Popover.Panel className="absolute z-10 right-0 rounded-sm bg-neutral-800/80 dark:bg-neutral-400/20">
	// 							<li
	// 								onClick={() => dispatch(logoutUser(authToken))}
	// 								className="text-end justify-end cursor-pointer group select-none font-semibold py-2 px-10 flex gap-1 dark:active:bg-black/50 dark:hover:bg-black/20 active:bg-black/70 hover:bg-black/50 "
	// 							>
	// 								<ArrowLeftOnRectangleIcon className="stroke-2 w-5" />
	// 								Sign out
	// 							</li>
	// 						</Popover.Panel>
	// 					</>
	// 				)}
	// 			</Popover>
	// 		</div>
	// 		<div className="block mx-8 lg:hidden">
	// 			<Bars3Icon
	// 				onClick={() => setIsShowing((isShowing) => !isShowing)}
	// 				className="w-8 cursor-pointer"
	// 			/>
	// 		</div>
	// 	</>
	// );

	return (
		<nav className="flex flex-col justify-evenly text-white">
			<div className="container justify-between flex mx-auto">
				<div className={`invert flex gap-10 items-center m-7`}>
					{/* <Link className="select-none" to="/"> */}
						<img src={logo} />
					{/* </Link> */}
				</div>

				<div className="my-auto">
					{/* <ul className="flex text-sm flex-row gap-3 capitalize">{contents}</ul> */}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
