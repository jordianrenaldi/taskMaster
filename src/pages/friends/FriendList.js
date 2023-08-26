import { useFirestore } from '../../hooks/useFirestore'
import { useDocument } from '../../hooks/useDocument'

// styles
import styles from './Friends.module.css'

export default function FriendList({ friends }) {

  return (
    <ul className={styles.friends}>
      {friends.map((friend) => (
        <li key={friend.friendList}>
          <p className={styles.name}>{friend.username}</p>
        </li>
      ))}
    </ul>
  )
}