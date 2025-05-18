import { useState } from "react"

export function NewTask({ onAdd }) {

    const [enterTask, setEnterTask] = useState('');

    function handleTaskChange(event) {
        setEnterTask(event.target.value)

    }

    function handleClick() {
        if(enterTask.trim()===''){
            return;
        }
        onAdd(enterTask)
        setEnterTask('');
    }
    return <div className="flex items-center gap-4">
        <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" onChange={handleTaskChange} value={enterTask} />
        <button className="text-stone-700 hover:text-stone-950" onClick={handleClick}>Add Task</button>
    </div>
}