import { Button } from "./Button";

export function SideBar({ onStartAddProject, projects, onSelectProject, selectedProjectId }) {
    return <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl ">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
        <div>
            <Button onClick={onStartAddProject}>+Add Project</Button>
        </div>
        <ul className="mt-8">
            {
                projects.map(pro => {
                    let cssClass = "w-full text-left px-2 py-1 rounded-sm my-1  hover:bg-stone-800";
                    if (pro.id === selectedProjectId) {
                        cssClass += " bg-stone-800 text-stone-200"
                    } else {
                        cssClass += " text-stone-400"

                    }
                    return (<li key={pro.id}>
                        <button
                            onClick={()=>onSelectProject(pro.id)}
                            className={cssClass}>
                            {pro.title}
                        </button>
                    </li>);
                }

                )
            }
        </ul>
    </aside>
}