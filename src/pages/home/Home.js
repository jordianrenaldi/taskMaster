import TaskBreaker from '../../components/TaskBreaker';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useDocument } from "../../hooks/useDocument";
// styles
import styles from './Home.module.css'

// components
import TaskForm from './TaskForm'
import TaskList from './TaskList'

export default function Home() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection("tasks", ["uid", "==", user.uid]);
  console.log(documents ? documents : "");

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TaskList tasks={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TaskForm uid={user.uid} />
      </div>
      <TaskBreaker></TaskBreaker>
    </div>
  )
}
