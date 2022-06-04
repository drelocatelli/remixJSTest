import { ActionFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { getLocation } from "~/models/location.server";

interface DataType {
    location: string;
}

interface ResponseType {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
}

export async function action({request} : any) {
    const data = Object.fromEntries(await request.formData()) as DataType;

    const response  = await getLocation(data.location);
    
    return response;
}

export default function Basic() {

    const data : (ResponseType | undefined) = useActionData();
    
    useEffect(() => {
        console.log(data);

    }, [data]);

    return(
        <>
            Basic.

            <Form method='post'>
                <input type="number" name='location' required/>
                <button type='submit'>Enviar</button>
            </Form>

            <br /><br />
            {(data != undefined) ? 
                <Result data={data} />
            : null}
            
        </>
    );
}

function Result({data} : ResponseType | any) {
    return (
        <>
            Result: <br /><br />
            Bairro: {data?.bairro} <br />
            Logradouro: {data?.logradouro} <br />
            Localidade: {data?.localidade} <br />
            Complemento: {data?.complemento} <br />
            UF: {data?.uf}
        </>
    );
}