import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import * as moment from "moment";
import ResultsLayout from '../../../components/ResultsLayout';
import SummarySlider from "../../../components/MathInstructionComponents/ResultsComponents/SummarySlider";
import DetailsSlider from "../../../components/MathInstructionComponents/ResultsComponents/DetailsSlider";
import TrendsSlider from "../../../components/MathInstructionComponents/ResultsComponents/TrendsSlider";
import MathCoachingQuestions from "../../../components/MathInstructionComponents/ResultsComponents/MathCoachingQuestions";
import FadeAwayModal from '../../../components/FadeAwayModal';
import TeacherModal from '../HomeViews/TeacherModal';
import { connect } from 'react-redux';
import {
  addMathChildSummary,
  addMathTeacherSummary,
  addMathDetails,
  addMathChildTrends,
  addMathTeacherTrends
} from '../../../state/actions/math-results';
import { addTeacher, addTool } from '../../../state/actions/session-dates';
import * as Constants from '../../../constants/Constants';
import * as Types from '../../../constants/Types';

const styles: object = {
  root: {
    flexGrow: 1,
    height: "100vh",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden"
  },
};

interface Props {
  classes: Style,
  teacherSelected: Types.Teacher,
  addTeacher(dates: {
    teacherId: string,
    data: [{
      tool: string,
      sessions: Array<{id: string, sessionStart: {value: string}}>
    }]
  }): void,
  addTool(dates: [{
    teacherId: string,
    data: [{
      tool: string,
      sessions: Array<{id: string, sessionStart: {value: string}}>
    }]
  }]): void,
  sessionDates: Array<{
    teacherId: string,
    data: Array<{
      tool: string,
      sessions: Array<{id: string, sessionStart: {value: string}}>
    }>
  }>,
  addMathChildSummary(childSummary: {
    sessionId: string,
    teacherId: string,
    childSummary: Types.MathData['childSummary']
  }): void,
  addMathTeacherSummary(teacherSummary: {
    sessionId: string,
    teacherId: string,
    teacherSummary: Types.MathData['teacherSummary']
  }): void,
  addMathDetails(childDetails: {
    sessionId: string,
    teacherId: string,
    details: Types.MathData['childDetails'] & Types.MathData['teacherDetails']
  }): void,
  addMathChildTrends(childTrends: {
    teacherId: string,
    childTrends: Types.MathData['childTrends'] | undefined
  }): void,
  addMathTeacherTrends(teacherTrends: {
    teacherId: string,
    teacherTrends: Types.MathData['teacherTrends'] | undefined
  }): void,
  mathResults: Array<{
    teacherId: string,
    sessionId: string,
    childSummary: Types.MathData['childSummary'],
    teacherSummary: Types.MathData['teacherSummary'],
    details: Types.MathData['childDetails'] & Types.MathData['teacherDetails']
  }>,
  mathChildTrends: Array<{
    teacherId: string,
    childTrends: Types.MathData['childTrends']
  }>,
  mathTeacherTrends: Array<{
    teacherId: string,
    teacherTrends: Types.MathData['teacherTrends']
  }>
}

interface Style {
  root: string
}

interface State {
  math: number,
  notMath: number,
  support: number,
  noSupport: number,
  noTeacherOpp: number,
  conferencePlanId: string,
  sessionId: string,
  math1: number,
  math2: number,
  math3: number,
  math4: number,
  teacher1: number,
  teacher2: number,
  teacher3: number,
  teacher4: number,
  trendsDates: Array<Array<string>>,
  trendsMath: Array<number>,
  trendsNotMath: Array<number>,
  trendsNoTeacherOpp: Array<number>,
  trendsNoSupport: Array<number>,
  trendsSupport: Array<number>,
  notes: Array<{id: string, content: string, timestamp: string}>,
  actionPlanExists: boolean,
  conferencePlanExists: boolean,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionDates: Array<{id: string, sessionStart: {value: string}}>,
  noteAdded: boolean,
  questionAdded: boolean,
  teacherModal: boolean,
  noDataYet: boolean
}

/**
 * math results
 * @class MathInstructionResultsPage
 */
