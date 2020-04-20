import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InfoIcon from '@material-ui/icons/Info';
import EditImage from '../assets/images/EditImage.svg';
import SaveImage from '../assets/images/SaveImage.svg';
import CloseImage from '../assets/images/CloseImage.svg';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as moment from 'moment';

const styles: object = {
  textField: {
    borderRadius: '0.5em',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
}

interface Teacher {
  email: string,
  firstName: string,
  lastName: string,
  notes: string,
  id: string,
  phone: string,
  role: string,
  school: string
};

interface Props {
  classes: Style,
  teacher: Teacher,
  magic8: string,
  firebase: {
    createActionPlan(teacherId: string, sessionId: string, magic8: string): Promise<void>,
    getActionPlan(sessionId: string): Promise<Array<{id: string, goal: string, benefit: string}>>,
    getActionSteps(actionPlanId: string): Promise<Array<{step: string, materials: string, person: string, timeline: string}>>,
    saveActionPlan(actionPlanId: string, goal: string, benefit: string): Promise<void>,
    saveActionStep(actionPlanId: string, index: string, step: string, materials: string, person: string, timeline: string): Promise<void>,
    createActionStep(actionPlanId: string, index: string): Promise<void>,
    getCoachFirstName(): Promise<string>,
    getCoachLastName(): Promise<string>
  },
  sessionId: string,
  readOnly: boolean,
  handleEditActionPlan(): void,
  handleClose?(): void,
  actionPlanExists: boolean,
  editMode: boolean,
}

interface State {
  goal: string,
  benefit: string,
  date: Date,
  actionSteps: string,
  actionStepsArray: Array<{step: string, materials: string, person: string, timeline: string}>,
  editMode: boolean,
  actionPlanExists: boolean,
  actionPlanId: string,
  coachFirstName: string,
  coachLastName: string,
  createMode: boolean,
  saved: boolean,
  saveModal: boolean
}

interface Style {
  textField: string
}


/**
 * Form for user to complete action plan
 * @class ActionPlanForm
 */
class ActionPlanForm extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      goal: '',
      benefit: '',
      date: new Date(),
      actionSteps: '',
      actionStepsArray: [{step: '', materials: '', person: '', timeline: ''}],
      editMode: false,
      actionPlanExists: this.props.actionPlanExists,
      actionPlanId: '',
      coachFirstName: '',
      coachLastName: '',
      createMode: false,
      saved: true,
      saveModal: false
    }
  }

  handleAddActionStep = (): void => {
    this.setState({
      actionStepsArray: [...this.state.actionStepsArray, {step: '', materials: '', person: '', timeline: ''}]
    }, () => {
      this.props.firebase.createActionStep(this.state.actionPlanId, (this.state.actionStepsArray.length-1).toString());
    })
  }

  /**
   * responds to change in user-entered text
   * @param {string} name
   * @param {event} event
   * @return {void}
   */
  handleChange = (name: string) => (event): void => {
    this.setState({
      [name]: event.target.value,
      saved: false
    });
  };

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangeActionStep = (number: number) => (event): void => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].step = event.target.value;
    this.setState({
      actionStepsArray: newArray,
      saved: false
    });
  }

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangeMaterials = (number: number) => (event): void => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].materials = event.target.value;
    this.setState({
      actionStepsArray: newArray,
      saved: false
    });
  }

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangePerson = (number: number) => (event): void => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].person = event.target.value;
    this.setState({
      actionStepsArray: newArray,
      saved: false
    });
  }

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangeTimeline = (number: number) => (event): void => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].timeline = event.target.value;
    this.setState({
      actionStepsArray: newArray,
      saved: false
    });
  }

  handleCreate = (): void => {
    this.props.firebase.createActionPlan(this.props.teacher.id, this.props.sessionId, this.props.magic8)
      .then(() => {
        this.setState({
          editMode: true,
          actionPlanExists: true,
          createMode: true
        });
        this.getActionPlan();
      })
      .catch(() => {
        console.log('error creating action plan')
      })
  }

  getActionPlan = (): void => {
    this.props.firebase.getActionPlan(this.props.sessionId)
    .then((actionPlanData: Array<{id: string, goal: string, benefit: string, date: {seconds: number, nanoseconds: number}}>) => {
      if (actionPlanData[0]) {
        const newDate = new Date(0);
        newDate.setUTCSeconds(actionPlanData[0].date.seconds);
        this.setState({
          actionPlanExists: true,
          actionPlanId: actionPlanData[0].id,
          goal: actionPlanData[0].goal,
          benefit: actionPlanData[0].benefit,
          date: newDate
        });
        const newActionStepsArray: Array<{step: string, materials: string, person: string, timeline: string}> = [];
        this.props.firebase.getActionSteps(actionPlanData[0].id).then((actionStepsData: Array<{step: string, materials: string, person: string, timeline: string}>) => {
          actionStepsData.forEach((value, index) => {
            newActionStepsArray[index] = {step: value.step, materials: value.materials, person: value.person, timeline: value.timeline};
          })
        }).then(() => {
          this.setState({
            actionStepsArray: newActionStepsArray
          }, () => {console.log('action steps array: ', this.state.actionStepsArray)});
        })
        .catch(() => {
          console.log('error retrieving action steps');
        });
      } else {
        this.setState({
          actionPlanExists: false,
          actionPlanId: '',
          goal: '',
          benefit: '',
          actionStepsArray: [{step: '', materials: '', person: '', timeline: ''}]
        }, () => {console.log('action plan exists? ', this.state.actionPlanExists)})
      }
     })
  }

  /**
   * saves action plan by updating Cloud Firestore records
   * @return {void}
   */
  handleSave = (): void => {
    this.props.firebase.saveActionPlan(this.state.actionPlanId, this.state.goal, this.state.benefit).then(() => {
      console.log("action plan saved");
    })
    .catch(() => {
      console.log("error with saving action plan");
    })
    this.state.actionStepsArray.forEach((value, index) => {
      this.props.firebase.saveActionStep(this.state.actionPlanId, index.toString(), value.step, value.materials, value.person, value.timeline)
        .then(() => {
          console.log("action step ", index, " saved");
          this.setState({ saved: true })
        })
        .catch(() => {
          console.log("error in saving action step ", index);
        })
    })
  }

  /**
   * saves action plan, action steps, and closes the action plan modal
   * @return {void}
   */
  handleSaveAndClose = (): void => {
    this.setState({
      saveModal: false
    }, () => {
      this.handleSave();
      this.props.handleClose();
    })
  }

  handleClose = (): void => {
    if (this.state.saved) {
      this.props.handleClose();
    } else {
      this.setState({
        saveModal: true
      })
    }
  }

  handleCloseWithoutSave = (): void => {
    this.setState({
      saveModal: false
    }, () => {this.props.handleClose()})
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    this.getActionPlan();
    this.props.firebase.getCoachFirstName().then((name: string) => {
      this.setState({ coachFirstName: name })
    })
    this.props.firebase.getCoachLastName().then((name: string) => {
      this.setState({ coachLastName: name })
    })
  }

  /** 
   * lifecycle method invoked after component updates 
   * @param {Props} prevProps
   * @param {State} prevState
   */
  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (this.props.sessionId !== prevProps.sessionId) {
      this.getActionPlan();
      this.setState({
        createMode: false
      })
    }
    if (this.props.editMode != prevProps.editMode) {
      this.getActionPlan();
    }
    if (this.state.actionPlanExists != prevState.actionPlanExists) {
      this.getActionPlan();
    }
  }

  static propTypes = {
    teacherFirstName: PropTypes.string.isRequired,
    teacherLastName: PropTypes.string.isRequired,
    firebase: PropTypes.exact({
      createActionPlan: PropTypes.func,
      getActionPlan: PropTypes.func,
      getActionSteps: PropTypes.func,
      saveActionPlan: PropTypes.func,
      saveActionStep: PropTypes.func,
      createActionStep: PropTypes.func,
      getCoachFirstName: PropTypes.func,
      getCoachLastName: PropTypes.func
    }).isRequired,
    teacherId: PropTypes.string.isRequired,
    sessionId: PropTypes.string.isRequired,
    readOnly: PropTypes.bool.isRequired,
    handleEditActionPlan: PropTypes.func.isRequired,
    handleClose: PropTypes.func,
    actionPlanExists: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div>
        {this.props.actionPlanExists || this.state.createMode ? 
          (this.state.saveModal && !this.state.saved) ? (
            <Dialog
              open={this.state.saveModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" style={{fontFamily: 'Arimo'}}>
                Do you want to save the action plan before closing?
              </DialogTitle>
              <DialogActions>
                <Button onClick={this.handleCloseWithoutSave} color="primary" style={{fontFamily: 'Arimo'}}>
                  Close without saving
                </Button>
                <Button onClick={this.handleSaveAndClose} color="primary" style={{fontFamily: 'Arimo'}} autoFocus>
                  Save & Close
                </Button>
              </DialogActions>
            </Dialog>
          ) :
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{width: '100%'}}
          >
            <Grid item style={{width: '100%'}}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                style={{width: '100%'}}
              >
                <Grid item xs={9}>
                  <Typography variant="h4" style={{fontFamily: "Arimo"}}>
                    ACTION PLAN
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Button disabled={!this.props.handleEditActionPlan} onClick={this.props.handleEditActionPlan}>
                    <img alt="Edit" src={EditImage} style={{width: '100%'}}/>
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button onClick={this.handleSave}>
                    <img alt="Save" src={SaveImage} style={{width: '100%'}}/>
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button onClick={this.handleClose}>
                    <img alt="Close" src={CloseImage} style={{width: '95%'}}/>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{width: '100%'}}>
              <Grid
                container
                direction="row"
                justify="space-between"
                style={{fontFamily: 'Arimo'}}
              >
                <Grid item xs={4}>
                  {this.props.teacher.firstName + " " + this.props.teacher.lastName}
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction="row" justify="center">
                    {this.state.coachFirstName + " " + this.state.coachLastName}
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction="row" justify="flex-end">
                    {moment(this.state.date).format('MM/DD/YYYY')}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{width: "100%", paddingTop: '0.4em', paddingBottom: '0.8em'}}>
              <Grid container direction="row" justify="space-between" style={{height: '100%'}}>
                <Grid item xs={12} style={{border: '2px solid #094492', borderRadius: '0.5em', height: '100%'}}>
                  <Grid container direction="column" style={{width: '100%'}}>
                    <Grid item>
                      <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                        <Grid item xs={11}>
                          <Typography style={{fontSize: '1.2em', fontFamily: 'Arimo', marginLeft: '0.3em', marginTop: '0.3em', color: '#a9a9a9'}}>
                            Teacher Goal
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Grid container justify="flex-end" direction="row" alignItems="center">
                            <Grid item>
                              <InfoIcon style={{ fill: "#094492", marginRight: '0.3em', marginTop: '0.3em' }} />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <TextField
                        id="goal"
                        name="goal"
                        type="text"
                        value={this.state.goal}
                        onChange={this.handleChange('goal')}
                        margin="normal"
                        variant="standard"
                        fullWidth
                        multiline
                        rowsMax={3}
                        rows={3}
                        className={classes.textField}
                        InputProps={{
                          disableUnderline: true,
                          readOnly: this.props.readOnly,
                          style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                        }}
                        style={{marginTop: 0, paddingTop: '0.5em', paddingBottom: '0.5em', marginBottom: 0}}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{width: "100%", paddingBottom: '0.8em'}}>
              <Grid container direction="row" justify="space-between" style={{height: '100%'}}>
                <Grid item xs={12} style={{border: '2px solid #e99c2e', borderRadius: '0.5em', height: '100%'}}>
                  <Grid container direction="column" style={{width: '100%'}}>
                    <Grid item>
                      <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                        <Grid item xs={11}>
                          <Typography style={{fontSize: '1.2em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', color: '#a9a9a9'}}>
                            Benefit for Students
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Grid container justify="flex-end" direction="row" alignItems="center">
                            <Grid item>
                              <InfoIcon style={{ fill: "#e99c2e", marginRight: '0.3em', marginTop: '0.3em' }} />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <TextField
                        id="benefit"
                        name="benefit"
                        type="text"
                        value={this.state.benefit}
                        onChange={this.handleChange('benefit')}
                        margin="normal"
                        variant="standard"
                        fullWidth
                        multiline
                        rowsMax={2}
                        rows={2}
                        className={classes.textField}
                        InputProps={{
                          disableUnderline: true,
                          readOnly: this.props.readOnly,
                          style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                        }}
                        style={{marginTop: 0, paddingTop: '0.5em', paddingBottom: '0.5em', marginBottom: 0}}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{width: '100%', height: '36vh'}}>
              <Grid container direction="row" justify="space-between" style={{height: '100%'}}>
                <Grid item style={{width: '42%', border: '2px solid #0988ec', borderRadius: '0.5em', height: '100%', overflow: 'auto'}}>
                  <Grid container direction="column" style={{width: '100%'}}>
                    <Grid item>
                      <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                        <Grid item xs={11}>
                          <Typography style={{fontSize: '1.2em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', color: '#a9a9a9'}}>
                            Action Steps
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Grid container justify="flex-end" direction="row" alignItems="center">
                            <Grid item>
                              <InfoIcon style={{ fill: "#0988ec", marginRight: '0.3em', marginTop: '0.3em' }} />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <ul style={{paddingLeft: '1.5em', marginTop: '0.5em', marginBottom: 0}}>
                      {this.state.actionStepsArray.map((value, index) => {
                        return(
                          <li key={index}>
                            <TextField
                              id={"actionSteps" + index.toString()}
                              name={"actionSteps" + index.toString()}
                              type="text"
                              value={value.step}
                              onChange={this.handleChangeActionStep(index)}
                              margin="normal"
                              variant="standard"
                              fullWidth
                              multiline
                              rowsMax={3}
                              rows={3}
                              className={classes.textField}
                              InputProps={{
                                disableUnderline: true,
                                readOnly: this.props.readOnly,
                                style: {fontFamily: "Arimo", width: '90%', marginLeft: '0.5em', marginRight: '0.5em'}
                              }}
                              style={{marginTop: 0, paddingBottom: '0.5em', marginBottom: 0 }}
                            />
                          </li>
                        );
                      })}
                    </ul>
                    <Grid item>
                      <Grid container direction="row" justify="flex-start" alignItems="center">
                        <Grid item xs={1}>
                          <Button disabled={this.props.readOnly} onClick={this.handleAddActionStep} style={{marginLeft: '0.3em', paddingBottom: '0.5em'}}>
                            <AddCircleIcon style={{ fill: this.props.readOnly? "#a9a9a9" : "#0988ec", marginRight: '0.3em', marginTop: '0.3em' }} />
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{width: '23%', border: '2px solid #009365', borderRadius: '0.5em', height: '100%', overflow: 'auto'}}>
                  <Typography style={{fontSize: '1.2em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', color: '#a9a9a9'}}>
                    Materials
                  </Typography>
                  <ul style={{paddingLeft: '1.5em', marginTop: '0.5em', marginBottom: 0}}>
                    {this.state.actionStepsArray.map((value, index) => {
                      return(
                        <li key={index}>
                          <TextField
                            id={"materials" + index.toString()}
                            name={"materials" + index.toString()}
                            type="text"
                            value={value.materials}
                            onChange={this.handleChangeMaterials(index)}
                            margin="normal"
                            variant="standard"
                            fullWidth
                            multiline
                            rowsMax={3}
                            rows={3}
                            className={classes.textField}
                            InputProps={{
                              disableUnderline: true,
                              readOnly: this.props.readOnly,
                              style: {fontFamily: "Arimo", width: '90%', marginLeft: '0.5em', marginRight: '0.5em'}
                            }}
                            style={{marginTop: 0, paddingBottom: '0.5em', marginBottom: 0}}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </Grid>
                <Grid item style={{width: '16%', border: '2px solid #ffd300', borderRadius: '0.5em', height: '100%', overflow: 'auto'}}>
                  <Typography style={{fontSize: '1.2em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', color: '#a9a9a9'}}>
                    Person
                  </Typography>
                  <ul style={{paddingLeft: '1.5em', marginTop: '0.5em', marginBottom: 0}}>
                    {this.state.actionStepsArray.map((value, index) => {
                      return(
                        <li key={index}>
                          <TextField
                            id={"person" + index.toString()}
                            name={"person" + index.toString()}
                            type="text"
                            value={value.person}
                            onChange={this.handleChangePerson(index)}
                            margin="normal"
                            variant="standard"
                            fullWidth
                            multiline
                            rowsMax={3}
                            rows={3}
                            className={classes.textField}
                            InputProps={{
                              disableUnderline: true,
                              readOnly: this.props.readOnly,
                              style: {fontFamily: "Arimo", width: '90%', marginLeft: '0.5em', marginRight: '0.5em'}
                            }}
                            style={{marginTop: 0, paddingBottom: '0.5em', marginBottom: 0}}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </Grid>
                <Grid item style={{width: '16%', border: '2px solid #6f39c4', borderRadius: '0.5em', height: '100%', overflow: 'auto'}}>
                  <Typography style={{fontSize: '1.2em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', color: '#a9a9a9'}}>
                    Timeline
                  </Typography>
                  <ul style={{paddingLeft: '1.5em', marginTop: '0.5em', marginBottom: 0}}>
                    {this.state.actionStepsArray.map((value, index) => {
                      return(
                        <li key={index}>
                          <TextField
                            id={"timeline" + index.toString()}
                            name={"timeline" + index.toString()}
                            type="date"
                            value={value.timeline}
                            onChange={this.handleChangeTimeline(index)}
                            margin="normal"
                            variant="standard"
                            fullWidth
                            multiline
                            rowsMax={3}
                            rows={3}
                            className={classes.textField}
                            InputProps={{
                              disableUnderline: true,
                              readOnly: this.props.readOnly,
                              style: {fontFamily: "Arimo", width: '90%', marginLeft: '0.5em', marginRight: '0.5em'}
                            }}
                            style={{marginTop: 0, paddingBottom: '0.5em', marginBottom: 0}}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </Grid>
              </Grid>
            </Grid>
          </Grid>   
        : 
        <Button onClick={this.handleCreate}>
          Create Action Plan
        </Button>  
      }     
      </div>
    );
  }
}

export default withStyles(styles)(ActionPlanForm);