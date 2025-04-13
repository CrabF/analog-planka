import { Link, Outlet, useLocation } from "react-router";
import styles from "./Layout.module.css";
import { TabProvider, TabList, Tab, Button } from "@gravity-ui/uikit";
import { useEffect, useState } from "react";
import { GlobalModal } from "components/GlobalModal";

export const Layout = () => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleClickTab = (val: string) => {
    setActiveTab(val);
  };

  const handleClickBtn = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const tabName = location.pathname.includes("issues");
    if (tabName) {
      setActiveTab("tasks");
    } else {
      setActiveTab("boards");
    }
  }, [location]);

  return (
    <>
      <div className={styles.header}>
        <TabProvider
          value={activeTab}
          onUpdate={(value) => handleClickTab(value)}
        >
          <TabList className={styles.tabList} size="xl">
            <Link className={styles.link} to={"/issues"}>
              <Tab value="tasks">Все задачи</Tab>
            </Link>
            <Link className={styles.link} to={"/boards"}>
              <Tab value="boards">Проекты</Tab>
            </Link>
          </TabList>
        </TabProvider>
        <Button onClick={handleClickBtn} view="action" size="xl">
          Создать задачу
        </Button>
        <GlobalModal open={open} onClose={handleClickBtn} />
      </div>
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
};
