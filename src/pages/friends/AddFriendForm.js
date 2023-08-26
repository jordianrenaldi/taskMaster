import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { useDocument } from '../../hooks/useDocument'

export default function TransactionForm({ uid }) {
  const [friendUID, setFriendUID] = useState('')
  const { updateDocument, response } = useFirestore('userFriendData')
  const { document, error } = useDocument('userFriendData', uid)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateDocument(uid, {
      outgoingRequest: [ ...document.outgoingRequest, friendUID]
    })
    console.log(response)
  }
  

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setFriendUID('')
    }
  }, [response.success])

  return (
    <>
      <h3>Add a New Friend</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Friend UID:</span>
          <input 
            type="text"
            required
            onChange={(e) => setFriendUID(e.target.value)} 
            value={friendUID} 
          />
        </label>
        <button>Add Friend</button>
      </form>
    </>
  )
}