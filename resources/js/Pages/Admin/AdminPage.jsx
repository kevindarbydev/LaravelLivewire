import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AdminUserTable from "./Partials/AdminUserTable";
import AdminAlbumTable from "./Partials/AdminAlbumTable";
import AdminMessageTable from "./Partials/AdminMessageTable";
import AdminReviewTable from "./Partials/AdminReviewTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function AdminPage({ auth, users, albums, messages }) {
    const [currentTable, setCurrentTable] = useState("users");
    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        fetch("/csrf-token")
            .then((response) => response.json())
            .then((data) => setCsrfToken(data.csrfToken))
            .catch((error) => console.error(error));
    }, []);
    if (csrfToken !== "") {
        console.log("Csrf token: " + csrfToken);
    }

    const handleTableChange = (newTable) => {
        setCurrentTable(newTable);
    };

    let currentTableComponent;
    if (currentTable === "users") {
        currentTableComponent = (
            <AdminUserTable users={users} csrf={csrfToken} />
        );
    } else if (currentTable === "albums") {
        currentTableComponent = (
            <AdminAlbumTable albums={albums} csrf={csrfToken} />
        );
    } else if (currentTable === "messages") {
        currentTableComponent = <AdminMessageTable messages={messages} csrf={csrfToken} />;
    } else if (currentTable === "reviews") {
        currentTableComponent = <AdminReviewTable csrf={csrfToken} />;
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Admin Interface" />
            <div className="flex justify-center mr-32">
                <div className="flex flex-col w-full max-w-md">
                    <div className="flex justify-between mb-4 mt-8">
                        <button
                            className={`py-2 px-4 text-sm font-medium focus:outline-none ${
                                currentTable === "users"
                                    ? "bg-gray-100"
                                    : "bg-white"
                            }`}
                            onClick={() => handleTableChange("users")}
                        >
                            Users
                        </button>
                        <button
                            className={`py-2 px-4 text-sm font-medium focus:outline-none ${
                                currentTable === "users"
                                    ? "bg-gray-100"
                                    : "bg-white"
                            }`}
                            onClick={() => handleTableChange("reviews")}
                        >
                            Reviews
                        </button>
                        <button
                            className={`py-2 px-4 text-sm font-medium focus:outline-none ${
                                currentTable === "users"
                                    ? "bg-gray-100"
                                    : "bg-white"
                            }`}
                            onClick={() => handleTableChange("messages")}
                        >
                            Messages
                        </button>

                        <button
                            className={`py-2 px-4 text-sm font-medium focus:outline-none ${
                                currentTable === "albums"
                                    ? "bg-gray-100"
                                    : "bg-white"
                            }`}
                            onClick={() => handleTableChange("albums")}
                        >
                            Albums
                        </button>
                    </div>
                    {currentTableComponent}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
export default AdminPage;
