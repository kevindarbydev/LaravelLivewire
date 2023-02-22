import { Tab } from "@headlessui/react";
import NavLink from "@/Components/NavLink";

export default function CommunityTabs() {
    return (
        <Tab.Group defaultIndex={1}>
            <Tab.List className="flex space-x-8 bg-blue-300/20 p-2">
                <Tab disabled className="ml-2">
                    Community
                </Tab>
                <Tab>
                    <NavLink
                        href={route("friends.index")}
                        active={route().current("friends.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Friends
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    <NavLink
                        href={route("community.search")}
                        active={route().current("community.search")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Search
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    {" "}
                    <NavLink
                    // href={route("###.index")}
                    // active={route().current("###.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Messaging
                        </span>
                    </NavLink>
                </Tab>
            </Tab.List>
        </Tab.Group>
    );
}
