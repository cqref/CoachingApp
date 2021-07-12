import * as React from "react";
import * as PropTypes from "prop-types";
import { withRouter, RouteComponentProps } from "react-router-dom";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import AppBar from "../../../components/AppBar";
import CHALKLogoGIF from '../../../assets/images/CHALKLogoGIF.gif';
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
  Popover,
  Modal,
  IconButton,
  Tooltip,
  Paper,
} from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import AddIcon from "@material-ui/icons/Add";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import ObserveIcon from "@material-ui/icons/Visibility";
import ActionPlansIcon from "@material-ui/icons/CastForEducation";
import ConferencePlansIcon from "@material-ui/icons/ListAlt";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Calendar, momentLocalizer, SlotInfo, Views, EventProps } from 'react-big-calendar';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import NewEventStepper from '../../../components/MyTeachersComponents/NewEventStepper';
import CalendarEventPopover from '../../../components/MyTeachersComponents/CalendarEventPopover';
import MyTeachersTable from '../../../components/MyTeachersComponents/MyTeachersTable';
import EditTeacherDialog from '../../../components/MyTeachersComponents/EditTeacherDialog';
import TeacherDetails from '../../../components/MyTeachersComponents/TeacherDetails';
import moment from 'moment';
import * as H from 'history';
import ReactRouterPropTypes from 'react-router-prop-types';
import { changeTeacher } from '../../../state/actions/teacher';
import { connect } from 'react-redux';
import * as Types from '../../../constants/Types';
import * as Constants from '../../../constants/Constants';

const localizer = momentLocalizer(moment);

interface Event {
  title: string,
  start: Date,
  end: Date,
  allDay?: boolean
  resource: string,
  hexColor?: string,
  type: string
}

const RecentActivityTerms = {
  'Observation': 'Classroom Observed',
  'Action Plan': 'Action Plan Saved',
  'Conference Plan': 'Conference Plan Saved'
}

type RecentActivityTermsKey = 'Observation' | 'Action Plan' | 'Conference Plan';

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

const styles = (theme: Theme): object => ({
  root: {
    // border: '1px solid #000000',
    flexGrow: 1,
    width: "100%",
    minHeight: "768px",
    margin: 0,
    padding: 0
  },
  container: {
    // border: '1px solid #FFD800',
    display: "flex",
    flexDirection: "column",
    paddingLeft: '2em',
    paddingRight: '2em'
    // margin: "2% 5% 2% 5%"
  },
  paper: {
    position: "absolute",
    backgroundColor: 'white',
    width: '60%',
    height: '70%',
    padding: '2em',
    borderRadius: 8,
  },
  row: {
    transitionDuration: "0.2s",
    "&:nth-of-type(odd)": {
      backgroundColor: 'red'
    },
    "&:hover": {
      backgroundColor: "#555555",
      color: "#FFFFFF"
    },
    cursor: "pointer"
  },
  title: {
    alignSelf: "center",
    fontSize: "2em",
    fontFamily: 'Arimo'
  },
  tableContainer: {
    // border: '1px solid #00FFF6',
    maxWidth: "100%",
    width: "100%",
    overflow: "auto",
    maxHeight: "16em",
    fontSize: "1.5em",
    boxShadow: "0px 1px 1px 1px #888888"
  },
  actionContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1em"
  },
  actionButton: {
    marginLeft: "2em",
    backgroundColor: "#2196F3"
  },
  search: {
    lineHeight: "1em",
    fontSize: "1.5em",
    maxWidth: "30%"
  },
  nameCellHeader: {
    color: "#000000",
    fontSize: "1em",
    padding: "0.5em",
    maxWidth: "12em",
    position: "sticky",
    top: 0,
    backgroundColor: "#FFFFFF",
    fontFamily: 'Arimo',
    fontWeight: 'bold'
  },
  emailCellHeader: {
    color: "#000000",
    fontSize: "1em",
    padding: "0.5em",
    maxWidth: "12em",
    position: "sticky",
    top: 0,
    backgroundColor: "#FFFFFF",
    fontFamily: 'Arimo',
    fontWeight: 'bold'
  },
  magicEightIcon: {
    height: "55px",
    width: "55px",
    borderRadius: 2
  },
  magicEightCell: {
    textAlign: "center",
    padding: "0.5em",
    minWidth: "55px",
    maxWidth: "1.8em"
  },
  nameField: {
    // border: '1px solid #4C00FF'
    textAlign: "left",
    padding: "0.5em",
    overflow: "hidden",
    maxWidth: "7em",
    color: "inherit",
    fontFamily: 'Arimo'
  },
  emailField: {
    textAlign: "left",
    padding: "0.5em",
    overflow: "hidden",
    maxWidth: "18em",
    color: "inherit",
    fontFamily: 'Arimo'
  },
  unlockedIcon: {
    height: "40px",
    width: "40px",
    display: "block",
    borderRadius: 4
  },
  legendContainer: {
    // border: '1px solid #FF56FF',
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1em",
    margin: "1.5em 0 0 0",
    justifySelf: "center",
    overflow: "scroll"
  },
  legendItem: {
    // border: '1px solid #97FF00'
    display: "flex",
    alignItems: "center",
    fontSize: "1.3em"
  },
  legendIcon: {
    height: "40px",
    width: "40px",
    marginRight: "0.2em"
  },

  // Minor Breakpoint -> Shrinking desktop window
  "@media only screen and (max-width:1120px)": {
    emailField: {
      maxWidth: "10em"
    }
  },

  // iPad Pro 12.9" Portrait
  "@media only screen and (max-width:1024px) and (orientation:portrait)": {
    tableContainer: {
      maxHeight: "38em"
    }
  },

  // iPad Pro 10.5" Portrait
  "@media only screen and (max-width:834px) and (orientation: portrait)": {
    magicEightCell: {
      display: "none"
    },
    tableContainer: {
      maxHeight: "30em"
    }
  },

  // iPad-Mini Portrait
  "@media only screen and (max-width:768px) and (orientation:portrait)": {
    legendContainer: {
      padding: "1em 0 1em 0"
    },
    actionContainer: {
      justifyContent: "space-between"
    },
    actionButton: {
      marginRight: "3em"
    },
    magicEightCell: {
      display: "none"
    },
    tableContainer: {
      maxHeight: "25em"
    }
  },

  // iPad-Mini Landscape
  "@media only screen and (max-width:1024px) and (orientation:landscape)": {
    nameField: {
      maxWidth: "7.5em"
    },
    emailField: {
      maxWidth: "9em"
    }
  }
});

