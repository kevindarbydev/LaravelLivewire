import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import FlashMessage from "@/Components/FlashMessage";

export default function Authenticated({ auth, header, children, cartCount }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [darkMode, setDarkMode] = useState(false);

    let theme;

    if (localStorage) {
        theme = localStorage.getItem("theme");
    }

    function toggleDarkMode() {
        if (theme === "dark") {
            setDarkMode((prevDarkMode) => !prevDarkMode);

            localStorage.setItem("theme", "light");
            theme = "light";
        } else {
            setDarkMode((prevDarkMode) => !prevDarkMode);
            localStorage.setItem("theme", "dark");
            theme = "dark";
        }
    }

    return (
        <div className={`min-h-screen ${theme == "dark" ? "dark" : ""}`}>
            <nav className=" border-b border-gray-100">
                {/* main-nav */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-1">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* nav-logo */}
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="h-16 w-16" />
                                </Link>
                            </div>
                            {/* links */}
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href={route("dashboard.index")}
                                    active={
                                        route().current("dashboard.index") ||
                                        route().current(
                                            "dashboard.collections"
                                        ) ||
                                        route().current(
                                            "dashboard.wishlists"
                                        ) ||
                                        route().current("dashboard.export")
                                    }
                                >
                                    <span className=" dark:text-white dark:hover:bg-gray-700">
                                        Dashboard
                                    </span>
                                </NavLink>

                                <NavLink
                                    href={route("explore.index")}
                                    disabled={true}
                                >
                                    <span className=" dark:text-white dark:hover:bg-gray-700">
                                        Explore
                                    </span>
                                </NavLink>

                                <NavLink
                                    href={route("friends.index")}
                                    active={
                                        route().current("friends.index") ||
                                        route().current("messages.index")
                                    }
                                >
                                    <span className=" dark:text-white dark:hover:bg-gray-700">
                                        Community
                                    </span>
                                </NavLink>

                                <NavLink
                                    href={route("marketplace.index")}
                                    active={
                                        route().current("marketplace.index") ||
                                        route().current("orders.index") ||
                                        route().current(
                                            "marketplace.wishlists"
                                        ) ||
                                        route().current(
                                            "marketplace.orders.albums.sold"
                                        )
                                    }
                                >
                                    <span className=" dark:text-white dark:hover:bg-gray-700">
                                        Marketplace
                                    </span>
                                </NavLink>
                                {/* FIXME: responsive overlap with icons */}
                                {/* <SearchBar /> */}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            {/* Messages */}
                            <div className="ml-3">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                    // Route to messages once it exists
                                >
                                    <a href={route("messages.index")}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                            />
                                        </svg>
                                    </a>
                                </button>
                            </div>
                            {/* Cart */}
                            <div className="ml-3 ">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                                />
                                            </svg>
                                            {cartCount}
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("marketplace.cart")}
                                        >
                                            View Cart
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("orders.index")}
                                        >
                                            Order History
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                            {/* Profile */}
                            <div className="ml-3 ">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                        {/* Burger */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        {/* dark mode */}
                        <div
                            onClick={toggleDarkMode}
                            className="h-6 w-6 self-center"
                        >
                            {theme == "dark" ? (
                                <MoonIcon className=" text-white" />
                            ) : (
                                <SunIcon className=" text-gray-600" />
                            )}
                        </div>
                    </div>
                </div>

                {/* responsive-nav */}
                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("landing.page")}
                            active={route().current("landing.page")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("dashboard.index")}
                            active={
                                route().current("dashboard.index") ||
                                route().current("dashboard.collections") ||
                                route().current("dashboard.wishlists") ||
                                route().current("dashboard.export")
                            }
                        >
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("explore.index")}
                            active={
                                route().current("explore.index") ||
                                route().current("explore.viewAllAlbums") ||
                                route().current("explore.advSearch")
                            }
                        >
                            Explore
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("friends.index")}
                            active={
                                route().current("friends.index") ||
                                route().current("messages.index")
                            }
                        >
                            Community
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("marketplace.index")}
                            active={
                                route().current("marketplace.index") ||
                                route().current("orders.index") ||
                                route().current("marketplace.wishlists") ||
                                route().current(
                                    "marketplace.orders.albums.sold"
                                )
                            }
                        >
                            Marketplace
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {auth.user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {auth.user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )} */}
            <FlashMessage />
            <main>{children}</main>
        </div>
    );
}
