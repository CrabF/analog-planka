import { useParams, useSearchParams } from "react-router";
import styles from "./BoardPage.module.css";
import { Card, Text } from "@gravity-ui/uikit";
import { useGetAllboardsQuery, useGetBoardInfoQuery } from "@/api/api";
import { ChevronsUpWide, ChevronsDownWide, Bars } from "@gravity-ui/icons";
import { TaskComponent } from "@/components/Task/Task";
import { useState } from "react";
import { GlobalModal } from "@/components/GlobalModal";

const priorityIcon = {
  High: <ChevronsUpWide fill="currentColor" stroke="#7e2121" color="#7e2121" />,
  Low: (
    <ChevronsDownWide fill="currentColor" stroke="#1a1a8d" color="#1a1a8d" />
  ),
  Medium: <Bars fill="currentColor" stroke="#d3b410" color="#d3b410" />,
};

export const BoardPage = () => {
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const { id } = useParams();
  const { data } = useGetBoardInfoQuery(id as string);
  const { data: boards } = useGetAllboardsQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const boardAdditionalInfo = boards?.data.find((item) => {
    return item.id.toString() === id;
  });

  const handleCardClick = (id: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("card", id.toString());
    setSearchParams(newParams);
    setTimeout(() => {
      setIssueModalOpen(!issueModalOpen);
    }, 100);
  };

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
                <TaskComponent
                  key={item.id}
                  task={item}
                  icon={priorityElem}
                  onClick={() => {
                    handleCardClick(item.id);
                  }}
                />
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
                <TaskComponent
                  key={item.id}
                  onClick={() => {
                    handleCardClick(item.id);
                  }}
                  task={item}
                  icon={priorityElem}
                />
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
                <TaskComponent
                  key={item.id}
                  onClick={() => {
                    handleCardClick(item.id);
                  }}
                  task={item}
                  icon={priorityElem}
                />
              );
            })}
        </Card>
      </div>
      {issueModalOpen && (
        <GlobalModal open={issueModalOpen} onClose={setIssueModalOpen} />
      )}
    </div>
  );
};
