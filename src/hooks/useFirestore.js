import { useReducer, useEffect, useState } from "react"
import { projectFirestore, timestamp } from "../firebase/config"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    case "UPDATED_DOCUMENT":
      console.log('Payload for UPDATED_DOCUMENT: ', action.payload);
      return { isPending: false, document: action.payload, success: true,  error: null }
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = projectFirestore.collection(collection)

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }
  
  // add a document
  const addDocument = async (doc) => {
    console.log("addDocument called");
    dispatch({ type: 'IS_PENDING' })
    console.log("Dispatched IS_PENDING");

    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt })
      console.log("Document added", addedDocument);
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
      console.log("Dispatched ADDED_DOCUMENT");
    }
    catch (err) {
      console.log("Error in addDocument", err);
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
      console.log("Dispatched ERROR");
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    console.log("deleteDocument called");
    dispatch({ type: 'IS_PENDING' })
    console.log("Dispatched IS_PENDING");

    try {
      await ref.doc(id).delete()
      console.log("Document deleted");
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
      console.log("Dispatched DELETED_DOCUMENT");
    }
    catch (err) {
      console.log("Error in deleteDocument", err);
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
      console.log("Dispatched ERROR");
    }
  }

  
  // update a document
  const updateDocument = async (id, updates) => {
    console.log("updateDocument called");
    console.log("Document ID to be updated: ", id);
    console.log("Updates to be made: ", updates);
    dispatch({ type: "IS_PENDING" })
    console.log("Dispatched IS_PENDING");

    try {
      const updatedDocument = await ref.doc(id).update(updates)
      console.log("Document updated", updatedDocument);
      dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDocument })
      console.log("Dispatched UPDATED_DOCUMENT");
      return updatedDocument
    } 
    catch (error) {
      console.log("Error in updateDocument", error);
      dispatchIfNotCancelled({ type: "ERROR", payload: error })
      console.log("Dispatched ERROR");
      return null
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, updateDocument, response }

}