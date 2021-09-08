import "../index.js"
export const fetchV = input => {
    return fetch(`https://restcountries.eu/rest/v2/name/${input}`)
        .then(Response => { return Response.json() })
}