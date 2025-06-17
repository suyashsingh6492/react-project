import { useParams, useLoaderData, useRouteLoaderData } from "react-router-dom";

import EventForm from '../components/EventForm'
function EditEventPage() {
    const data = useRouteLoaderData('event-details');

    const event = data.event;
    return (<>
        <EventForm event={event} method='patch'/>
    </>)
}
export default EditEventPage;