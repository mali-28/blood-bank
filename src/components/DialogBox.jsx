import React , { useContext }from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { loginContext } from "../context/context";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

 const DialogBox = ({onClose, open, id, ...props}) =>{
    const {removeItem} = useContext(loginContext);


    const agree = () => {
      removeItem(id);
      onClose();
      
    }
  

  return (
    <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={onClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{<h3 className="f-family-monospace red">Alert!!</h3>}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Do you want to delete your detail?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
           
            <Button onClick={onClose} color="primary">
              No
            </Button>

            <Button onClick={agree} color="primary">

              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
export default DialogBox;