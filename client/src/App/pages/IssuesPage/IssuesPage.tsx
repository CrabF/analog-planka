import { TextInput, Button, Select } from "@gravity-ui/uikit";
import styles from "./IssuesPage.module.css";
import { useEffect, useState } from "react";
import { useGetAllTasksQuery } from "@/api/api";
import { useSearchParams } from "react-router";
import { ChevronsUpWide, ChevronsDownWide, Bars } from "@gravity-ui/icons";
import { Task } from "@/api/types";
import { TaskComponent } from "@/components/Task/Task";
import { GlobalModal } from "@/components/GlobalModal";

const priorityIcon = {
  High: <ChevronsUpWide fill="currentColor" stroke="#7e2121" color="#7e2121" />,
  Low: (
    <ChevronsDownWide fill="currentColor" stroke="#1a1a8d" color="#1a1a8d" />
  ),
  Medium: <Bars fill="currentColor" stroke="#d3b410" color="#d3b410" />,
};

export const IssuesPage = () => {
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<Task[] | []>();

  const { data: tasks } = useGetAllTasksQuery();

  const displayedTasks = filteredTasks ? filteredTasks : tasks?.data || [];

  const handleClickBtn = () => {
    setIssueModalOpen(!issueModalOpen);
  };

  const handleCardClick = (id: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("card", id.toString());
    setSearchParams(newParams);
    setTimeout(() => {
      setIssueModalOpen(!issueModalOpen);
    }, 100);
  };

  const handleSearchInput = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("search", value);
    setSearchParams(newParams);
    setInputValue(value);
    if (tasks) {
      filterTasks(tasks.data);
    }
  };

  const filterTasks = (tasks: Task[]) => {
    const newTasks = tasks.filter((task) => {
      if (task.title.toLowerCase().includes(inputValue.toLowerCase())) {
        return task;
      }
      if (
        task.assignee.fullName.toLowerCase().includes(inputValue.toLowerCase())
      ) {
        return task;
      }
    });
    setFilteredTasks(newTasks);
  };

  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam && tasks) {
      filterTasks(tasks.data);
      // setInputValue(searchParam)
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.searchInputs}>
        <div className={styles.search}>
          <TextInput
            size="xl"
            type="text"
            view="normal"
            placeholder="Поиск по исполнителю/задаче"
            onChange={(e) => {
              handleSearchInput(e.target.value);
            }}
            value={inputValue}
          />
        </div>
        <div>
          <Select
            size="xl"
            label="Фильтры:"
            options={[
              {
                label: "Статус задачи",
                options: [
                  { value: "Backlog", content: "Backlog" },
                  { value: "InProgress", content: "InProgress" },
                  { value: "Done", content: "Done" },
                ],
              },
              {
                label: "Доска",
                options: [
                  { value: "val_3", content: "Value 3" },
                  { value: "val_4", content: "Value 4" },
                ],
              },
            ]}
          />
        </div>
      </div>
      <div className={styles.tasksContainer}>
        <div className={styles.cards}>
          {displayedTasks.map((item) => {
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
        </div>
        <div>
          <Button onClick={handleClickBtn} view="action" size="xl">
            Создать задачу
          </Button>
        </div>
      </div>
      {issueModalOpen && (
        <GlobalModal
          open={issueModalOpen}
          onClose={setIssueModalOpen}
        />
      )}
    </div>
  );
};
