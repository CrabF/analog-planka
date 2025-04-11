import { Modal, Portal } from "@gravity-ui/uikit";
import styles from "./IssueModal.module.css";
import { FC } from "react";

interface IssueModalProps {
  issueModalOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IssueModal: FC<IssueModalProps> = ({
  issueModalOpen,
  onClose,
}) => {
  const handleCloseModal = () => {
    onClose(!issueModalOpen);
  };
  return (
    <Portal>
      <Modal open={issueModalOpen} onClose={handleCloseModal}>
        modal
      </Modal>
    </Portal>
  );
};
