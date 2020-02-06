import * as React from "react";
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import AppBar from "../../../components/AppBar";
import Notes from "../../../components/Notes";
import { connect } from "react-redux";
import { toggleLOISettingType } from "../../../state/actions/level-of-instruction";
import LOISettingTypeSel from "./LOISettingTypeSel";
import Dashboard from "../../../components/Dashboard";

const styles: object = {
  root: {
    flexGrow: 1,
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    overflowY: 'auto',
    overflowX: 'hidden'
  },
};

interface Props {
  classes: { root: string },
  location: { state: { teacher: { id: string }}}
};

interface State {
  auth: boolean,
  help: boolean,
  notes: boolean,
  recs: boolean,
  settingType: string,
  open: boolean};

/**
 * transition time observation tool
 * @class LevelOfInstructionPage
 */
class LevelOfInstructionPage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      auth: true,
      help: false,
      notes: false,
      recs: true,
      settingType: null,
      open: false
    };

    // this.handleTransitionType = this.handleTransitionType.bind(this);
  }

  /**
   * @param {string} type
   */
  handleLOISettingType = (type: string): void => {

    this.setState({ settingType: type });
  };

  /**
   * @param {boolean} open
   */
  handleRecsModal = (open: boolean): void => {
    if (open) {
      this.setState({ recs: true });
    } else {
      this.setState({ recs: false });
    }
  };

  handleEndTransition = (): void => {
    this.setState({ settingType: null });
  };

  /**
   * @param {boolean} open
   */
  handleNotes = (open: boolean): void => {
    if (open) {
      this.setState({ notes: true });
    } else {
      this.setState({ notes: false });
    }
  };

  handleClickAwayHelp = (): void => {
    this.setState({ help: false });
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.exact({ state: PropTypes.exact({ teacher: PropTypes.exact({ id: PropTypes.string})})}).isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: object) => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>

        <main style={{ flex: 1 }}>
          <Grid container spacing={16} alignItems="center">
            <Grid item xs={3}>
              <Grid   container alignItems={"center"}  justify={"center"} direction={"column"} >
                <Dashboard
				          magic8="Level Of Instruction"
                  color="#009365"
                  completeObservation={true}
                />
              </Grid>
            </Grid>
            <Grid item xs={9} justify="center">
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
              > 
              <FirebaseContext.Consumer>
                 {(firebase: object) =>
                <LOISettingTypeSel
                  teacherId={this.props.location.state.teacher.id}
                  firebase={firebase}
                  settingType={this.state.settingType}
                />
                 }
                 </FirebaseContext.Consumer>

              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
   }
}

export default connect(null,toggleLOISettingType)(
  withStyles(styles)(LevelOfInstructionPage)
);