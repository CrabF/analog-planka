import { Link, Outlet } from "react-router";
import styles from "./Layout.module.css";
import {
  TabProvider,
  TabList,
  Tab,
  TabPanel,
  Button,
  Modal,
  Portal,
} from "@gravity-ui/uikit";
import { useState } from "react";

export const Layout = () => {
  const [activeTab, setActiveTab] = useState<string>("tasks");
  const [open, setOpen] = useState(false);

  const handleClickTab = (val: string) => {
    setActiveTab(val);
  };

  const handleClickBtn = () => {
    setOpen(!open);
  };

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
              <Tab value="projects">Проекты</Tab>
            </Link>
          </TabList>
          <div>
            <TabPanel value="first">First Panel</TabPanel>
            <TabPanel value="second">Second Panel</TabPanel>
            <TabPanel value="third">Third Panel</TabPanel>
          </div>
        </TabProvider>
        <Button onClick={handleClickBtn} view="action" size="xl">
          Создать задачу
        </Button>
        <Portal>
          <Modal open={open} onClose={handleClickBtn}>
            content
          </Modal>
        </Portal>
      </div>
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
};
