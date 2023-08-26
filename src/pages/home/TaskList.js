import { useFirestore } from '../../hooks/useFirestore'

// styles
import styles from './Home.module.css'

export default function TaskList({ tasks }) {
  const { deleteDocument } = useFirestore('tasks')

  return (
    <ul className={styles.transactions}>
      {tasks.map((task) => (
        <li key={task.id}>
          <p className={styles.name}>{task.name}</p>
          <p className={styles.amount}>{task.description}</p>
          <button onClick={() => deleteDocument(task.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}