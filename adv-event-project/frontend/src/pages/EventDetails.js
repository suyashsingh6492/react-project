import { useParams, useLoaderData, useRouteLoaderData, redirect, Await } from "react-router-dom";
import EventItem from '../components/EventItem.js'
import { useEffect, useState, json, Suspense } from 'react';
import EventsList from "../components/EventsList.js";

function EventsDetailsPage() {
    const param = useParams();
    //const data = useRouteLoaderData('event-details');
    const { event, events } = useRouteLoaderData('event-detail');
    return (<>
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
            <Await resolve={event}>
                {loadedEvent => <EventItem event={loadedEvent} />}
            </Await>
        </Suspense>
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>

            <Await resolve={events}>
                {loadedEvents => <EventsList events={loadedEvents} />}

            </Await>
        </Suspense>


        {/* <EventItem event={data.event} />
        <EventsList events={data.event} />
        <h1>EventsDetailsPage Page</h1>
        <p>Event Id: {param.eventId}</p> */}
    </>);
}
export default EventsDetailsPage;



export async function action({ params, request }) {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId,
        {
            method: request.method
        }
    );
    if (!response.ok) {
        throw json({ message: 'could not delete event.' }, { status: 500 });
    }

    return redirect('/events');
}


async function loadEvents() {

    const response = await fetch('http://localhost:8080/events');
    // const response = await fetch('http://localhost:8080/events/error');

    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch events' }
        // throw { message: 'Could not fetch events.' }
        // throw new Response(JSON.stringify({message:'could not fetch event'}),{status: 5000})
        // return json({ message: 'could not fetch event' }, { status: 500 });
        return new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
            status: 500,
        });
    } else {
        const resData = await response.json();
         
        return resData.events;


    }
}

async function loadEvent(id) {
    const response = await fetch('http://localhost:8080/events/' + id);
    // const response = await fetch('http://localhost:8080/events/error');

    if (!response.ok) {

        return new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
            status: 500,
        });
    } else {
        const resData = await response.json();
        return resData.event;


    }
}

export async function loader({ request, params }) {
    console.log(request.url)
    const id = params.eventId;
    // const resp = await fetch('http://localhost:8080/events/' + id);
    // if (!resp.ok) {
    //     throw json({ message: 'could not fetch detial for selected event' }, { status: 500 });
    // }
    // return resp;

    return {
        event: await    loadEvent(id), events: loadEvents()
    }

} 