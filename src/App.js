import { useState } from "react"
import Header from "./components/Header"
import Task from "./components/Task";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themes.js";
import Button from 'react-bootstrap/Button';

import "./style1.css"



const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const App =() =>{
  const [showAddTask, setShowAddTask] = useState(false)
  const [theme, setTheme] = useState("light");
  const[tasks, setTasks] = useState([


    {
        id: 1,
        text: 'Doctors appointment',
        day: 'Feb 5th at 2:30pm',
        reminder: true,
    },

    {
        id: 2,
        text: 'Meeting at School',
        day: 'Feb 6th at 1:30pm',
        reminder: true,

    },

    {

        id: 3,
        text: 'food shopping',
        day: 'Feb 5th at 2:30pm',
        reminder: false,
    },

])

//Add task

const addTask = (task) => {
  const id = Math.floor(Math.random() * 1000) +1
  const newTask = {id, ...task}
  setTasks([...tasks,newTask])
}

//delete Task
const DeleteTask = (id) => {

  setTasks(tasks.filter((task) => task.id !== id))

}

//Toggle Reminder

const toggleReminder = (id) => {

  setTasks(tasks.map((task) => task.id === id ? {...task,reminder: !task.reminder} : task))
}


//theme Toggler

const themeToggler = () => {
  theme === "light" ? setTheme("dark") : setTheme("light");
};


  return (

    

    <div className="container">
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Header onAdd={() =>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask &&<AddTask onAdd={addTask}/>}
      {tasks.length >0 ? <Tasks tasks={tasks} onDelete={DeleteTask} onToggle ={toggleReminder}/> : 'No tasks to show'}
      <GlobalStyles />
      <StyledApp>
      
        <button onClick={() => themeToggler()} type="button" class="glow-on-hover"  >Dark Theme</button> {' '}
      </StyledApp>
      </ThemeProvider>
    </div>



  );
}

export default App

