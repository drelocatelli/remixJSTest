export async function getLocation(location : string) {

    const webservice = `https://viacep.com.br/ws/${location}/json/`;

    const request = await fetch(webservice);
    const response = await request.json();

    return response;
    
}