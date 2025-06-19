import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Header from '../Header.jsx';
import { deleteEvent, fetchEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const [isDeleted, setIsDeleted] = useState(false);
  const params = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id })
  });
  const navigate = useNavigate();

  const { mutate, isPending: isPendingDeletion, isError: isErrorDeleting, error: deleteError } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none' //these existing queries will not automatically be triggered again immediately. Instead, they will just be invalidated and the next time they are required, they will run again.
      });
      navigate('/events')
    }
  });

  function handleStartDelete() {
    setIsDeleted(true);
  }

  function handleStopdelete() {
    setIsDeleted(false);
  }

  function handleDelete() {
    mutate({ id: params.id });
  }

  let content;
  if (isPending) {
    content = (<div id='event-details-content' className='center'><p>Fetching the data...</p></div>);
  }
  if (isError) {
    content = (<div id='event-details-content' className='center'>
      <ErrorBlock title="Failed to load event" message={error.info?.message || "failed ot fetch data"} />
    </div>);


  }
  if (data) {
    const fomattedDate = new Date(data.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{fomattedDate} @ {data.time}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {isDeleted && (<Modal onClose={handleStopdelete}>
        <h2>Ary You Sure?</h2>
        <p> Do you really want to delete this event? This action can't be undone</p>
        <div className='form-actions'>
          {isPendingDeletion && (<p>Deleting please wait...</p>)}
          {!isPendingDeletion && (<>
            <button onClick={handleStopdelete} className='button-text'>Cancel</button>
            <button onClick={handleDelete} className='button'>Delete</button>
          </>)}

        </div>
        {isErrorDeleting && <ErrorBlock title="Failed to delete event" message={deleteError.info?.message || "Failed to delete event, please try again"}/>}
      </Modal>)}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {content}
      </article>
    </>
  );
}
