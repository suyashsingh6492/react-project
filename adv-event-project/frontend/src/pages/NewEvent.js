import { useParams, useLoaderData, useRouteLoaderData, redirect } from "react-router-dom";
import {json} from 'react'
import EventForm from '../components/EventForm'
function NewEventsPage() {
    return (<>
        <EventForm  method='post'/>
    </>);
}

export default NewEventsPage;

export async function action({ request, params }) {
    const data = await request.formData();
    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
    }
    const resp = await fetch('http://localhost:8080/events',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });
    if(resp.status===422){
        return resp;
    }
    if (!resp.ok) {
        throw json({message: 'Could not saved event.'},{status:500})
    }
    return redirect('/events');

}