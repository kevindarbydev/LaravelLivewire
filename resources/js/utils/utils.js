import axios from "axios";

const resources = {};

const makeRequestCreator = (proxyUrl) => {
    let cancel;
    console.log("Proxy: " + proxyUrl);
    const axiosInstance = axios.create({
        baseURL: proxyUrl,
    });

    return async (query) => {
        console.log(query);
        let preciseQuery;
        if (!query) {
        
            console.log("No query provided");
            return;
        }

        const [releaseTitle, artistName] = query.split(",");
    
        if (artistName && releaseTitle) {            
            console.log("Both release title and artist name provided");
            preciseQuery = `release_title=${encodeURIComponent(
                releaseTitle.trim()
            )}&artist=${encodeURIComponent(artistName.trim())}`;            
        } else {
            console.log("Missing either artist or release title, firing general search");
            preciseQuery = `q=${encodeURIComponent(query.trim())}`;
        }

      

        if (cancel) {
            // Cancel the previous request before making a new request
            cancel.cancel();
            console.log("cancelling request!");
        }
        // Create a new CancelToken
        cancel = axios.CancelToken.source();
        try {
            const cacheKey = preciseQuery;
            if (resources[cacheKey]) {
                // Return result if it exists
                console.log("Found values already cached!");
                return resources[preciseQuery];
            }
            const res = await axiosInstance.get("", {
                params: {
                    url: "https://api.discogs.com/database/search", //
                    q: preciseQuery,
                },
                cancelToken: cancel.token,
            });

            const result = res.data.results;
            // Store response
            resources[preciseQuery] = result;

            return result;
        } catch (error) {
            if (axios.isCancel(error)) {
                // Handle if request was cancelled
                console.log("Request canceled: ", error.message);
            } else {
                // Handle usual errors
                console.log("Something went wrong: ", error.message);
            }
        }
    };
};

export default makeRequestCreator;

