import { useState ,useEffect} from "react"
import {BrowserRouter as Router , Route, Routes}  from 'react-router-dom'
import Header from "./components/Header"
import Task from "./components/Task";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

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
  const[tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {

      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }

    getTasks()
  }, [])

// fetch Tasks data

const fetchTasks = async () => {
  const res = await fetch('http://localhost:3000/tasks')
  const data = await res.json()

  return data

}


// fetch Task data

const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:3000/tasks/${id}`)
  const data = await res.json()

  return data

}

//Add task
const addTask = async (task) => {
  const res = await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  const data = await res.json()

  setTasks([...tasks, data])

  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = { id, ...task }
  // setTasks([...tasks, newTask])
}

//delete Task
const DeleteTask = async (id) => {

  const res = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE',
  })


  setTasks(tasks.filter((task) => task.id !== id))

}

//Toggle Reminder

const toggleReminder = async(id) => {

  const taskToToggle = await fetchTask(id)
  const updTask  = {...taskToToggle,reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:3000/tasks/${id}`, {

      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
  })

  const data = await res.json()

  setTasks(tasks.map((task) => task.id === id ? {...task,reminder: data.reminder} : task))
}


//theme Toggler

const themeToggler = () => {
  theme === "light" ? setTheme("dark") : setTheme("light");
};


  return (

    
    <Router>
    <div className="container">
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Header onAdd={() =>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>

      <Routes>
        <Route
        path='/'
        element= {

        <>
      

      {showAddTask &&<AddTask onAdd={addTask}/>}
      
      {tasks.length >0 ? <Tasks tasks={tasks} onDelete={DeleteTask} onToggle ={toggleReminder}/> : 'No tasks to show'}

      </>
        }
        />

        <Route path='/about' element={<About/>} />
        </Routes>
        <Footer/>
      <GlobalStyles />
      <StyledApp>
      
        <button onClick={() => themeToggler()} type="button" class="glow-on-hover"  >Dark Theme</button> {' '}
      </StyledApp>
      </ThemeProvider>

      
      
    
  
    
    </div>

 
    </Router>

  );
}

export default App

