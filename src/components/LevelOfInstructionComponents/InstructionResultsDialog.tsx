import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LevelOfInstructionSummaryChart from './ResultsComponents/LevelOfInstructionSummaryChart';
import {connect} from 'react-redux';
import { clearTeacher } from "../../state/actions/teacher";
import { emptyLoiStack } from "../../state/actions/level-of-instruction";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as Constants from '../../constants';

const InstructionTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.LI
    }
  }
});

interface Props {
  open: boolean,
  history: {
    push(pathname: string): void
  },
  clearTeacher(): void,
  instructionStack: Array<{timestamp: number, observation: string}>,
  emptyLoiStack(): void
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function InstructionResultsDialog(props: Props): React.ReactElement {
  const {open, history, clearTeacher, instructionStack, emptyLoiStack} = props;
  let basicSkillsResponses = 0;
  let inferentialResponses = 0;
  let i = 0;
  for (i; i<instructionStack.length; i++) {
    if (instructionStack[i].observation === 'lowLevel' || instructionStack[i].observation === 'specificSkill'){
      basicSkillsResponses++;
    } else {
      inferentialResponses++;
    }
  }
  return (
    <div>
      <Dialog
        open={open}
        disableBackdropClick
      >
        <DialogTitle style={{fontFamily: 'Arimo'}}>
          Results Preview
        </DialogTitle>
        <DialogContent>
          <LevelOfInstructionSummaryChart
            basicSkillsResponses={basicSkillsResponses}
            inferentialResponses={inferentialResponses}
          />
        </DialogContent>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingBottom: '1em'}}>
          <Grid item>
            <MuiThemeProvider theme={InstructionTheme}>
              <Button
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  clearTeacher();
                  emptyLoiStack();
                  history.push('/Home');
                }}
              >
                Return Home
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={InstructionTheme}>
              <Button
                color="primary"
                variant="contained"
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  history.push("/LevelOfInstructionResults");
                  emptyLoiStack();
                }}
              >
                View Results
              </Button>
            </MuiThemeProvider>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    instructionStack: state.instructionStackState.instructionStack,
  };
};

export default connect(mapStateToProps, {clearTeacher, emptyLoiStack})(InstructionResultsDialog);