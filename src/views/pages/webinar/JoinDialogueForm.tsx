import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'

interface WebinarFormProps {
  open: boolean;
  onClose: (value: boolean) => void;
}

const WebinarForm: React.FC<WebinarFormProps> = ({ open, onClose }) => {
    return (
      <Dialog open={open} onClose={() => onClose(false)}>
        <DialogTitle>Webinar Confirmation</DialogTitle>
        <DialogContent>
          <IconButton
              size='small'
              onClick={() => {
                onClose(false)
              }}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
            <Icon icon='mdi:close' />
          </IconButton>
          <p>Are you sure you want to join the webinar?</p>
        </DialogContent>
      </Dialog>
    );
};

export default WebinarForm;
