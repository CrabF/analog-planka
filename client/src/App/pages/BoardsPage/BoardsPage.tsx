import { Card, Text, Button, Label } from "@gravity-ui/uikit";
import styles from "./BoardsPage.module.css";
import { useGetAllboardsQuery } from "@/api/api";
import { useNavigate } from "react-router";

export const BoardsPage = () => {
  const { data: boards } = useGetAllboardsQuery();
  const navigate = useNavigate();

  const handleBoardClick = (id: string) => {
    navigate(`/board/${id}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.boardsContainer}>
        <div className={styles.boards}>
          {boards?.data.map((item) => {
            return (
              <Card
                className={styles.board}
                size="m"
                view="outlined"
                type="container"
                key={item.id}
              >
                <div className={styles.txtContainer}>
                  <Text variant="header-2">{item.name}</Text>
                  <Text variant="subheader-3">{item.description}</Text>
                </div>
                <div className={styles.btnContainer}>
                  <Label className={styles.label} size="m" theme="info">
                    <Text variant="code-2">{`Количество задач: ${item.taskCount}`}</Text>
                  </Label>
                  <Button
                    onClick={() => {
                      handleBoardClick(item.id.toString());
                    }}
                    view="normal"
                    size="xl"
                  >
                    <Text variant="subheader-2">Перейти к доске</Text>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
