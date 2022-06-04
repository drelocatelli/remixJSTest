import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

interface DataType {
  text: string;
  type: string;
}

export async function loader() {

  const req = await fetch('https://cat-fact.herokuapp.com/facts/random'); 

  const response = await req.json();

  return json(response);

}

export default function Index() {

  const data : DataType = useLoaderData();
    
  return (
    <>
      <h4>Fatos sobre gatos</h4>
      <p>
        {data.text}
      </p>
    </>
  );
}