interface Style {
  root: string,
  container: string,
  paper: string,
  title: string,
  actionContainer: string,
  search: string,
  actionButton: string,
  tableContainer: string,
  nameCellHeader: string,
  emailCellHeader: string,
  magicEightCell: string,
  magicEightIcon: string,
  row: string,
  nameField: string,
  emailField: string,
  unlockedIcon: string,
  legendContainer: string,
  legendItem: string,
  legendIcon: string
}

type Props = RouteComponentProps & {
  history: H.History,
  classes: Style,
  type: string,
  teacherList: Array<Types.Teacher>,
  changeTeacher(teacherInfo: Types.Teacher): Types.Teacher,
}

interface Teacher {
  email: string,
  firstName: string,
  lastName: string,
  notes: string,
  id: string,
  phone: string,
  role: string,
  school: string,
  unlocked: Array<number>
};

interface State {
  teachers: Array<Teacher>,
  selectedTeacher: Teacher | undefined,
  searched: Array<Teacher>,
  isAdding: boolean,
  editing: boolean,
  inputFirstName: string,
  inputLastName: string,
  inputSchool: string,
  inputEmail: string,
  inputPhone: string,
  inputNotes: string,
  fnErrorText: string,
  lnErrorText: string,
  schoolErrorText: string,
  emailErrorText: string,
  phoneErrorText: string,
  notesErrorText: string,
  addAlert: boolean,
  editAlert: boolean,
  alertText: string,
  // anchorEl: React.BaseSyntheticEvent<globalThis.Event, EventTarget & Element, EventTarget>;currentTarget: EventTarget & Element | null,
  anchorEl: EventTarget & Element | null,
  clickedEvent: Types.CalendarEvent | null,
  newEventModal: boolean,
  newEventDate: Date | null,
  newEventTeacher: Types.Teacher | null,
  newEventTool: Types.ToolNamesKey | null,
  newEventType: string,
  // actionPlanEvents: Array<Types.CalendarEvent>,
  // conferencePlanEvents: Array<Types.CalendarEvent>,
  allEvents: Array<any>,
  dataLoaded: boolean,
  view: number,
  deleteAppointmentDialog: boolean
  // type: string
}

const ToolNames = {
  'TT': 'TransitionTime',
  'CC': 'ClassroomClimate',
  'MI': 'MathInstruction',
  'IN': 'LevelOfInstruction',
  'SE': 'StudentEngagement',
  'LC': 'ListeningToChildren',
  'SA': 'SequentialActivities',
  'LI': 'LiteracyInstruction',
  'AC': 'AssociativeCooperativeInteractions'
}

/**
 * @class TeacherListPage
 */
