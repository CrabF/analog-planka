import { TextInput, Button, Select, Skeleton } from "@gravity-ui/uikit";
import styles from "./IssuesPage.module.css";
import { useEffect, useState } from "react";
import { useGetAllboardsQuery, useGetAllTasksQuery } from "@/api/api";
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
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const { data: allBoards, isLoading: isLoadingBoards } =
    useGetAllboardsQuery();

  const { data: tasks, isLoading: isLoadingTasks } = useGetAllTasksQuery();

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
      searchTasks(tasks.data);
    }
  };

  const searchTasks = (tasks: Task[]) => {
    if (!inputValue) {
      return tasks;
    }
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
    return newTasks;
  };

  const handleFilterTasks = (value: string[]) => {
    setSelectedFilter(value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("filter", value[0]);
    setSearchParams(newParams);
    if (tasks) {
      filterTasks(tasks.data, value);
    }
  };

  const filterTasks = (tasks: Task[], value: string[]) => {
    if (value.length === 0) {
      return tasks;
    }
    if (
      value[0] === "Backlog" ||
      value[0] === "Done" ||
      value[0] === "InProgress"
    ) {
      const filteredByStatus = tasks.filter((item) => {
        return item.status === value[0];
      });
      return filteredByStatus;
    } else {
      const filteredByBoards = tasks?.filter((item) => {
        return item.boardId.toString() === value[0];
      });
      return filteredByBoards;
    }
  };

  useEffect(() => {
    const searchParam = searchParams.get("search");
    const filterParam = searchParams.get("filter");
    if (searchParam) {
      setInputValue(searchParam);
    }
    if (filterParam) {
      setSelectedFilter([filterParam]);
    }
  }, []);

  if (isLoadingBoards || isLoadingTasks) {
    return (
      <div className={styles.skeletonBox}>
        {Array.from({ length: 10 }).map((_, index) => {
          return <Skeleton key={index} className={styles.skeleton} />;
        })}
      </div>
    );
  }

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
            value={selectedFilter}
            label="Фильтры:"
            size="xl"
            onUpdate={handleFilterTasks}
          >
            <Select.OptionGroup label="Статус задачи">
              <Select.Option value="Backlog" content="Backlog" />
              <Select.Option value="InProgress" content="In progress" />
              <Select.Option value="Done" content="Done" />
            </Select.OptionGroup>
            <Select.OptionGroup label="Доска">
              {allBoards?.data.map((item) => {
                return (
                  <Select.Option
                    key={item.id}
                    value={item.id.toString()}
                    content={item.name}
                  />
                );
              })}
            </Select.OptionGroup>
          </Select>
        </div>
      </div>
      <div className={styles.tasksContainer}>
        <div className={styles.cards}>
          {searchTasks(filterTasks(tasks?.data || [], selectedFilter)).map(
            (item) => {
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
            },
          )}
        </div>
        <div>
          <Button onClick={handleClickBtn} view="action" size="xl">
            Создать задачу
          </Button>
        </div>
      </div>
      {issueModalOpen && (
        <GlobalModal open={issueModalOpen} onClose={setIssueModalOpen} />
      )}
    </div>
  );
};
