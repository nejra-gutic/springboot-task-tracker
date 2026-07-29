import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('TODO')

    useEffect(() => {
        fetch('http://localhost:8080/tasks')
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error('Error fetching tasks:', error))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        const newTask = {
            title: title,
            status: status,
        }

        fetch('http://localhost:8080/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
            .then((response) => response.json())
            .then((createdTask) => {
                setTasks([...tasks, createdTask])
                setTitle('')
                setStatus('TODO')
            })
            .catch((error) => console.error('Error creating task:', error))
    }

    return (
        <main>
            <h1>Task Tracker</h1>
            <p>Manage your tasks in one place.</p>

            <form onSubmit={handleSubmit}>
                <h2>Add a new task</h2>

                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                >
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                </select>

                <button type="submit">Add Task</button>
            </form>

            <section>
                <h2>Tasks</h2>

                {tasks.map((task) => (
                    <article key={task.id}>
                        <h3>{task.title}</h3>
                        <p>Status: {task.status}</p>
                    </article>
                ))}
            </section>
        </main>
    )
}

export default App