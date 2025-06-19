import { Link, redirect, useNavigate, useNavigation, useParams, useSubmit } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx'
import ErrorBlock from '../UI/ErrorBlock.jsx';
export default function EditEvent() {
  const navigate = useNavigate();

  const params = useParams();

  const { data, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id })
  })

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const newEvent = data.event;
  //     await queryClient.cancelQueries({ queryKey: ['events', params.id] })
  //     const prevEvent = queryClient.getQueryData(['events', params.id]);
  //     ////can manipulate that stored data yourself by calling set query data.
  //     queryClient.setQueryData(['events', params.id], newEvent);
  //     return { prevEvent: prevEvent }
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(['events', params.id], content.prevEvent)
  //   },
  //   onSettled: ()=>{
  //     //whenever this mutation is done, no matter if it failed or succeeded.
  //     queryClient.invalidateQueries(['events', params.id]);

  //   }
  // })

  const submit = useSubmit();
  const { state } = useNavigation();
  function handleSubmit(formData) {
    // mutate({ id: params.id, event: formData });
    // navigate('../')
    submit(formData, { method: 'PUT' })
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  // if (isPending) {
  //   content = (<div className='center'>
  //     <LoadingIndicator />

  //   </div>);
  // }

  if (isError) {
    content = (<>
      <ErrorBlock title="failed to load event" message={error.info?.message || "failed ot load eent"} />
      <div className='form-actions'>
        <Link to="../" className='button'>
          Okay
        </Link>
      </div>
    </>);
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === 'sumitting' ? (<p>Submitting data...</p>) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}

      </EventForm>
    );
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id })
  });

}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updateEvent });
  await queryClient.invalidateQueries(['events']);
  return redirect('../');

}
