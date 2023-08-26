import { useAuthContext } from '../../hooks/useAuthContext'
import { useDocument } from '../../hooks/useDocument'

// styles
import styles from './Friends.module.css'

// components
import AddFriendForm from './AddFriendForm'
import FriendList from './FriendList'

export default function Friends() {
  const { user } = useAuthContext()
  const { document, error } = useDocument('userFriendData', `progress${user.uid}`)


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {document && <FriendList transactions={document.friends} />}
      </div>
      <div className={styles.sidebar}>
        <AddFriendForm uid={user.uid} />
      </div>
    </div>
    // <div className={styles.container}>
    //     <p>This is for friends page</p>
    // </div>
  )
}