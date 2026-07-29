import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('TODO')

    const [editingTaskId, setEditingTaskId] = useState(null)
    const [editTitle, setEditTitle] = useState('')
    const [editStatus, setEditStatus] = useState('TODO')

    const [errorMessage, setErrorMessage] = useState('')

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
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((message) => {
                        throw new Error(message)
                    })
                }

                return response.json()
            })
            .then((createdTask) => {
                setTasks([...tasks, createdTask])
                setErrorMessage('')
                setTitle('')
                setStatus('TODO')
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/tasks/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setTasks(tasks.filter((task) => task.id !== id))
                }
            })
            .catch((error) => console.error('Error deleting task:', error))
    }

    const handleEdit = (task) => {
        setEditingTaskId(task.id)
        setEditTitle(task.title)
        setEditStatus(task.status)
        setErrorMessage('')
    }

    const handleSave = () => {
        const updatedTask = {
            id: editingTaskId,
            title: editTitle,
            status: editStatus,
        }

        fetch(`http://localhost:8080/tasks/${editingTaskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((message) => {
                        throw new Error(message)
                    })
                }

                return response.json()
            })
            .then((savedTask) => {
                setTasks(
                    tasks.map((task) =>
                        task.id === savedTask.id ? savedTask : task
                    )
                )

                setEditingTaskId(null)
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
    }

    return (
        <main>
            <h1>Task Tracker</h1>
            <p>Manage your tasks in one place.</p>

            <form onSubmit={handleSubmit}>
                <h2>Add a new task</h2>
                {errorMessage && <p>{errorMessage}</p>}

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
                        {editingTaskId === task.id ? (
                            <>
                                <input
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />

                                <select
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value)}
                                >
                                    <option value="TODO">TODO</option>
                                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </select>

                                <button onClick={handleSave}>
                                    Save
                                </button>

                                <button onClick={() => setEditingTaskId(null)}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <h3>{task.title}</h3>
                                <p>Status: {task.status}</p>

                                <button onClick={() => handleEdit(task)}>
                                    Edit
                                </button>

                                <button onClick={() => handleDelete(task.id)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </article>
                ))}
            </section>
        </main>
    )
}

export default App