import { useFirestore } from "../../hooks/useFirestore";
import TaskAccordion from "../../components/TaskAccordian";

// styles
import styles from "./Home.module.css";

export default function TaskList({ maintasks }) {
  const { deleteDocument } = useFirestore("tasks");

  return (
    <ul>
      {maintasks.map((task) => (
        <li key={task.id}>
          <div className={styles.accordionList}>
            <div className={styles.deleteContainer}>
              <img
                src={"/trash.png"}
                className={styles.delete}
                onClick={() => deleteDocument(task.id)}
              />
            </div>
            <TaskAccordion maintask={task.taskName} subTasks={task.content} />
          </div>
        </li>
      ))}
    </ul>
  );
}
