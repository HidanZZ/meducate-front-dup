import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'


const WebinarForm = ({ open, onClose }) => {
    return (
      <Dialog open={open} onClose={() => onClose(false)}>
        <DialogTitle>Webinar Confirmation</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to join the webinar?</p>
        </DialogContent>
      </Dialog>
    );
};

export default WebinarForm;
