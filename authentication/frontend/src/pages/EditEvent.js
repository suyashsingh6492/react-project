import { useRouteLoaderData } from 'react-router-dom';
import { getAuthToken } from '../util/auth';

import EventForm from '../components/EventForm';

function EditEventPage() {
  const data = useRouteLoaderData('event-detail');

  return <EventForm method="patch" event={data.event} />;
}

export default EditEventPage;
