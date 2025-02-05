import type { Task } from "./task-list";

import styles from "./task-item.module.css";

export function TaskItem({
  task,
  tasks,
  setTasks,
}: {
  task: Task;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.checkbox}>
        <div className={styles.round}>
          <input
            type="checkbox"
            id={`task-${task.id}`}
            checked={task.state === "COMPLETED"}
            data-testid={`task-${task.id}`}
            onChange={() => {
              setTasks(
                tasks.map((t) =>
                  t.id === task.id
                    ? {
                        ...t,
                        state: t.state === "ACTIVE" ? "COMPLETED" : "ACTIVE",
                      }
                    : t
                )
              );
            }}
          />
          <label htmlFor={`task-${task.id}`}></label>
        </div>
      </div>
      <span
        className={styles.title}
        style={
          task.state == "COMPLETED"
            ? { textDecoration: "line-through" }
            : undefined
        }
      >
        {task.title}
      </span>
      <div className={styles.actions}>
        <button
          data-testid={`delete-${task.id}`}
          className={styles.deleteButton}
          onClick={() => {
            setTasks(tasks.filter((t) => t.id !== task.id));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
