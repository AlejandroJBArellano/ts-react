import React, { useState, useRef } from 'react';
import './App.css';
import { makeStyles, Card, CardHeader, Typography, Container, CardContent, TextField, Button } from "@material-ui/core";

type FormElement = React.FormEvent<HTMLFormElement>
interface ITask {
  name: string;
  done: boolean;
}

const useStyles = makeStyles({
  root: {
    margin: "10px",
    border: "2px solid blue",
    textAlign: "center",
    letterSpacing: "2px",
    textDecoration: "none"
  },
  none: {
    margin: "10px",
    border: "2px solid blue",
    textAlign: "center",
    letterSpacing: "2px",
    textDecoration: "line-through",
    color: "gray"
  }
});

export default function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault()
    addTask(newTask)
    setNewTask("")
    taskInput.current?.focus()
  }

  const addTask = (name:string): void => {
    const newTasks: ITask[] = [...tasks, {name, done: false}]
    setTasks(newTasks)
  }

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks]
    newTasks[i].done = !newTasks[i].done
    setTasks(newTasks)
  }

  const deleteTask = (i: number) => {
    const newTasks: ITask[] = [...tasks]
    newTasks.splice(i,1)
    setTasks(newTasks);
  }

  const classes = useStyles()

  return <Container maxWidth="sm">
    <CardContent>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField autoFocus ref={taskInput} value={newTask} onChange={e => setNewTask(e.target.value)} name="hello" id="outlined-basic" label="Outlined" variant="outlined" />
        <Button onClick={ _ => handleSubmit } className={classes.root} variant="contained" color="primary">
          Send Data
        </Button>
      </form>
    </CardContent>
    {
      tasks.map((t: ITask, i: number) => {
        return <Card key={i} className={!t.done ? classes.root: classes.none}>
            <CardContent>
              {i}.{t.name}
            </CardContent>
            <Button variant="contained" color="primary" onClick={ _ => toggleDoneTask(i)}>
            {!t.done ? "Done" : "Not done"}
            </Button>            
            <Button variant="contained" color="primary" onClick={ _ => deleteTask(i)}>
            X
            </Button>
          </Card>
      })
    }
  </Container>
}