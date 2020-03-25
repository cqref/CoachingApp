import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from '@material-ui/core/Typography';
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";

/**
 * specifies styling for modal
 * @return {CSSProperties}
 */
function getModalStyle(): React.CSSProperties {
  return {
    position: "fixed",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  } as React.CSSProperties;
}

const styles: object = {
  paper: {
    position: "absolute",
    width: "50%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  }
};

interface Props {
  classes: Style,
  open: boolean,
  handleClose(): void,
  history: {
    push(param: {pathname: string, state: {type: string}}): void
  }
}

interface Style {
  paper: string
}

/**
 * reminders for transition time observation
 * @param {Props} props 
 * @return {ReactElement}
 */
function LockedModal(props: Props): React.ReactElement {
  const { classes, open, handleClose } = props;
  return (
    <div>
      <Modal open={open}>
        <div style={getModalStyle()} className={classes.paper}>
          <Grid
            xs={12}
            container
            alignItems="center"
            direction="row"
            justify="flex-end"
          >
            <IconButton style={{ padding: 10 }}>
              <Tooltip title={"Close"} placement={"right"}>
                <CloseIcon onClick={handleClose} />
              </Tooltip>
            </IconButton>
          </Grid>
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="flex-start"
          >
            <Grid item>
              <Typography variant="h5">
                You have not unlocked this tool yet.
              </Typography>
              <Typography variant="h6">
                Please complete the Training or choose another tool.
              </Typography>
            </Grid>
            <Grid item style={{paddingTop: '2em'}}>
              <Button 
                onClick={(): void => {
                  props.history.push({
                    pathname: "/Magic8Menu",
                    state: { type: "Training" }
                  });
                  handleClose();
                }}
                variant="contained"
                color="primary"
              >
                GO TO TRAINING
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  )
}

LockedModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(LockedModal));