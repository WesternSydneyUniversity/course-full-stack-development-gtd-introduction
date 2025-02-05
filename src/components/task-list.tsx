"use client";

import { useState } from "react";
import { TaskItem } from "./task-item";
import styles from "./task-list.module.css";

export type Task = {
  id: string;
  title: string;
  state: "PINNED" | "COMPLETED" | "ACTIVE";
};

export function TaskList({ tasks: parentTasks }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState(parentTasks);
  const [text, setText] = useState("");

  const activeTasks = tasks.filter((task) => task.state === "ACTIVE");
  return (
    <>
      <div>
        <section className={styles.counter}>
          <div className={styles.taskLabel}>
            {activeTasks.length} task{activeTasks.length == 1 ? "" : "s"}
          </div>
        </section>
        <section className={styles.section}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}
        </section>
      </div>
      <section className={styles.inputContainer}>
        <input
          type="text"
          placeholder="What needs to be done?"
          className={styles.taskInput}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className={styles.taskButton}
          onClick={() => {
            setTasks([
              ...tasks,
              {
                id: Date.now().toString(),
                title: text,
                state: "ACTIVE"
              }
            ]);
            setText("");
          }}
        >
          Add Task
        </button>
      </section>
    </>
  );
}
