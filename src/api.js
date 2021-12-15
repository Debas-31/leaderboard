export const createGame = async(url, data) =>{
    const response = await fetch(url,{
        method: 'POST',
        body: JSON.stringify({
            name: Date.name,
        }),
        headers: {
            'content-type': 'application/json;  charset = UTF-8',
        },
    });
    return response.json();
};