import { useEffect, useState, json, Suspense } from 'react';
import { data, useLoaderData, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {

  const { events } = useLoaderData();

  if (data.isError) {
    return <p>{data.message}</p>
  }
  // <Suspense> //in certain situations to show a fallback whilst we're waiting for other data to arrive.

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>

  );
  // return (
  //   <>

  //     <EventsList events={events} />
  //   </>
  // );
}

export default EventsPage;

async function loadEvent() {

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
    const res = new Response()
    return resData.events;


  }
}
export function loader() {
  return {
    events: loadEvent()
  };
}
