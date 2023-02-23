import { Tab } from "@headlessui/react";
import NavLink from "@/Components/NavLink";

export default function DashboardTabs() {
    return (
        <Tab.Group defaultIndex={1}>
            <Tab.List className="flex space-x-8 bg-blue-300/20 p-2">
                <Tab disabled className="ml-2">
                    Dashboard
                </Tab>
                <Tab>
                    <NavLink
                        href={route("dashboard.index")}
                        active={route().current("dashboard.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            My Albums
                        </span>
                    </NavLink>
                </Tab>

                <Tab>
                    <NavLink
                        href={route("dashboard.collections")}
                        active={route().current("dashboard.collections")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Collections
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    <NavLink
                    // href={route("wishlists.index")}
                    // active={route().current("wishlists.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Wishlists
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    <NavLink
                    // href={route("submissions.index")}
                    // active={route().current("submissions.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Submissions
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    {" "}
                    <NavLink
                    // href={route("export.index")}
                    // active={route().current("export.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Export
                        </span>
                    </NavLink>
                </Tab>
            </Tab.List>
        </Tab.Group>
    );
}
