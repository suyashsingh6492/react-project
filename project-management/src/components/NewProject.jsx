import { useRef } from 'react'
import { Input } from './Input.jsx'
import Modal from './Modal.jsx';
export function NewProject({ onAdd,onCancel }) {
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();
    const modal=useRef();
    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;
        if(enteredTitle.trim()==='' || enteredDescription.trim()==='' || enteredDueDate.trim()===''){ 
            modal.current.open();
            return;
        }
        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        });


    }
    return <>
    <Modal ref={modal} buttonCaption="Okay">
        <h2  className='text-xl fond-bold text-stone-700 mt-4 mb-4 my-4'>Invalid Input</h2>
        <p  className='text-stone-600 mb-4'>Opps..looks like you forget to enter a value </p>
    </Modal>
    <div className='w-[35rem] mt-16 '>
        <menu className='flex item-center justify-end gap-4 my-4'>
            <li><button className='px-6 py-2 text-stone-800 hover:text-stone-950' onClick={onCancel}>Cancel</button></li>
            <li><button
                className='px-6 py-2 round-md bg-stone-800 text-stone-50 hover:bg-stone-950 '
                onClick={handleSave}
            >Save</button></li>
        </menu>
        <div>
            <Input type="text" ref={title} lable="Title" />
            <Input ref={description} lable="Description" isTextArea />
            <Input type="date" ref={dueDate} lable="Due Date" />
        </div>
    </div></>
}