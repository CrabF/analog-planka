import { useParams } from "react-router";
import styles from "./BoardPage.module.css";
import { Card, Text, User } from "@gravity-ui/uikit";
import { useGetAllboardsQuery, useGetBoardInfoQuery } from "@/api/api";
import { ChevronsUpWide, ChevronsDownWide, Bars } from "@gravity-ui/icons";

const priorityIcon = {
  High: <ChevronsUpWide fill="currentColor" stroke="#7e2121" color="#7e2121" />,
  Low: (
    <ChevronsDownWide fill="currentColor" stroke="#1a1a8d" color="#1a1a8d" />
  ),
  Medium: <Bars fill="currentColor" stroke="#d3b410" color="#d3b410" />,
};

export const BoardPage = () => {
  const { id } = useParams();
  const { data } = useGetBoardInfoQuery(id as string);
  const { data: boards } = useGetAllboardsQuery();

  const boardAdditionalInfo = boards?.data.find((item) => {
    return item.id.toString() === id;
  });

  return (
    <div className={styles.container}>
      <Text variant="header-1">{boardAdditionalInfo?.name}</Text>
      <div className={styles.board}>
        <Card type="container" view="filled" className={styles.column}>
          <Text variant="header-2">To do</Text>
          {data?.data
            .filter((item) => {
              return item.status === "Backlog";
            })
            .map((item) => {
              const priorityElem = priorityIcon[item.priority];
              return (
                <Card
                  className={styles.card}
                  size="m"
                  view="filled"
                  type="action"
                  key={item.id}
                >
                  <div className={styles.icon}>{priorityElem}</div>
                  <Text variant="body-3" className={styles.title}>
                    {item.title}
                  </Text>
                  <User avatar={item.assignee.avatarUrl} />
                </Card>
              );
            })}
        </Card>
        <Card type="container" view="filled" className={styles.column}>
          <Text variant="header-2">In progress</Text>
          {data?.data
            .filter((item) => {
              return item.status === "InProgress";
            })
            .map((item) => {
              const priorityElem = priorityIcon[item.priority];
              return (
                <Card
                  className={styles.card}
                  size="m"
                  view="filled"
                  type="action"
                  key={item.id}
                >
                  <div className={styles.icon}>{priorityElem}</div>
                  <Text variant="body-3" className={styles.title}>
                    {item.title}
                  </Text>
                  <User avatar={item.assignee.avatarUrl} />
                </Card>
              );
            })}
        </Card>
        <Card type="container" view="filled" className={styles.column}>
          <Text variant="header-2">Done</Text>
          {data?.data
            .filter((item) => {
              return item.status === "Done";
            })
            .map((item) => {
              const priorityElem = priorityIcon[item.priority];
              return (
                <Card
                  className={styles.card}
                  size="m"
                  view="filled"
                  type="action"
                  key={item.id}
                >
                  <div className={styles.icon}>{priorityElem}</div>
                  <Text variant="body-3" className={styles.title}>
                    {item.title}
                  </Text>
                  <User avatar={item.assignee.avatarUrl} />
                </Card>
              );
            })}
        </Card>
      </div>
    </div>
  );
};
