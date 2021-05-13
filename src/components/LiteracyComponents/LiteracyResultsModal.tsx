import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import * as PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import { Tooltip, Collapse, Card, Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import LiteracyTypeCard from './LiteracyTypeCard';
import * as Constants from '../../constants/Constants';

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
  
const useStyles = makeStyles({
  root: {
    backgroundColor: '#ffffff'
  },
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  },
});

interface Props {
  handleBegin(checklistType: number | string): void,
  handleClose(): void,
  open: boolean,
  tool: string
}

enum LiteracyTypes {
  NONE = 0,
  FOUNDATIONAL = 1,
  WRITING = 2,
  READING = 3,
  LANGUAGE = 4
}

/**
 * Modal to confirm view results
 * @function LiteracyResultsModal
 * @param {Props} props
 * @return {ReactElement}
 */
function LiteracyResultsModal(props: Props): React.ReactElement {
  const { handleBegin, handleClose, open } = props;
  const [literacyType, setLiteracyType] = useState(0);
  const classes = useStyles();
  return (
    <div>
      <Modal open={open}>
        <div style={getModalStyle()} className={classes.paper}>
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="flex-start"
            className={classes.root}
          >
            <Grid item style={{width: '100%'}}>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="flex-end"
                style={{width: '100%'}}
              >
                <Grid item xs={1} />
                <Grid item xs={10}>
                  <Typography variant="h4" align="center" style={{fontFamily: 'Arimo'}}>
                    Literacy Instruction Results
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Grid
                    container
                    alignItems="center"
                    direction="row"
                    justify="flex-end"
                  >
                    <IconButton style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', padding: 10 }}>
                      <Tooltip title={"Close"} placement={"right"}>
                        <CloseIcon onClick={handleClose} />
                      </Tooltip>
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{paddingTop: '1em'}}>
              <Grid container direction="column" justify="center" alignItems="center">
                <LiteracyTypeCard
                  type={LiteracyTypes.FOUNDATIONAL}
                  literacyType={literacyType}
                  setLiteracyType={setLiteracyType}
                  title="Foundational Skills"
                  descriptionText="Observe lessons and activities designed to foster children’s phonological
                  awareness and develop their knowledge of the alphabetic principle and
                  print concepts."
                />
                <LiteracyTypeCard
                  type={LiteracyTypes.WRITING}
                  literacyType={literacyType}
                  setLiteracyType={setLiteracyType}
                  title="Writing"
                  descriptionText="Observe lessons and activities designed to engage children in emergent writing."
                />
                <LiteracyTypeCard
                  type={LiteracyTypes.READING}
                  literacyType={literacyType}
                  setLiteracyType={setLiteracyType}
                  title="Book Reading"
                  descriptionText={<div>
                    Observe interactive book readings that support children&apos;s vocabulary
                    and content knowledge, text comprehension, and speaking/listening skills.
                    <i>To observe shared book readings focusing on print concepts,
                    select the Foundational Skills tool.</i>
                  </div>}
                />
                <LiteracyTypeCard
                  type={LiteracyTypes.LANGUAGE}
                  literacyType={literacyType}
                  setLiteracyType={setLiteracyType}
                  title="Language Environment"
                  descriptionText="Observe responsive and content-rich teacher-child interactions
                  that promote children's language development."
                />
              </Grid>
            </Grid>
            <Grid item style={{paddingTop: '2em'}}>
              <Button disabled={literacyType===0} onClick={(): void => {handleBegin(literacyType)}} variant="contained" color="primary">
                VIEW RESULTS
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}

LiteracyResultsModal.propTypes = {
  handleBegin: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  tool: PropTypes.string.isRequired
}

export default LiteracyResultsModal;