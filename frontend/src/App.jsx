import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [tasks, setTasks] = useState([])

    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('TODO')
    const [priority, setPriority] = useState('MEDIUM')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')

    const [editingTaskId, setEditingTaskId] = useState(null)
    const [editTitle, setEditTitle] = useState('')
    const [editStatus, setEditStatus] = useState('TODO')
    const [editPriority, setEditPriority] = useState('MEDIUM')
    const [editDescription, setEditDescription] = useState('')
    const [editDueDate, setEditDueDate] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState('ALL')

    useEffect(() => {
        fetch('http://localhost:8080/tasks')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Could not load tasks')
                }

                return response.json()
            })
            .then((data) => {
                setTasks(data)
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        const newTask = {
            title,
            status,
            priority,
            description,
            dueDate: dueDate || null,
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
                setPriority('MEDIUM')
                setDescription('')
                setDueDate('')
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
    }

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this task?'
        )

        if (!confirmed) {
            return
        }
        fetch(`http://localhost:8080/tasks/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Could not delete task')
                }

                setTasks(tasks.filter((task) => task.id !== id))
                setErrorMessage('')
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
    }

    const handleEdit = (task) => {
        setEditingTaskId(task.id)
        setEditTitle(task.title)
        setEditStatus(task.status)
        setEditPriority(task.priority || 'MEDIUM')
        setEditDescription(task.description || '')
        setEditDueDate(task.dueDate || '')
        setErrorMessage('')
    }

    const handleCancel = () => {
        setEditingTaskId(null)
        setErrorMessage('')
    }

    const handleSave = () => {
        const updatedTask = {
            id: editingTaskId,
            title: editTitle,
            status: editStatus,
            priority: editPriority,
            description: editDescription,
            dueDate: editDueDate || null,
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

                setErrorMessage('')
                setEditingTaskId(null)
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
    }

    const filteredTasks =
        filterStatus === 'ALL'
            ? tasks
            : tasks.filter((task) => task.status === filterStatus)

    const statusLabels = {
        TODO: 'To Do',
        IN_PROGRESS: 'In Progress',
        DONE: 'Done',
    }

    const priorityLabels = {
        LOW: 'Low',
        MEDIUM: 'Medium',
        HIGH: 'High',
    }

    return (
        <main>
            <h1>Task Tracker</h1>
            <p>Manage your tasks in one place.</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    maxLength={500}
                />

                <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>

                <select
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                >
                    <option value="LOW">Low Priority</option>
                    <option value="MEDIUM">Medium Priority</option>
                    <option value="HIGH">High Priority</option>
                </select>

                <input
                    type="date"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                />

                <button type="submit">Add Task</button>
            </form>

            {errorMessage && (
                <p className="error-message">
                    {errorMessage}
                </p>
            )}

            <section>
                <h2>Tasks</h2>

                <select
                    value={filterStatus}
                    onChange={(event) => setFilterStatus(event.target.value)}
                >
                    <option value="ALL">All Tasks</option>
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>

                {isLoading ? (
                    <p className="loading-message">Loading tasks...</p>
                ) : filteredTasks.length === 0 ? (
                    <p className="empty-message">
                        No tasks yet. Add your first task above.
                    </p>
                ) : (
                    filteredTasks.map((task) => (
                        <article key={task.id}>
                            {editingTaskId === task.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(event) =>
                                            setEditTitle(event.target.value)
                                        }
                                    />

                                    <textarea
                                        value={editDescription}
                                        onChange={(event) =>
                                            setEditDescription(event.target.value)
                                        }
                                        maxLength={500}
                                    />

                                    <select
                                        value={editStatus}
                                        onChange={(event) =>
                                            setEditStatus(event.target.value)
                                        }
                                    >
                                        <option value="TODO">To Do</option>
                                        <option value="IN_PROGRESS">
                                            In Progress
                                        </option>
                                        <option value="DONE">Done</option>
                                    </select>

                                    <select
                                        value={editPriority}
                                        onChange={(event) =>
                                            setEditPriority(event.target.value)
                                        }
                                    >
                                        <option value="LOW">Low Priority</option>
                                        <option value="MEDIUM">
                                            Medium Priority
                                        </option>
                                        <option value="HIGH">High Priority</option>
                                    </select>

                                    <input
                                        type="date"
                                        value={editDueDate}
                                        onChange={(event) =>
                                            setEditDueDate(event.target.value)
                                        }
                                    />

                                    <button
                                        type="button"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h3>{task.title}</h3>

                                    {task.description && (
                                        <p className="task-description">
                                            {task.description}
                                        </p>
                                    )}

                                    <div className="task-badges">
                        <span className={`status ${task.status}`}>
                            {statusLabels[task.status]}
                        </span>


                        <span className={`priority ${task.priority}`}>
                                {priorityLabels[task.priority]}
                        </span>
                                    </div>

                                    {task.dueDate && (
                                        <p className="due-date">
                                            Due: {task.dueDate}
                                        </p>
                                    )}

                                    <div className="task-actions">
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(task)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(task.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </article>
                    ))
                )}
            </section>
        </main>
    )
}

export default App