class MathInstructionResultsPage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      math: 0,
      notMath: 0,
      support: 0,
      noSupport: 0,
      noTeacherOpp: 0,
      sessionId: '',
      conferencePlanId: '',
      math1: 0,
      math2: 0,
      math3: 0,
      math4: 0,
      teacher1: 0,
      teacher2: 0,
      teacher3: 0,
      teacher4: 0,
      trendsDates: [],
      trendsMath: [],
      trendsNotMath: [],
      trendsNoTeacherOpp: [],
      trendsNoSupport: [],
      trendsSupport: [],
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: [],
      noteAdded: false,
      questionAdded: false,
      teacherModal: false,
      noDataYet: false
    };
  }

  /**
   * @param {string} teacherId
   */
  handleTrendsFetching = (teacherId: string): void => {
    this.handleChildTrendsFetch(teacherId);
    this.handleTeacherTrendsFetch(teacherId);
  };

  /**
   * @param {string} sessionId
   */
  handleNotesFetching = (sessionId: string): void => {
    const firebase = this.context;
    firebase.handleFetchNotesResults(sessionId).then((notesArr: Array<{id: string, content: string, timestamp: {seconds: number, nanoseconds: number}}>) => {
      const formattedNotesArr: Array<{id: string, content: string, timestamp: string}> = [];
      notesArr.forEach(note => {
        const newTimestamp = new Date(
          note.timestamp.seconds * 1000
        ).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true
        });
        formattedNotesArr.push({
          id: note.id,
          content: note.content,
          timestamp: newTimestamp
        });
      });
      this.setState({
        notes: formattedNotesArr
      });
    });
  };

  /**
   * @param {string} teacherId
   */
  handleDateFetching = (teacherId: string): void => {
    const firebase = this.context;
    this.setState({
      math: 0,
      notMath: 0,
      support: 0,
      noSupport: 0,
      noTeacherOpp: 0,
      sessionId: '',
      conferencePlanId: '',
      math1: 0,
      math2: 0,
      math3: 0,
      math4: 0,
      teacher1: 0,
      teacher2: 0,
      teacher3: 0,
      teacher4: 0,
      trendsDates: [],
      trendsMath: [],
      trendsNotMath: [],
      trendsNoTeacherOpp: [],
      trendsNoSupport: [],
      trendsSupport: [],
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: [],
      noDataYet: false
    }, () => {
      const teacherIndex = this.props.sessionDates.map(e => e.teacherId).indexOf(teacherId);
      if (teacherIndex > -1) { // if teacher in redux sessionDatesState
        const toolIndex = this.props.sessionDates[teacherIndex].data.map(e => e.tool).indexOf('MI');
        if (toolIndex > -1 && this.props.sessionDates[teacherIndex].data[toolIndex].sessions.length > 0) { // if math for this teacher in sessionDatesState
          this.setState({
            sessionDates: this.props.sessionDates[teacherIndex].data[toolIndex].sessions,
            noDataYet: false
          }, () => {
            if (this.state.sessionDates[0]) {
              this.setState({ sessionId: this.state.sessionDates[0].id },
                () => {
                  this.getData();
                }
              );
            }
          })
        } else { // teacher exists but not math
          firebase.fetchSessionDates(teacherId, "math").then((dates: Array<{id: string, sessionStart: {value: string}}>) => {
            if (dates[0]) {
              this.setState({
                sessionDates: dates,
                noDataYet: false
              }, () => {
                if (this.state.sessionDates[0]) {
                  this.setState({ sessionId: this.state.sessionDates[0].id },
                    () => {
                      this.getData();
                    }
                  );
                }
              })
            } else {
              this.setState({
                noDataYet: true
              })
            }
            this.props.addTool([{
              teacherId: teacherId,
              data: [{
                tool: 'MI',
                sessions: dates
              }]
            }]);
          });
        }
      } else { // teacher not in redux sessionDatesState
        firebase.fetchSessionDates(teacherId, "math").then((dates: Array<{id: string, sessionStart: {value: string}}>) => {
          if (dates[0]) {
            this.setState({
              sessionDates: dates,
              noDataYet: false
            }, () => {
              if (this.state.sessionDates[0]) {
                this.setState({ sessionId: this.state.sessionDates[0].id },
                  () => {
                    this.getData();
                  }
                );
              }
            })
          } else {
            this.setState({
              noDataYet: true
            })
          }
          this.props.addTeacher({
            teacherId: teacherId,
            data: [{
              tool: 'MI',
              sessions: dates
            }]
          });
        });
      }
    })
  };

  /**
   * @param {string} teacherId
   */
  handleChildTrendsFetch = (teacherId: string): void => {
    const firebase = this.context;
    const dateArray: Array<Array<string>> = [];
    const mathArray: Array<number> = [];
    const notMathArray: Array<number> = [];

    const reduxIndex = this.props.mathChildTrends.map(e => e.teacherId).indexOf(teacherId);

    const handleTrendsData = async (trendsData: Types.MathData['childTrends']): Promise<void> => {
      trendsData.forEach((data: {startDate: {value: string}, math: number, notMath: number}) => {
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
        ]);
        mathArray.push(Math.round((data.math / (data.math + data.notMath)) * 100));
        notMathArray.push(Math.round((data.notMath / (data.math + data.notMath)) * 100));
      });
    };

    if ((reduxIndex > -1) && (this.props.mathChildTrends[reduxIndex].childTrends !== undefined)) {
      handleTrendsData(this.props.mathChildTrends[reduxIndex].childTrends).then(() => {
        this.setState({
          trendsDates: dateArray,
          trendsMath: mathArray,
          trendsNotMath: notMathArray
        })
      })
    } else {
      firebase.fetchChildMathTrend(teacherId)
      .then((dataSet: Array<{startDate: {value: string}, math: number, notMath: number}>) => {
        handleTrendsData(dataSet).then(() => {
          this.setState({
            trendsDates: dateArray,
            trendsMath: mathArray,
            trendsNotMath: notMathArray
          });
        })
        this.props.addMathChildTrends({
          teacherId: teacherId,
          childTrends: dataSet
        })
      });
    }
  };

  /**
   * @param {string} teacherId
   */
  handleTeacherTrendsFetch = (teacherId: string): void => {
    const firebase = this.context;
    const dateArray: Array<Array<string>> = [];
    const supportArray: Array<number> = [];
    const noSupportArray: Array<number> = [];
    const noOppArray: Array<number> = [];

    const reduxIndex = this.props.mathTeacherTrends.map(e => e.teacherId).indexOf(teacherId);

    const handleTrendsData = async (trendsData: Types.MathData['teacherTrends']): Promise<void> => {
      trendsData.forEach((data: {startDate: {value: string}, noOpportunity: number, support: number, noSupport: number}) => {
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
        ]);
        supportArray.push(Math.round((data.support / (data.noOpportunity + data.noSupport + data.support)) * 100));
        noSupportArray.push(Math.round((data.noSupport / (data.noOpportunity + data.noSupport + data.support)) * 100));
        noOppArray.push(Math.round((data.noOpportunity / (data.noOpportunity + data.noSupport + data.support)) * 100));
      });
    };

    if ((reduxIndex > -1) && (this.props.mathTeacherTrends[reduxIndex].teacherTrends !== undefined)) {
      handleTrendsData(this.props.mathTeacherTrends[reduxIndex].teacherTrends).then(() => {
        this.setState({
          trendsDates: dateArray,
          trendsSupport: supportArray,
          trendsNoSupport: noSupportArray,
          trendsNoTeacherOpp: noOppArray
        })
      })
    } else {
      firebase.fetchTeacherMathTrend(teacherId)
      .then((dataSet: Array<{startDate: {value: string}, noOpportunity: number, support: number, noSupport: number}>) => {
        handleTrendsData(dataSet).then(() => {
          this.setState({
            trendsDates: dateArray,
            trendsSupport: supportArray,
            trendsNoSupport: noSupportArray,
            trendsNoTeacherOpp: noOppArray
          });
        })
        this.props.addMathTeacherTrends({
          teacherId: teacherId,
          teacherTrends: dataSet
        })
      });
    }
  };

  /**
   * specifies formatting for child trends
   * @return {object}
   */
  handleTrendsChildFormatData = (): {
      labels: Array<Array<string>>,
      datasets: Array<{
        label: string,
        backgroundColor: string,
        borderColor: string,
        fill: boolean,
        lineTension: number,
        data: Array<number>
      }>
    } => {
    return {
      labels: this.state.trendsDates,
      datasets: [
        {
          label: "Non-Math Activities",
          backgroundColor: '#ec2409',
          borderColor: '#ec2409',
          fill: false,
          lineTension: 0,
          data: this.state.trendsNotMath
        },
        {
          label: "Math",
          backgroundColor: Constants.Colors.MI,
          borderColor: Constants.Colors.MI,
          fill: false,
          lineTension: 0,
          data: this.state.trendsMath
        }
      ]
    };
  };

  /**
   * specifies formatting for teacher trends
   * @return {object}
   */
  handleTrendsTeacherFormatData = (): {
    labels: Array<Array<string>>,
    datasets: Array<{
      label: string,
      backgroundColor: string,
      borderColor: string,
      fill: boolean,
      lineTension: number,
      data: Array<number>
    }>,
  } => {
    return {
      labels: this.state.trendsDates,
      datasets: [
        {
          label: "Teacher Not at Center",
          backgroundColor: Constants.Colors.NotPresent,
          borderColor: Constants.Colors.NotPresent,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoTeacherOpp
        },
        {
          label: "No Support",
          backgroundColor: Constants.Colors.RedGraph,
          borderColor: Constants.Colors.RedGraph,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoSupport
        },
        {
          label: "Teacher Support",
          backgroundColor: Constants.Colors.AppBar,
          borderColor: Constants.Colors.AppBar,
          fill: false,
          lineTension: 0,
          data: this.state.trendsSupport
        },
      ]
    };
  };

  /**
   * retrieves summary, details, and notes data using the session id
   */
  getData = (): void => {
    const firebase = this.context;
    this.handleNotesFetching(this.state.sessionId);
    firebase.getConferencePlan(this.state.sessionId)
    .then((conferencePlanData: Array<{id: string, feedback: string, questions: Array<string>, notes: string, date: Date}>) => {
      if (conferencePlanData[0]) {
        this.setState({
          conferencePlanExists: true,
          conferencePlanId: conferencePlanData[0].id
        })
      } else {
        this.setState({
          conferencePlanExists: false,
          conferencePlanId: ''
        })
      }
    }).catch(() => {
      console.log('unable to retrieve conference plan')
    })

    const reduxIndex = this.props.mathResults.map(e => e.sessionId).indexOf(this.state.sessionId);

    if ((reduxIndex > -1) && this.props.mathResults[reduxIndex].childSummary !== undefined) {
      this.setState({
        math: this.props.mathResults[reduxIndex].childSummary.math,
        notMath: this.props.mathResults[reduxIndex].childSummary.notMath,
      });
    } else {
      firebase.fetchChildMathSummary(this.state.sessionId)
      .then((summary: {math: number, notMath: number}) => {
        this.setState({
          math: summary.math,
          notMath: summary.notMath,
        });
        this.props.addMathChildSummary({
          sessionId: this.state.sessionId,
          teacherId: this.props.teacherSelected.id,
          childSummary: {
            math: summary.math,
            notMath: summary.notMath
          }
        })
      });
    }

    if ((reduxIndex > -1) && this.props.mathResults[reduxIndex].teacherSummary !== undefined) {
      this.setState({
        support: this.props.mathResults[reduxIndex].teacherSummary.support,
        noSupport: this.props.mathResults[reduxIndex].teacherSummary.noSupport,
        noTeacherOpp: this.props.mathResults[reduxIndex].teacherSummary.noOpportunity,
      });
    } else {
      firebase.fetchTeacherMathSummary(this.state.sessionId)
      .then((summary: {noOpportunity: number, noSupport: number, support: number}) => {
        this.setState({
          noTeacherOpp: summary.noOpportunity,
          noSupport: summary.noSupport,
          support: summary.support,
        });
        this.props.addMathTeacherSummary({
          sessionId: this.state.sessionId,
          teacherId: this.props.teacherSelected.id,
          teacherSummary: {
            support: summary.support,
            noSupport: summary.noSupport,
            noOpportunity: summary.noOpportunity
          }
        })
      });
    }

    if ((reduxIndex > -1) && this.props.mathResults[reduxIndex].details !== undefined) {
      this.setState({
        math1: this.props.mathResults[reduxIndex].details.math1,
        math2: this.props.mathResults[reduxIndex].details.math2,
        math3: this.props.mathResults[reduxIndex].details.math3,
        math4: this.props.mathResults[reduxIndex].details.math4,
        teacher1: this.props.mathResults[reduxIndex].details.teacher1,
        teacher2: this.props.mathResults[reduxIndex].details.teacher2,
        teacher3: this.props.mathResults[reduxIndex].details.teacher3,
        teacher4: this.props.mathResults[reduxIndex].details.teacher4
      });
    } else {
      firebase.fetchMathDetails(this.state.sessionId)
      .then((summary: {
        math1: number,
        math2: number,
        math3: number,
        math4: number,
        teacher1: number,
        teacher2: number,
        teacher3: number,
        teacher4: number
      }) => {
        this.setState({
          math1: summary.math1,
          math2: summary.math2,
          math3: summary.math3,
          math4: summary.math4,
          teacher1: summary.teacher1,
          teacher2: summary.teacher2,
          teacher3: summary.teacher3,
          teacher4: summary.teacher4
        });
        this.props.addMathDetails({
          sessionId: this.state.sessionId,
          teacherId: this.props.teacherSelected.id,
          details: {
            math1: summary.math1,
            math2: summary.math2,
            math3: summary.math3,
            math4: summary.math4,
            teacher1: summary.teacher1,
            teacher2: summary.teacher2,
            teacher3: summary.teacher3,
            teacher4: summary.teacher4
          }
        })
      })
    }
  }

  /**
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  changeSessionId = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    this.setState(
      {
        sessionId: event.target.value
      },
      () => {
        this.getData();
      }
    );
  };

  /**
   * @param {string} conferencePlanId
   * @param {string} note
   */
  addNoteToPlan = (conferencePlanId: string, note: string): void => {
    const firebase = this.context;
    if (!conferencePlanId) {
      firebase.createConferencePlan(this.props.teacherSelected.id, this.state.sessionId, 'Math Instruction')
        .then(() => {
          firebase.getConferencePlan(this.state.sessionId).then((conferencePlanData: Array<{id: string, feedback: string, questions: Array<string>, notes: string, date: Date}>) => {
            if (conferencePlanData[0]) {
              this.setState({
                conferencePlanExists: true,
                conferencePlanId: conferencePlanData[0].id
              })
            } else {
              this.setState({
                conferencePlanExists: false,
                conferencePlanId: ''
              })
            }
          }).then(() => {
            firebase.addNoteToConferencePlan(this.state.conferencePlanId, note)
            .then(() => {
              this.setState({ noteAdded: true }, () => {
                setTimeout(() => {
                  this.setState({ noteAdded: false })
                }, 1500);
              })
            })
          })
        })
    } else {
      firebase.addNoteToConferencePlan(conferencePlanId, note)
      .then(() => {
        this.setState({ noteAdded: true }, () => {
          setTimeout(() => {
            this.setState({ noteAdded: false })
          }, 1500);
        })
      })
    }
  }

  /**
   * checks if question has already been added and if not, adds it
   * @param {string} panelTitle
   * @param {number} index
   * @param {string} question
   * @param {string} sessionId
   * @param {string} teacherId
   * @param {string} magic8
   */
  handleAddToPlan = (panelTitle: string, index: number, question: string, sessionId: string, teacherId: string, magic8: string): void => {
    const firebase = this.context;
    const itemIndex = this.state.addedToPlan.findIndex(e => e.panel === panelTitle && e.number === index);
    if (itemIndex === -1) {
      this.setState({ addedToPlan: [...this.state.addedToPlan, {panel: panelTitle, number: index, question: question}] });
    } else {
      const newArray = [...this.state.addedToPlan];
      newArray.splice(itemIndex, 1);
      this.setState({ addedToPlan: newArray });
    }
    firebase.getConferencePlan(sessionId)
    .then((conferencePlanData: Array<{id: string, feedback: Array<string>, questions: Array<string>, addedQuestions: Array<string>, notes: Array<string>, date: string}>) => {
      if (conferencePlanData[0]) {
        firebase.saveConferencePlanQuestion(sessionId, question)
        .then(() => {
          this.setState({ questionAdded: true }, () => {
            setTimeout(() => {
              this.setState({ questionAdded: false })
            }, 1500);
          })
        })
        this.setState({
          conferencePlanExists: true,
          conferencePlanId: conferencePlanData[0].id
        })
      } else {
        firebase.createConferencePlan(teacherId, sessionId, magic8)
        .then(() => {
          firebase.getConferencePlan(sessionId).then((conferencePlanData: Array<{id: string, feedback: string, questions: Array<string>, notes: string, date: Date}>) => {
            if (conferencePlanData[0]) {
              this.setState({
                conferencePlanExists: true,
                conferencePlanId: conferencePlanData[0].id
              })
            } else {
              this.setState({
                conferencePlanExists: false,
                conferencePlanId: ''
              })
            }
          })
          firebase.saveConferencePlanQuestion(sessionId, question)
          .then(() => {
            this.setState({ questionAdded: true }, () => {
              setTimeout(() => {
                this.setState({ questionAdded: false })
              }, 1500);
            })
          })
          this.setState({
            conferencePlanExists: true
          })
        })
      }
    })
  };

  handleCloseTeacherModal = (): void => {
    this.setState({ teacherModal: false })
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    if (this.props.teacherSelected) {
      this.handleDateFetching(this.props.teacherSelected.id);
      this.handleTrendsFetching(this.props.teacherSelected.id);
    } else {
      this.setState({ teacherModal: true })
    }
  }

  /** 
   * lifecycle method invoked after component updates 
   * @param {Props} prevProps
   */
  componentDidUpdate(prevProps: Props): void {
    if (this.props.teacherSelected != prevProps.teacherSelected) {
      this.handleDateFetching(this.props.teacherSelected.id);
      this.handleTrendsFetching(this.props.teacherSelected.id);
    }
  }

  static propTypes = {
    classes: PropTypes.exact({
      root: PropTypes.string
    }).isRequired,
    teacherSelected: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string
    }).isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    const chosenQuestions = this.state.addedToPlan.map((value) => {
      return(
        value.question
      )
    })
    return (
      this.props.teacherSelected ? (
        <div className={classes.root}>
          <FadeAwayModal open={this.state.noteAdded} text="Note added to conference plan." />
          <FadeAwayModal open={this.state.questionAdded} text="Question added to conference plan." />
          <ResultsLayout
            teacher={this.props.teacherSelected}
            magic8="Math Instruction"
            summary={
              <SummarySlider
                math={this.state.math}
                notMath={this.state.notMath}
                support={this.state.support}
                noSupport={this.state.noSupport}
                noTeacherOpp={this.state.noTeacherOpp}
              />
            }
            details={
              <DetailsSlider
                math1={this.state.math1}
                math2={this.state.math2}
                math3={this.state.math3}
                math4={this.state.math4}
                teacher1={this.state.teacher1}
                teacher2={this.state.teacher2}
                teacher3={this.state.teacher3}
                teacher4={this.state.teacher4}
                totalVisits={this.state.math + this.state.notMath}
              />
            }
            trendsGraph={
              <TrendsSlider
                childData={this.handleTrendsChildFormatData}
                teacherData={this.handleTrendsTeacherFormatData}
              />
            }
            changeSessionId={this.changeSessionId}
            sessionId={this.state.sessionId}
            conferencePlanId={this.state.conferencePlanId}
            addNoteToPlan={this.addNoteToPlan}
            sessionDates={this.state.sessionDates}
            notes={this.state.notes}
            questions={
              <MathCoachingQuestions
                handleAddToPlan={this.handleAddToPlan}
                sessionId={this.state.sessionId}
                teacherId={this.props.teacherSelected.id}
              />
            }
            chosenQuestions={chosenQuestions}
            actionPlanExists={this.state.actionPlanExists}
            conferencePlanExists={this.state.conferencePlanExists}
            noDataYet={this.state.noDataYet}
          />
        </div>
      ) : (
        <FirebaseContext.Consumer>
          {(firebase: {
            getTeacherList(): Promise<Types.Teacher[]>
          }): React.ReactElement => (
            <TeacherModal
              handleClose={this.handleCloseTeacherModal}
              firebase={firebase}
              type={"Results"}
            />
          )}
        </FirebaseContext.Consumer>
      )
    );
  }
}

