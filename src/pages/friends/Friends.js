import { useAuthContext } from '../../hooks/useAuthContext'
import { useDocument } from '../../hooks/useDocument'

// styles
import styles from './Home.module.css'

// components
import AddFriendForm from './AddFriendForm'
import FriendList from './FriendList'
import IncomingRequest from './IncomingRequest'

export default function Friends() {
  const { user } = useAuthContext()
  const { document, error } = useDocument('userFriendData', user.uid)
  console.log(document)


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {document && <FriendList friends={document.friends} uid={user.uid} />}
      </div>
      <div className={styles.sidebar}>
        <AddFriendForm uid={user.uid} />
      </div>
      <div className={styles.content}>
        {document && <IncomingRequest requests={document.incomingRequest} uid={user.uid}/>}
      </div>
    </div>
  )
}