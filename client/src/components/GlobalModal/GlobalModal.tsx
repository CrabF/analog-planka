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
  useCreateNewTaskMutation,
  useGetAllboardsQuery,
  useGetAllTasksQuery,
  useGetAllUsersInfoQuery,
  useGetTaskInfoQuery,
  useUpdateTaskInfoMutation,
} from "@/api/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { Priority, Status } from "@/api/types";

interface GlobalModalProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalModal: FC<GlobalModalProps> = ({ open, onClose }) => {
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
  const [selectedAssigneeId, setSelectedAssigneeId] = useState<string[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState<string[]>([]);
  const { data: allBoards } = useGetAllboardsQuery();

  const { data: usersInfo } = useGetAllUsersInfoQuery();

  const [create, { isLoading: isCreateLoading }] = useCreateNewTaskMutation();
  const [update, { isLoading: isUpdLoading }] = useUpdateTaskInfoMutation();

  const modalType = modalInfo ? "Редактирование" : "Создание";
  const modalTypeBtn = modalInfo ? "Обновить" : "Создать";

  const handleSumbitCreate = () => {
    create({
      title: titleInputValue,
      assigneeId: Number(selectedAssigneeId[0]),
      boardId: Number(selectedBoardId),
      description: descriptionValue,
      priority: priorityValue[0] as Priority,
    }).then(() => {
      handleCloseModal();
    });
  };

  const handleSubmitUpd = () => {
    if (modalInfo) {
      update({
        updatedTask: {
          title: titleInputValue,
          assigneeId: Number(selectedAssigneeId[0]),
          boardId: Number(selectedBoardId),
          description: descriptionValue,
          priority: priorityValue[0] as Priority,
          status: status[0] as Status,
        },
        taskId: modalInfo?.data.id,
      }).then(() => {
        handleCloseModal();
      });
    }
  };

  useEffect(() => {
    setCardId(searchParams.get("card"));

    if (modalInfo) {
      setTitleInputValue(modalInfo.data.title);
      setDescriptionValue(modalInfo.data.description);
      setPriorityValue([modalInfo.data.priority]);
      setStatus([modalInfo.data.status]);
      setSelectedAssigneeId([modalInfo.data.assignee.id.toString()]);
      setSelectedBoardId([modalInfo.data.boardId.toString()]);
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
            label="Название"
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
            onUpdate={setDescriptionValue}
          ></TextArea>

          <Select
            label="Проект"
            disabled={location.pathname.includes("board")}
            value={selectedBoardId}
            onUpdate={setSelectedBoardId}
            size="xl"
          >
            {allBoards?.data.map((item) => {
              return (
                <Select.Option key={item.id} value={item.id.toString()}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>

          <Select
            label="Приоритет"
            value={priorityValue}
            onUpdate={setPriorityValue}
            size="xl"
          >
            <Select.Option value="Low">Low</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="High">High</Select.Option>
          </Select>

          <Select label="Статус" value={status} onUpdate={setStatus} size="xl">
            <Select.Option value="Backlog">To do</Select.Option>
            <Select.Option value="InProgress">In progress</Select.Option>
            <Select.Option value="Done">Done</Select.Option>
          </Select>

          <Select
            label="Исполнитель"
            value={selectedAssigneeId}
            onUpdate={setSelectedAssigneeId}
            size="xl"
          >
            {usersInfo?.data.map((item) => {
              return (
                <Select.Option key={item.id} value={item.id.toString()}>
                  {item.fullName}
                </Select.Option>
              );
            })}
          </Select>
          {!location.pathname.includes("board") && cardId && (
            <Button
              onClick={() => {
                navigate(`/board/${selectedBoardId}?card=${cardId}`);
              }}
              size="xl"
            >
              Перейти на доску
            </Button>
          )}
          <Button
            loading={isUpdLoading || isCreateLoading}
            onClick={cardId ? handleSubmitUpd : handleSumbitCreate}
            size="xl"
          >
            {modalTypeBtn}
          </Button>
        </Card>
      </Modal>
    </Portal>
  );
};