const mapStateToProps = (state: Types.ReduxState): {
  teacherSelected: Types.Teacher,
  sessionDates: Array<{
    teacherId: string,
    data: Array<{
      tool: string,
      sessions: Array<{id: string, sessionStart: {value: string}}>
    }>
  }>,
  mathResults: Array<{
    teacherId: string,
    sessionId: string,
    childSummary: Types.MathData['childSummary'],
    teacherSummary: Types.MathData['teacherSummary'],
    details: Types.MathData['childDetails'] & Types.MathData['teacherDetails']
  }>,
  mathChildTrends: Array<{
    teacherId: string,
    childTrends: Types.MathData['childTrends']
  }>,
  mathTeacherTrends: Array<{
    teacherId: string,
    teacherTrends: Types.MathData['teacherTrends']
  }>,
} => {
  return {
    teacherSelected: state.teacherSelectedState.teacher,
    sessionDates: state.sessionDatesState.dates,
    mathResults: state.mathResultsState.mathResults,
    mathChildTrends: state.mathResultsState.mathChildTrends,
    mathTeacherTrends: state.mathResultsState.mathTeacherTrends
  };
};

MathInstructionResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps, {
  addMathChildSummary,
  addMathTeacherSummary,
  addMathDetails,
  addMathChildTrends,
  addMathTeacherTrends,
  addTeacher,
  addTool
})(MathInstructionResultsPage));