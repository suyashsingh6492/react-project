import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../../util/http.js';
export default function NewEventsSection() {
  // const [data, setData] = useState();
  // const [error, setError] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   async function fetchEvents() {
  //     setIsLoading(true);
  //     const response = await fetch('http://localhost:3000/events');

  //     if (!response.ok) {
  //       const error = new Error('An error occurred while fetching the events');
  //       error.code = response.status;
  //       error.info = await response.json();
  //       throw error;
  //     }

  //     const { events } = await response.json();

  //     return events;
  //   }


  //   fetchEvents()
  //     .then((events) => {
  //       setData(events);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', { max: 3 }],
    queryFn: ({ signal , queryKey}) => fetchEvents({ signal, ...queryKey[1]}),
    staleTime: 5000, //within 5 sec no new auto req will be send to server 
    gcTime: 30000 // after 30 min cache disgraded, if re-render new req will be trigger
  });

  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (error) {
    content = (
      <ErrorBlock title="An error occurred" message={error.info?.message || 'Failed to fetch events'} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
