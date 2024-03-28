import axios from "axios";
import { animedexServers } from "./constants";

/**
 * Asynchronously fetches data from a specified API endpoint using Axios.
 *
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {number} [errorCount=0] - The number of times the function has retried after an error occurred.
 * @throws {Error} If the function fails to fetch data more than twice.
 * @returns {Promise<any>} The fetched data.
 */
export default async function fetchDataFromApi(endpoint: string, errorCount: number = 0) {

    // let includeProxy = false;

    // if (errorCount >= 2) {
    //     throw new Error(`Failed to fetch data after multiple retries`);
    // } else if (errorCount > 0) {
    //     includeProxy = true;
    // }

    

    let server = animedexServers[Math.ceil(Math.random() * (animedexServers.length - 1))]
    let baseURL = server

    try {
        const res = await axios.get(baseURL + endpoint );
        return res.data;
    } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
        if (errorCount >= 2) {
            throw new Error(`Failed to fetch data after multiple retries`);
        }

        return await fetchDataFromApi(endpoint, errorCount + 1);
    }
}
