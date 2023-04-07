//import dependencies
import { getToken } from "./authenticate";
const dotenv = require("dotenv");
dotenv.config();


export async function addToFavourites(id) {
    return(
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `JWT ${getToken()}`
            }
        })
        .then((res) => {
            return (res.status === 200 ? res.json() : [])
        })
    )
}

// export async function addToFavourites(id) {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
//         method: "PUT",
//         headers: {
//             Authorization: `JWT ${getToken()}`
//         }
//     })
//     if (response.status === 200) {
//         return response.json();;
//     } else {
//         return [];
//     }
// }


export async function removeFromFavourites(id) {
    return(
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `JWT ${getToken()}`
            }
        })
        .then((res) => {
            return (res.status === 200 ? res.json() : [])
        })
    )
}


export async function getFavourites() {
    return(
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${getToken()}`
            }
        })
        .then((res) => {
            return (res.status === 200 ? res.json() : [])
        })
    )
}


export async function addToHistory(id) {
    return(
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `JWT ${getToken()}`
            }
        })
        .then((res) => {
            return (res.status === 200 ? res.json() : [])
        })
    )
}


export async function removeFromHistory(id) {
    return(
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `JWT ${getToken()}`
            }
        })
        .then((res) => {
            return (res.status === 200 ? res.json() : [])
        })
    )
}

export async function getHistory() {
    return(
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${getToken()}`
            }
        })
        .then((res) => {
            return (res.status === 200 ? res.json() : [])
        })
    )
}