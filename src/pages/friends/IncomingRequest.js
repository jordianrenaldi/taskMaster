import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { useDocument } from '../../hooks/useDocument'

import styles from './Home.module.css'

export default function IncomingRequest({ requests, uid }) {
    const [friendUID, setFriendUID] = useState('')
    const [friendName, setFriendName] = useState('')
    const { updateDocument, response } = useFirestore('userFriendData')
    const { document: documentUser, error: errorUser } = useDocument('userFriendData', uid)
    const { document: documentFriend, error: errorFriend } = useDocument('userFriendData', friendUID)
    const { documentUsername, error } = useDocument('usernameMapping', uid)

    const handleSubmit = async(requestUID, requestName) => {
        setFriendUID(requestUID);
        setFriendName(requestName);
        if (documentUser && documentFriend && documentUsername) {
            await updateDocument(uid, {
              friends: [...documentUser.friends, {uid: requestUID, name: requestName}],
              incomingRequest: documentUser.incomingRequest.filter(request => request.uid !== requestUID) // Remove the accepted request
        });

        await updateDocument(requestUID, {
            friends: [...documentFriend.friends, {uid, name: documentUsername.displayName}]
        });

        
    }}

    return (
        <ul>
            {requests && requests.length === 0 && "You don't have any friend requests"}
            {requests && requests.length >= 1 && requests.map((request) => (
                <li key={request.uid}>
                <p className={styles.name}>{request.name}</p>
                <p className={styles.amount}>{request.uid}</p>
                <button onClick={() => handleSubmit(request.uid, request.name)}>Accept</button>
                </li>
            ))}
        </ul>
      )
}