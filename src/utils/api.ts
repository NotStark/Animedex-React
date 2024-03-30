import axios from "axios";
import { animedexServers } from "./constants";

/**
 * Asynchronously fetches data from a specified API endpoint using Axios.
 *
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {number} [errorCount=0] - The number of times the function has retried after an error occurred.
 * @throws {Error} If the function fails to fetch data more than twice or encounters specific HTTP errors.
 * @returns {Promise<any>} The fetched data.
 */
export default async function fetchDataFromApi(endpoint: string, errorCount = 0) {
    const server = animedexServers[Math.floor(Math.random() * animedexServers.length)];
    const baseURL = server;

    try {
        const res = await axios.get(baseURL + endpoint);
        return res.data

    } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
        if (errorCount < 2) {
            return await fetchDataFromApi(endpoint, errorCount + 1);
        } else {
            throw new Error(`Failed to fetch data after multiple retries`);
        }
    }
}
