import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { queryClient } from '../../util/http.js';
export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({

    mutationFn: createNewEvent,
    onSuccess: () => {
      //by default all queries that include this key will be invalidated
      queryClient.invalidateQueries({ queryKey: ['events']}); //React Query that the data
      //fetched by certain queries is outdated now, that it should be marked as stale and that an immediate refetch should be triggered
      //if the Query belongs to a component that's currently visible on the screen
      navigate('/events')
    }
  });

  function handleSubmit(formData) {
    mutate({ event: formData });

  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (<>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>)}


      </EventForm>
      {isError && <ErrorBlock title="Failed to create event"
        message={error.info?.message || 'Failed to create event. Please check your input and try again later.'} />}
    </Modal>
  );
}
