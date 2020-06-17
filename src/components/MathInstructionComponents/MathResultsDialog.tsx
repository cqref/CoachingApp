import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ChildPieSummary from './ResultsComponents/ChildPieSummary';
import {connect} from 'react-redux';
import { clearTeacher } from "../../state/actions/teacher.ts";
import { deleteMICenters, clearMathCount } from "../../state/actions/math-instruction.ts";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as Constants from '../../constants';

const MathTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.MI
    }
  }
});

interface Props {
  open: boolean,
  history: {
    push(pathname: string): void
  },
  clearTeacher(): void,
  mathCount: number,
  noMathCount: number,
  clearMathCount(): void,
  deleteMICenters(): void
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function MathResultsDialog(props: Props): React.ReactElement {
  const {
    open,
    history,
    clearTeacher,
    mathCount,
    noMathCount,
    clearMathCount,
    deleteMICenters
  } = props;

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
          <ChildPieSummary math={mathCount} notMath={noMathCount} />
        </DialogContent>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingBottom: '1em'}}>
          <Grid item>
            <MuiThemeProvider theme={MathTheme}>
              <Button
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  clearTeacher();
                  clearMathCount();
                  deleteMICenters();
                  history.push('/Home');
                }}
              >
                Return Home
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={MathTheme}>
              <Button
                color="primary"
                variant="contained"
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  history.push("/MathInstructionResults");
                  clearMathCount();
                  deleteMICenters();
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
    mathCount: state.mathCountState.mathCount,
    noMathCount: state.mathCountState.noMathCount
  };
};

export default connect(mapStateToProps, {clearTeacher, deleteMICenters, clearMathCount})(MathResultsDialog);