class TeacherListPage extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      teachers: [],
      selectedTeacher: undefined,
      searched: [],
      isAdding: false,
      editing: false,
      inputFirstName: "",
      inputLastName: "",
      inputSchool: "",
      inputEmail: "",
      inputPhone: "",
      inputNotes: "",
      fnErrorText: "",
      lnErrorText: "",
      schoolErrorText: "",
      emailErrorText: "",
      phoneErrorText: "",
      notesErrorText: "",
      addAlert: false,
      editAlert: false,
      alertText: "",
      anchorEl: null,
      clickedEvent: null,
      newEventModal: false,
      newEventDate: new Date(),
      newEventTeacher: null,
      newEventTool: null,
      newEventType: '',
      // actionPlanEvents: [],
      // conferencePlanEvents: [],
      allEvents: [],
      dataLoaded: false,
      view: 0,
      deleteAppointmentDialog: false
      // type: ''
    };
  }

  /**
   * hi
   */
  clickMe(): void {
    const firebase = this.context;
    firebase
      .getTeacherList()
      .then((teachers: Array<Promise<Teacher>>) => {
        console.log('teachers', teachers);
        const recentObservations = [];
        teachers.forEach((teacher: Promise<Teacher>) => {
          console.log('HI')
          teacher.then((data: Teacher) => {
            console.log('HERE I AM')
            firebase
            .getRecentObservations2(data.id)
            .then((recentObs: Array<string>) => {
              /* this.setState({
                recentObs: recentObs
              }) */
              console.log('recent obs HELLO', recentObs);
              recentObservations.push(recentObs)
            })
            .catch((error: Error) =>
              console.error("Error occurred getting recent observations: ", error)
            );
          })
          
        })
          }
      )
      .catch((error: Error) =>
        console.error("Error occurred fetching teacher list: ", error)
      );
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    const firebase = this.context;
    console.log('COMPONENTDIDMOUNT', this.state.view);
    let allEvents: Array<Types.CalendarEvent> = [];
    this.setState({
      searched: this.props.teacherList
    })
    firebase.getRecentObservations3().then((data: Array<{
      id: string,
      sessionStart: {value: Date},
      sessionEnd: {value: Date},
      teacher: string,
      type: string
    }>) => {
      console.log('i got the data here', data);
      const myArr: Array<Types.CalendarEvent> = [];
      data.forEach((observation: {
        id: string,
        sessionStart: {value: Date},
        sessionEnd: {value: Date},
        teacher: string,
        type: string
      }) => {
        myArr.push({
          title: 'Observation',
          start: observation.sessionStart.value,
          end: observation.sessionEnd.value,
          allDay: false,
          resource: observation.teacher.slice(6),
          // hexColor: 'a0febf',
          type: observation.type,
          id: observation.id
        })
      })
      console.log('what is myArr', myArr)
      allEvents = allEvents.concat(myArr)
      // this.setState({allEvents: myArr})
    }).then(() => {
      firebase.getActionPlanEvents().then((actionPlanEvents: Array<Types.CalendarEvent>) => {
        allEvents = allEvents.concat(actionPlanEvents)
      }).then(() => {
        firebase.getConferencePlanEvents().then((conferencePlanEvents: Array<Types.CalendarEvent>) => {
          allEvents = allEvents.concat(conferencePlanEvents)
        }).then(() => {
          firebase.getAppointments().then((appointmentEvents: Array<Types.CalendarEvent>) => {
            allEvents = allEvents.concat(appointmentEvents)
          }).then(() => {
            this.setState({
              allEvents: allEvents,
              dataLoaded: true
            }, () => {console.log('obs EVENTS', this.state.allEvents)})
          })
        })
      })
    })
    this.setState({
      teachers: this.props.teacherList
    }, () => {
      console.log('and now the teachers are', this.state.teachers);
      const recentObservations = [];
    })
  }

  createAppointment = (teacherId: string, date: Date, tool: string, type: string): void => {
    const firebase = this.context;
    firebase.createAppointment(teacherId, date, tool, type).then((id: string) => {
      const newEvent = {
        title: type,
        start: date,
        end: date,
        allDay: false,
        resource: teacherId,
        type: tool,
        id: id,
        appointment: true
      }
      console.log('new event is', newEvent)
      const allEventsUpdated = [...this.state.allEvents, newEvent]
      this.setState({allEvents: allEventsUpdated})
    })
  }

  saveAppointment = (id: string, teacherId: string, date: Date, tool: string, type: string): void => {
    const firebase = this.context;
    console.log('called save')
    firebase.saveAppointment(id, teacherId, date, tool, type).then((id: string) => {
      const newEvent = {
        title: type,
        start: date,
        end: date,
        allDay: false,
        resource: teacherId,
        type: tool,
        id: id,
        appointment: true
      }
      const updatedEvents = [...this.state.allEvents]
      const index = updatedEvents.findIndex(event => event.id === newEvent.id)
      updatedEvents.splice(index, 1)
      updatedEvents.push(newEvent)
      this.setState({allEvents: updatedEvents})
    })
  }

  deleteAppointment = (id: string): void => {
    const firebase = this.context;
    console.log('called delete')
    firebase.removeAppointment(id).then(() => {
      console.log('WHAT IS BLAH', id)
      const updatedEvents = [...this.state.allEvents]
      const index = updatedEvents.findIndex(event => event.id === id)
      updatedEvents.splice(index, 1)
      this.setState({allEvents: updatedEvents})
    })
  }

  getAppointment = (teacherId: string, date: Date, tool: string, type: string): void => {
    const firebase = this.context;
    firebase.completeAppointment(teacherId, type, tool)
  }

  /**
   * function for editing teacher name or email
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  onChangeText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const text = event.target.value.toLowerCase();
    if (text === "") {
      this.setState((prevState: State) => {
        return { searched: prevState.teachers }; // original teacher list
      });
    } else {
      this.setState((prevState: State) => {
        return {
          searched: prevState.teachers.filter(
            item =>
              item.lastName.toLowerCase().includes(text) ||
              item.firstName.toLowerCase().includes(text) ||
              item.email.toLowerCase().includes(text)
          )
        };
      });
    }
  };

  /**
   * @param {Teacher} teacherInfo
   */
  selectTeacher = (teacherInfo: Teacher): void => {
    /* const recentObs = this.state.allEvents.filter(obj => {
      return( obj.resource === teacherInfo.id && obj.type === 'CC' )
    });
    const maxDate = recentObs.length > 0 ? (recentObs.reduce(function(prev, current) {
      return (new Date(prev.start) > new Date(current.start)) ? prev : current
    })) : (undefined)
    console.log('recnet obs', recentObs, maxDate); */
    this.setState({
      view: 3,
      selectedTeacher: teacherInfo
    })
    /* this.props.history.push({
      pathname: `/MyTeachers/${teacherInfo.id}`,
      state: { teacher: teacherInfo, type: this.props.type , recentEvents: this.state.allEvents}
    }); */
  };

  /**
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  handleAddText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const type = event.target.name;
    const val = event.target.value;
    if (type === 'inputFirstName') {
      this.setState({
        inputFirstName: val
      }, () => this.validateInputText(type, val))
    } else if (type === 'inputLastName') {
      this.setState({
        inputLastName: val
      }, () => this.validateInputText(type, val))
    } else if (type === 'inputSchool') {
      this.setState({
        inputSchool: val
      }, () => this.validateInputText(type, val))
    } else if (type === 'inputEmail') {
      this.setState({
        inputEmail: val
      }, () => this.validateInputText(type, val))
    } else if (type === 'inputPhone') {
      this.setState({
        inputPhone: val
      }, () => this.validateInputText(type, val))
    } else if (type === 'inputNotes') {
      this.setState({
        inputNotes: val
      }, () => this.validateInputText(type, val))
    }
  };

  /**
   * 
   * @param {string} type
   * @param {string} val
   */
  validateInputText = (type: string, val: string): void => {
    switch (type) {
      case "inputFirstName":
        if (!/^[a-zA-Z ]{2,30}$/.test(val)) {
          this.setState({ fnErrorText: "Invalid first name." });
        } else {
          this.setState({ fnErrorText: "" });
        }
        break;
      case "inputLastName":
        if (!/^[a-zA-Z ]{2,30}$/.test(val)) {
          this.setState({ lnErrorText: "Invalid last name." });
        } else {
          this.setState({ lnErrorText: "" });
        }
        break;
      case "inputEmail":
        if (!/^\S+@\S+$/.test(val)) {
          this.setState({ emailErrorText: "Invalid email address." });
        } else {
          this.setState({ emailErrorText: "" });
        }
        break;
      case "inputSchool":
        if (!/^[a-zA-Z ]{2,100}$/.test(val)) {
          this.setState({
            schoolErrorText: "Invalid school (max 100 characters)."
          });
        } else {
          this.setState({ schoolErrorText: "" });
        }
        break;
      case "inputPhone":
        if (val === "") {
          this.setState({ phoneErrorText: "" });
        } else if (!/^\d{3}?-\d{3}-\d{4}$/.test(val)) {
          this.setState({
            phoneErrorText: "Invalid number or format (use ###-###-####)."
          });
        } else {
          this.setState({ phoneErrorText: "" });
        }
        break;
      case "inputNotes":
        if (val.length > 250) {
          this.setState({ notesErrorText: "Max 250 characters." });
        } else {
          this.setState({ notesErrorText: "" });
        }
        break;
      default:
        break;
    }
  };

  handleAddConfirm = (): void | null => {
    const {
      inputFirstName,
      inputLastName,
      inputSchool,
      inputEmail,
      inputNotes,
      inputPhone,
      fnErrorText,
      lnErrorText,
      emailErrorText,
      schoolErrorText,
      notesErrorText,
      phoneErrorText
    } = this.state;
    this.validateInputText("inputFirstName", inputFirstName);
    this.validateInputText("inputLastName", inputLastName);
    this.validateInputText("inputEmail", inputEmail);
    this.validateInputText("inputSchool", inputSchool);
    if (
      // any inputs cause an error or required are missing
      !!fnErrorText ||
      !!lnErrorText ||
      !!emailErrorText ||
      !!schoolErrorText ||
      !!notesErrorText ||
      !!phoneErrorText ||
      !inputFirstName ||
      !inputLastName ||
      !inputEmail ||
      !inputSchool
    ) {
      return null;
    } else {
      // fields are validated
      const firebase = this.context;
      firebase
        .addTeacher({
          firstName: inputFirstName,
          lastName: inputLastName,
          school: inputSchool,
          email: inputEmail,
          notes: inputNotes,
          phone: inputPhone
        })
        .then((id: string) =>
          firebase
            .getTeacherInfo(id)
            .then((teacherInfo: Teacher) =>
              this.setState(
                prevState => {
                  return {
                    teachers: prevState.teachers.concat(teacherInfo),
                    searched: prevState.teachers.concat(teacherInfo)
                  };
                },
                () => {
                  this.handleCloseModal();
                  this.handleAddAlert(true);
                }
              )
            )
            .catch((error: Error) => {
              console.error(
                "Error occurred fetching new teacher's info: ",
                error
              );
              this.handleCloseModal();
              this.handleAddAlert(false);
            })
        )
        .catch((error: Error) => {
          console.error("Error occurred adding teacher to dB: ", error);
          this.handleCloseModal();
          this.handleAddAlert(false);
        });
    }
  };

  handleEditConfirm = (): void | null => {
    const {
      // teacherUID,
      selectedTeacher,
      inputFirstName,
      inputLastName,
      inputSchool,
      inputEmail,
      inputNotes,
      inputPhone,
      fnErrorText,
      lnErrorText,
      emailErrorText,
      schoolErrorText,
      notesErrorText,
      phoneErrorText
    } = this.state;
    this.validateInputText("inputFirstName", inputFirstName);
    this.validateInputText("inputLastName", inputLastName);
    this.validateInputText("inputEmail", inputEmail);
    this.validateInputText("inputSchool", inputSchool);
    if (
      // any inputs cause an error or required are missing
      !!fnErrorText ||
      !!lnErrorText ||
      !!emailErrorText ||
      !!schoolErrorText ||
      !!notesErrorText ||
      !!phoneErrorText ||
      !inputFirstName ||
      !inputLastName ||
      !inputEmail ||
      !inputSchool
    ) {
      return null;
    } else {
      // fields are validated
      const firebase = this.context;
      if (
        firebase.setTeacherInfo(this.state.selectedTeacher.id, {
          firstName: inputFirstName,
          lastName: inputLastName,
          school: inputSchool,
          email: inputEmail,
          phone: inputPhone,
          notes: inputNotes
        })
      ) {
        // Edit successfully written
        this.setState(
          {
            selectedTeacher: {
              email: inputEmail,
              firstName: inputFirstName,
              lastName: inputLastName,
              notes: inputNotes,
              id: selectedTeacher.id,
              phone: inputPhone,
              role: selectedTeacher.role,
              school: inputSchool,
              unlocked: selectedTeacher.unlocked
            },
            inputFirstName: inputFirstName,
            inputLastName: inputLastName,
            inputSchool: inputSchool,
            inputEmail: inputEmail,
            inputPhone: inputPhone,
            inputNotes: inputNotes,
            editing: false,
            fnErrorText: "",
            lnErrorText: "",
            schoolErrorText: "",
            emailErrorText: "",
            notesErrorText: ""
          },
          () => this.handleEditAlert(true)
        );
      } else {
        this.handleCloseModal();
        this.handleEditAlert(false);
      }
    }
  };

  /**
   * @param {boolean} successful
   */
  handleAddAlert = (successful: boolean): void => {
    if (successful) {
      this.setState(
        {
          addAlert: true,
          alertText: "Teacher successfully added!"
        },
        () =>
          setTimeout(
            () => this.setState({ addAlert: false, alertText: "" }),
            1500
          )
      );
    } else {
      this.setState(
        {
          addAlert: true,
          alertText:
            "Something went wrong... try refreshing your page or logging out and back in."
        },
        () =>
          setTimeout(
            () => this.setState({ addAlert: false, alertText: "" }),
            3000
          )
      );
    }
  };

  /**
   * @param {boolean} successful
   */
   handleEditAlert = (successful: boolean): void => {
    if (successful) {
      this.setState(
        {
          editAlert: true,
          alertText: "Edit Successfully Written!"
        },
        () => setTimeout(() => this.setState({ editAlert: false }), 1500)
      );
    } else {
      this.setState(
        {
          editAlert: true,
          alertText:
            "Something went wrong... try refreshing your page or logging out and back in."
        },
        () => setTimeout(() => this.setState({ editAlert: false }), 3000)
      );
    }
  };

  closeTeacherDetails = (): void => {
    this.setState({view: 0})
  }

  handleEdit = (): void => {
    this.setState({
      inputFirstName: this.state.selectedTeacher ? this.state.selectedTeacher.firstName : '',
      inputLastName: this.state.selectedTeacher ? this.state.selectedTeacher.lastName : '',
      inputEmail: this.state.selectedTeacher ? this.state.selectedTeacher.email : '',
      inputSchool: this.state.selectedTeacher ? this.state.selectedTeacher.school : '',
      inputPhone: this.state.selectedTeacher ? this.state.selectedTeacher.phone : '',
      inputNotes: this.state.selectedTeacher ? this.state.selectedTeacher.notes : '',
    }, (): void => {
      this.setState({editing: true})
    })
  }

  handleCloseModal = (): void => {
    this.setState({
      inputFirstName: "",
      inputLastName: "",
      inputSchool: "",
      inputEmail: "",
      inputPhone: "",
      inputNotes: "",
      fnErrorText: "",
      lnErrorText: "",
      schoolErrorText: "",
      emailErrorText: "",
      notesErrorText: "",
      isAdding: false,
      editing: false,
      alertText: ""
    });
  };

  handleDeleteConfirm = (): void => {
    const firebase = this.context;
    firebase
      .removePartner(this.state.selectedTeacher.id)
      .then(() => {
        // remove teacher from redux and my teachers list,
        // filter out all events for that teacher from this.state.allEvents
        /* this.setState(this.initialState, () => {
          if (this.props.location.state !== undefined) {
            // came from MyTeachers
            this.props.history.goBack();
          } else {
            this.props.history.replace("/MyTeachers");
          }
        }); */
      })
      .catch(() => {}
        // problem with removing teacher
        /* this.setState(
          {
            editAlert: true,
            alertText:
              "Something went wrong removing this teacher... " +
              "try refreshing your page or logging out and back in."
          },
          () => setTimeout(() => this.setState({ editAlert: false }), 3000)
        )  */
      ); 
  };

  static propTypes = {
    classes: PropTypes.exact({
      root: PropTypes.string,
      container: PropTypes.string,
      title: PropTypes.string,
      actionContainer: PropTypes.string,
      search: PropTypes.string,
      actionButton: PropTypes.string,
      tableContainer: PropTypes.string,
      nameCellHeader: PropTypes.string,
      emailCellHeader: PropTypes.string,
      magicEightCell: PropTypes.string,
      magicEightIcon: PropTypes.string,
      row: PropTypes.string,
      nameField: PropTypes.string,
      emailField: PropTypes.string,
      unlockedIcon: PropTypes.string,
      legendContainer: PropTypes.string,
      legendItem: PropTypes.string,
      legendIcon: PropTypes.string
    }).isRequired,
    type: PropTypes.string.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    changeTeacher: PropTypes.string.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    const {
      isAdding,
      editing,
      addAlert,
      editAlert,
      alertText,
      fnErrorText,
      lnErrorText,
      emailErrorText,
      schoolErrorText,
      phoneErrorText,
      notesErrorText,
      anchorEl,
      clickedEvent,
      newEventModal,
      newEventDate,
      newEventTeacher,
      newEventTool,
      newEventType,
      deleteAppointmentDialog
    } = this.state;

    /**
     * clicking on calendar event
     * @param {Types.CalendarEvent} event
     * @param {SyntheticEvent} target
     */
    const handleClick = (event: Types.CalendarEvent, target: React.SyntheticEvent): void => {
      target.persist();
      this.setState({
        anchorEl: target.currentTarget,
        clickedEvent: event
      });
      if (event.appointment) {
        const selectedTeacher = this.props.teacherList.filter(teacher => {
          return teacher.id === event.resource
        });
        this.setState({
          newEventDate: event.start,
          newEventTeacher: selectedTeacher[0],
          newEventTool: event.type,
          newEventType: event.title
        })
      }
    };

    /**
     * closes event popover or create event dialog
     */
    const handleClose = (): void => {
      this.setState({
        anchorEl: null,
        clickedEvent: null,
        newEventDate: null,
        newEventTeacher: null,
        newEventTool: null,
        newEventType: ''
      });
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    /**
     * returns teacher name from id
     * @param {string} id
     * @returns {string}
     */
    const getName = (id: string): string => {
      const teacher = this.props.teacherList.find(obj => obj.id === id);
      if (teacher) {
        return (teacher.firstName + ' ' + teacher.lastName)
      } else {
        return ''
      }
    }

    /**
     * returns teacher initials, given name
     * @param {string} name
     * @returns {string}
     */
    const getInitials = (name: string): string => {
      let i = 0;
      let initials = name.charAt(0);
      while (i < name.length) {
        const space = name.indexOf(' ', i);
        if (space === -1) {
          break
        }
        initials = initials.concat(name.charAt(space + 1));
        i = space + 1
      }
      return initials
    };

    // style for calendar event
    const eventStyleGetter = (event: Types.CalendarEvent, start, end, isSelected) => {
      // const backgroundColor = '#' + event.hexColor;
      const style = {
        // backgroundColor: backgroundColor,
        // backgroundColor: 'white',
        backgroundColor: event.appointment ? 'white' : Constants.Colors[event.type as Types.DashboardType],
        borderRadius: '0px',
        opacity: 0.8,
        color: event.appointment ? 'black' : 'white',
        // border: '1px solid gray',
        display: 'block',
        border: event.appointment ? '1px solid #ababab' : undefined
      };
      return {
        style: style
      };
    };

    /**
     * returns background color for table row
     * @param {number} index
     * @returns {object} 
     */
    const getStripedStyle = (index: number) => {
      return { backgroundColor: index % 2 ? '#D9EAFB' : 'white' };
    }

    /**
     * content for calendar event button
     * @param {object} event
     * @returns {JSX.Element}
     */
    const EventComponent = (event: {
      event: Types.CalendarEvent,
      continuesAfter: boolean,
      continuesPrior: boolean,
      isAllDay: boolean,
      title: string,
      slotEnd: Date,
      slotStart: Date
    }): JSX.Element => {
      return (
        <Grid container direction='row' justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography variant="body2" style={{fontFamily: 'Arimo'}}>
              {getInitials(getName(event.event.resource))}:
            </Typography>
          </Grid>
          <Grid item wrap='nowrap' style={{paddingLeft: '0.2em'}}>
            <Typography variant="body2" style={{fontFamily: 'Arimo', whiteSpace: "normal",
              // wordWrap: "break-word"
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {event.event.title}
            </Typography>
          </Grid>
        </Grid>
      );
    }

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: Types.FirebaseAppBar): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Grid container direction="column" justify="center" alignItems="stretch" className={classes.container}>
          <h2 className={classes.title}>My Teachers</h2>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            style={{padding: '1em'}}
          >
            {clickedEvent !== null ? (
              <CalendarEventPopover
                push={this.props.history.push}
                clickedEvent={clickedEvent}
                teacherList={this.props.teacherList}
                changeTeacher={this.props.changeTeacher}
                deleteAppointment={(): void => this.setState({ deleteAppointmentDialog: true })}
                editEvent={(): void => this.setState({ newEventModal: true })}
                getName={getName}
              />
            ) : (<Typography>no event</Typography>)}
          </Popover>
          <Grid item>
            <Grid container direction='row' justify='center' alignItems='center'>
              <Grid item xs={12}>
                <Grid container direction="column" style={{height: '60vh'}}>
                  {this.state.dataLoaded ? (this.state.view === 1 ? (
                    // calendar
                    <Grid item style={{height: '100%', width: '100%'}}>
                      <Calendar
                        popup
                        localizer={localizer}
                        // events={[...myEventsList, ...this.state.actionPlanEvents]}
                        events={this.state.allEvents ? this.state.allEvents : []}
                        selectable
                        step={60}
                        showMultiDayTimes
                        components={{
                          event: EventComponent,
                          // timeSlotWrapper: ColoredDateCellWrapper,
                          // eventPropGetter: eventStyleGetter
                        }}
                        eventPropGetter={eventStyleGetter}
                        onSelectEvent={(event: Types.CalendarEvent, target: React.SyntheticEvent): void => {handleClick(event, target)}}
                        onSelectSlot={(slot: SlotInfo): void => {
                          this.setState({newEventDate: slot.start}, () => {
                            this.setState({newEventModal: true})
                          });
                        }}
                        longPressThreshold={20}
                      />
                    </Grid>
                  ) : this.state.view === 0 ? (
                    // table
                    <MyTeachersTable
                      onChangeText={this.onChangeText}
                      searched={this.state.searched}
                      allEvents={this.state.allEvents}
                      selectTeacher={this.selectTeacher}
                      addingTeacher={(): void => this.setState({ isAdding: true })}
                    />
                  ) : (
                    null
                  )) : (
                    <Grid container direction="row" justify="center" alignItems="center">
                      <img src={CHALKLogoGIF} alt="Loading" width="80%" />
                    </Grid>
                  )}
                  <TeacherDetails
                      /* firstName={firstName}
                      lastName={lastName}
                      school={school}
                      email={email}
                      phone={phone}
                      notes={notes} */
                      teacher={this.state.selectedTeacher}
                      recentEvents={this.state.allEvents}
                      handleDeleteConfirm={this.handleDeleteConfirm}
                      handleCloseModal={this.handleCloseModal}
                      setEditing={(): void => {
                        this.setState({
                          inputFirstName: this.state.selectedTeacher ? this.state.selectedTeacher.firstName : '',
                          inputLastName: this.state.selectedTeacher ? this.state.selectedTeacher.lastName : '',
                          inputEmail: this.state.selectedTeacher ? this.state.selectedTeacher.email : '',
                          inputSchool: this.state.selectedTeacher ? this.state.selectedTeacher.school : '',
                          inputPhone: this.state.selectedTeacher ? this.state.selectedTeacher.phone : '',
                          inputNotes: this.state.selectedTeacher ? this.state.selectedTeacher.notes : '',
                        }, (): void => {
                          this.setState({editing: true})
                        })
                      }}
                      closeTeacherDetails={this.closeTeacherDetails}
                      open={this.state.view===3}
                      /* inputFirstName={this.state.inputFirstName}
                      inputLastName={this.state.inputLastName}
                      inputEmail={this.state.inputEmail}
                      inputSchool={this.state.inputSchool}
                      inputPhone={this.state.inputPhone}
                      inputNotes={this.state.inputNotes} */
                    />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {this.state.view !== 3 ? (
            <Grid item style={{paddingTop: '2em'}}>
              <Paper elevation={2}>
                <BottomNavigation
                  value={this.state.view}
                  onChange={(event, newValue) => {
                    this.setState({view: newValue});
                  }}
                  showLabels
                >
                  <BottomNavigationAction label="Teachers" icon={<ConferencePlansIcon />} />
                  <BottomNavigationAction label="Calendar" icon={<ActionPlansIcon />} />
                </BottomNavigation>
              </Paper>
            </Grid>
          ) : (null)}
          <Modal open={newEventModal}>
            <div style={getModalStyle()} className={classes.paper}>
              <Grid container direction="column" style={{height: '100%', overflowY: 'auto'}}>
                <Grid item style={{height: '20%'}}>
                  <Grid container direction="row" style={{height: '100%'}}>
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                      <Typography variant="h5" align="center" style={{fontFamily: 'Arimo', padding: '1em'}}>
                        {clickedEvent ? 'Update Event' : 'Create New Event'}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton style={{ padding: 10 }}>
                        <Tooltip title={"Close"} placement={"right"}>
                          <CloseIcon
                            onClick={(): void => {this.setState({newEventModal: false})}}
                          />
                        </Tooltip>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{height: '80%'}}>
                  <NewEventStepper
                    id={clickedEvent ? clickedEvent.id : undefined}
                    date={newEventDate}
                    setDate={(newDate: Date): void => {this.setState({newEventDate: newDate})}}
                    teacher={newEventTeacher}
                    setTeacher={(newTeacher: Types.Teacher): void => {this.setState({newEventTeacher: newTeacher})}}
                    tool={newEventTool}
                    setTool={(newTool: Types.ToolNamesKey): void => {this.setState({newEventTool: newTool})}}
                    type={newEventType}
                    setType={(newType: string): void => {this.setState({newEventType: newType})}}
                    teacherList={this.state.teachers}
                    closeModal={(): void => this.setState({newEventModal: false})}
                    createAppointment={this.createAppointment}
                    saveAppointment={this.saveAppointment}
                    closeAppointmentModal={handleClose}
                  />
                </Grid>
              </Grid>
            </div>
          </Modal>
          <EditTeacherDialog
            adding={isAdding}
            editing={editing}
            // open={isAdding || editing}
            handleCloseModal={this.handleCloseModal}
            handleAddText={this.handleAddText}
            inputFirstName={this.state.inputFirstName}
            inputLastName={this.state.inputLastName}
            inputEmail={this.state.inputEmail}
            inputSchool={this.state.inputSchool}
            inputPhone={this.state.inputPhone}
            inputNotes={this.state.inputNotes}
            fnErrorText={fnErrorText}
            lnErrorText={lnErrorText}
            schoolErrorText={schoolErrorText}
            emailErrorText={emailErrorText}
            phoneErrorText={phoneErrorText}
            notesErrorText={notesErrorText}
            handleComplete={isAdding ? this.handleAddConfirm : this.handleEditConfirm}
          />
          <Dialog
            open={addAlert}
            onClose={(): void => this.setState({ addAlert: false, alertText: "" })}
            aria-labelledby="add-alert-label"
            aria-describedby="add-alert-description"
          >
            <DialogTitle id="add-alert-title">{alertText}</DialogTitle>
          </Dialog>
          <Dialog
            open={editAlert}
            onClose={(): void => this.setState({ editAlert: false, alertText: "" })}
            aria-labelledby="edit-alert-label"
            aria-describedby="edit-alert-description"
          >
            <DialogTitle id="edit-alert-title">{alertText}</DialogTitle>
          </Dialog>
          <Dialog
            open={deleteAppointmentDialog}
          >
            <DialogTitle id="alert-dialog-title" style={{fontFamily: 'Arimo'}}>
            {
              clickedEvent ? (
                "Are you sure you want to delete your appointment with " + getName(clickedEvent.resource) + "?"
              ) : (
                "Are you sure you want to delete your appointment?"
              )
              
              }
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={(): void => this.setState({deleteAppointmentDialog: false})}
                style={{ color: "#2196f3" }}
              >
                No
              </Button>
              <Button
                onClick={(): void => {
                  if (clickedEvent) {
                    this.deleteAppointment(clickedEvent.id)
                  }
                  this.setState({deleteAppointmentDialog: false})
                  handleClose();
                }}
                style={{ color: "#F1231C" }}
              >
                Yes
              </Button>
            </DialogActions>
            </Dialog>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: Types.ReduxState): {
  // teacherSelected: Types.Teacher,
  teacherList: Array<Types.Teacher>
} => {
  return {
    // teacherSelected: state.teacherSelectedState.teacher,
    teacherList: state.teacherListState.teachers
  };
};

TeacherListPage.contextType = FirebaseContext;
export default withRouter(connect(
  mapStateToProps, {changeTeacher}
)(withStyles(styles)(TeacherListPage)));
// export default withStyles(styles)(withRouter(TeacherListPage));
