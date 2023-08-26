import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { useDocument } from '../../hooks/useDocument'

export default function AddFriendForm({ uid }) {
  const [friendUID, setFriendUID] = useState('')
  const { updateDocument, response } = useFirestore('userFriendData')
  const { document, error } = useDocument('usernameMapping', uid)
  const { document: friendDocument, error: friendError} = useDocument('userFriendData', friendUID);

  const handleSubmit = async (e) => {
    console.log("Handler is called");
    e.preventDefault();
    
    if (friendUID) {
      if (friendDocument && document) {
        await updateDocument(friendUID, {
          incomingRequest: [...friendDocument.incomingRequest, {name: document.displayName, uid}]
        });
        console.log(response);
      } 
    }
  };
  

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setFriendUID('')
    }
  }, [response.success])

  return (
    <>
      <h3>Add a New Friend</h3>
      {response.isPending && <p>Loading...</p>}
      {response.error && <p>Error: {response.error}</p>}
      {response.success && <p>Friend request sent successfully!</p>}
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