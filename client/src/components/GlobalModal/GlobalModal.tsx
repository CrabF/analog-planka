import {
  Card,
  Modal,
  Portal,
  TextInput,
  Text,
  TextArea,
  Select,
  Button,
} from "@gravity-ui/uikit";
import styles from "./GlobalModal.module.css";
import { FC, useEffect, useState } from "react";
import { Xmark } from "@gravity-ui/icons";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import {
  useGetAllboardsQuery,
  useGetAllTasksQuery,
  useGetTaskInfoQuery,
} from "@/api/api";
import { skipToken } from "@reduxjs/toolkit/query";

interface GlobalModalProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalModal: FC<GlobalModalProps> = ({
  open,
  onClose,
}) => {
  const { data: tasks } = useGetAllTasksQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [cardId, setCardId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { data: modalInfo } = useGetTaskInfoQuery(cardId ?? skipToken);
  const [titleInputValue, setTitleInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [priorityValue, setPriorityValue] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [assigneeList, setAssigneeList] = useState<string[]>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<string[]>([]);
  const [boardsNames, setBoardsNames] = useState<string[]>([]);
  const [selectedBoardName, setSelectedBoardName] = useState<string[]>([]);
  const [boardLink, setBoardLink] = useState("");
  const { data: allBoards } = useGetAllboardsQuery();

  const modalType = modalInfo ? "Редактирование" : "Создание";
  const modalTypeBtn = modalInfo ? "Обновить" : "Создать";

  useEffect(() => {
    setCardId(searchParams.get("card"));
    if (allBoards && modalInfo) {
      const board = allBoards?.data.find((board) => {
        return board.name === modalInfo?.data.boardName;
      });
      if (board) {
        setBoardLink(board.id.toString());
      }
    }

    if (modalInfo) {
      setTitleInputValue(modalInfo.data.title);
      setDescriptionValue(modalInfo.data.description);
      setPriorityValue([modalInfo.data.priority]);
      setStatus([modalInfo.data.status]);
    }

    if (tasks) {
      const boardsNames = tasks?.data
        .map((item) => {
          return item.boardName;
        })
        .filter((item, index, arr) => {
          return (
            arr.findIndex((i) => {
              return i === item;
            }) === index
          );
        });
      setBoardsNames(boardsNames);
      setSelectedBoardName(
        boardsNames.filter((item) => {
          return modalInfo?.data.boardName === item;
        })
      );

      const assigneeList = tasks?.data
        .map((item) => {
          return item.assignee.fullName;
        })
        .filter((item, index, arr) => {
          return (
            arr.findIndex((i) => {
              return i === item;
            }) === index
          );
        });

      setAssigneeList(assigneeList);
      setSelectedAssignee(
        assigneeList.filter((item) => {
          return modalInfo?.data.assignee.fullName === item;
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalInfo, tasks, allBoards, cardId]);

  const handleCloseModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("card");
    setSearchParams(newParams);
    onClose(!open);
  };

  const handleInputChange = (value: string) => {
    setTitleInputValue(value);
  };

  return (
    <Portal>
      <Modal open={open} onClose={handleCloseModal}>
        <Card className={styles.modal}>
          <div className={styles.titleTxt}>
            <Text variant="header-2">{modalType} задачи</Text>
            <Xmark onClick={handleCloseModal} className={styles.icon} />
          </div>

          <TextInput
            size="xl"
            type="text"
            view="normal"
            placeholder="Название"
            value={titleInputValue}
            onChange={(e) => {
              handleInputChange(e.target.value);
            }}
          ></TextInput>

          <TextArea
            minRows={4}
            maxRows={4}
            placeholder="Описание"
            size="xl"
            value={descriptionValue}
          ></TextArea>

          <Select
            placeholder={"Проект"}
            disabled={location.pathname.includes("board")}
            value={selectedBoardName}
            onUpdate={setSelectedBoardName}
            size="xl"
          >
            {boardsNames.map((item) => {
              return (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>

          <Select
            placeholder={"Приоритет"}
            value={priorityValue}
            onUpdate={setPriorityValue}
            size="xl"
          >
            <Select.Option value="Low">Low</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="High">High</Select.Option>
          </Select>

          <Select
            placeholder={"Статус"}
            value={status}
            onUpdate={setStatus}
            size="xl"
          >
            <Select.Option value="Backlog">To do</Select.Option>
            <Select.Option value="InProgress">In progress</Select.Option>
            <Select.Option value="Done">Done</Select.Option>
          </Select>

          <Select
            placeholder={"Исполнитель"}
            value={selectedAssignee}
            onUpdate={setSelectedAssignee}
            size="xl"
          >
            {assigneeList.map((item) => {
              return (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
          {!location.pathname.includes("board") && cardId && (
            <Button
              onClick={() => {
                navigate(`/board/${boardLink}`);
              }}
              size="xl"
            >
              Перейти на доску
            </Button>
          )}
          <Button size="xl">{modalTypeBtn}</Button>
        </Card>
      </Modal>
    </Portal>
  );
};
