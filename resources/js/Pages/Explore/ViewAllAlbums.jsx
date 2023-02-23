import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head, Link } from "@inertiajs/react";
import ExploreTabs from "@/Layouts/Tabs/ExploreTabs";
import Album from "../Dashboard/Partials/Album";

export default function ViewAllAlbums({ auth, albums, totalAlbums }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="All Albums" />
            <ExploreTabs />

            <h1 className="ml-2 mt-2 text-4xl font-normal">
                The Complete Regex Records Inventory
            </h1>

            <h1 className="ml-2 mt-2 text-2xl font-normal">
                Showing 5 albums of {totalAlbums} total
            </h1>

            <div className="p-4 sm:p-6 lg:p-8 ml-10">
                <div className="flex flex-row flex-wrap">
                    {albums.map((album) => (
                        <Album key={album.id} album={album} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
