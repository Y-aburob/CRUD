import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import ButtonComponent from './ButtonComponent';

type DialogComponentProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  actions: {
    cancelText: string;
    cancelAction: () => void;
    confirmText: string;
    confirmAction: () => void;
  };
};

const DialogComponent = ({
  open,
  onClose,
  title,
  children,
  actions,
}: DialogComponentProps) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { maxWidth: '400px', width: '100%' } }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        <ButtonComponent content={actions.cancelText} onClick={actions.cancelAction} color="error" />
        <ButtonComponent
          content={actions.confirmText}
          onClick={actions.confirmAction}
          variant="contained"
          color="primary"
        />
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
