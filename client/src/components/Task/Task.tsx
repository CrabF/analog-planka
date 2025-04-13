import { Card, Text, User } from "@gravity-ui/uikit";
import styles from "./Task.module.css";
import { BoardInfo, Task } from "@/api/types";
import { FC } from "react";

interface TaskProps {
  task: Task | BoardInfo;
  icon: JSX.Element;
  onClick: () => void;
}

export const TaskComponent: FC<TaskProps> = ({ task, icon, onClick }) => {
  return (
    <Card
      className={styles.card}
      size="m"
      view="filled"
      type="action"
      key={task.id}
      onClick={onClick}
    >
      <div className={styles.icon}>{icon}</div>
      <Text variant="body-3" className={styles.title}>
        {task.title}
      </Text>
      <User avatar={task.assignee.avatarUrl} />
    </Card>
  );
};
