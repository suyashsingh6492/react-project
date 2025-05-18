import { useState } from "react";
import { NewProject } from "./components/NewProject";
import { NoProjectSelected } from "./components/NoProjectSelected";
import { SideBar } from "./components/Sidebar";
import { SelectedProject } from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    project: [],
    tasks: []
  });



  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    });
  }

  function handleAddProject(projectData) {
    const projectId = Math.random()

    setProjectState(prevState => {
      const newProject = {
        ...projectData,
        id: projectId
      }
      return {
        ...prevState,
        //  selectedProjectId: projectId,
        selectedProjectId: undefined,
        project: [...prevState.project, newProject]
      }
    })
  }


  function handleAddTask(text) {
    const taskId = Math.random()

    setProjectState(prevState => {
      const newTask = {
        text: text,
        id: taskId,
        projectId: prevState.selectedProjectId
      }
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.project.filter((task) => task.id !== id)
      }
    });
  }


  console.log(projectState)


  function handleCacelAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    });
  }

  function handleSelectProject(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    });
  }

  function handleDeleteProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        project: prevState.project.filter((project) => project.id !== prevState.selectedProjectId)
      }
    });
  }

  const selectProject = projectState.project.find(project => project.id == projectState.selectedProjectId)

  let content = <SelectedProject
    project={selectProject}
    tasks={projectState.tasks}
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask} />;

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCacelAddProject} />
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />

  }


  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <SideBar onStartAddProject={handleStartAddProject}
          projects={projectState.project} onSelectProject={handleSelectProject} selectedProjectId={projectState.selectedProjectId}/>
        {/* <NewProject /> */}
        {content}

      </main>
    </>
  );
}

export default App;
