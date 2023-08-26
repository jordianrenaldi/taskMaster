import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function TaskForm({ uid }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { addDocument, response } = useFirestore('tasks')

  const handleSubmit = (e) => {
    e.preventDefault()
    addDocument({
      uid, 
      name, 
      description,
      subtask: [],
    })
  }

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName('')
      setDescription('')
    }
  }, [response.success])

  return (
    <>
      <h3>Add a Task</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Task name:</span>
          <input 
            type="text"
            required
            onChange={(e) => setName(e.target.value)} 
            value={name} 
          />
        </label>
        <label>
          <span>Description:</span>
          <textarea
            required
            onChange={(e) => setDescription(e.target.value)} 
            value={description} 
          />
        </label>
        <button>Break Down Task</button>
      </form>
    </>
  )
}