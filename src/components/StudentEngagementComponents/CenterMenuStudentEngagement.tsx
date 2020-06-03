import * as React from "react";
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent  from '@material-ui/core/CardContent';
import Paper  from '@material-ui/core/Paper';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import Modal from "@material-ui/core/Modal"
import ObserveImage from '../../assets/images/ObserveImage.png';

const styles: object = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
        background: '#ede7f6',
        backgroundColor: '#e99b2e',
    },
    gridList: {
        width: 500,
        height: 360,
    },
    inline: {
        display: 'inline',
    },
    paper: {
        position: "absolute",
        width: "67%",
        backgroundColor: 'white',
        padding: '2em',
        borderRadius: 8
    }
});

/**
 * specifies styling for modal
 * @return {css}
 */
function getModalStyle() {
    return {
        position: "fixed",
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`
    } as React.CSSProperties;
}

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#e99b2e',
        borderColor: '#e99b2e',
        textColor: '#ffffff',
        borderRadius: '50%',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

interface Style {
    paper: string,
}

interface Props {
    classes: Style,
    teacherId: string,
    observedBy: number,
    time: number,
    handleTimerReset(): void,
    handleTimerStart(): void,
    firebase: {
        auth: {
            currentUser: {
                uid: string
            }
        },
        handleSession(entry: object): void,
        handlePushSEEachEntry(mEntry: object): void
    },
}

interface State {
    students: Array<string>,
    open: boolean,
    setOpen: boolean,
    studentTextFieldValue: string
    status: any,
    currentStudent: number,
    entries: number,
    selectedPoint: number,
    modal: boolean
}

const NAME_LIST = 0;
const OBSERVATION = 1;

/**
 * Student Engagement Name Collection Page
 * @class CenterMenuStudentEngagement
 */
class CenterMenuStudentEngagement extends React.Component<Props, State> {

    /**
     * @param {Props} props
     */
    constructor(props) {
        super(props);
        const mEntry = {
            teacher: this.props.teacherId,
            observedBy: this.props.firebase.auth.currentUser.uid,
            type: "engagement",
        };
        this.props.firebase.handleSession(mEntry);
    }

    state = {
        students: [] as string[],
        open: false,
        setOpen: false,
        studentTextFieldValue: '' as string,
        status: NAME_LIST as any,
        currentStudent: 0 as number,
        selectedPoint: -1 as number,
        entryType: -1 as number,
        entries: 0 as number,
        modal: true as boolean,
    };


    handleClickOpen = () => {
        this.setState({ setOpen: true });
    };

    handleClose = () => {
        this.setState({ setOpen: false });
    };

    handleAddStudent = (studentName: string): void => {
        if(studentName){
            const newList = this.state.students.concat(studentName);
            this.setState({ students: newList, studentTextFieldValue: '', setOpen: false });
        }
    };

    handleStudentTextFieldChange = (e : React.ChangeEvent<{}>): void =>{
        this.setState({
            studentTextFieldValue: e.target.value
        });
    }

    switchToObservationPage = () => {
        this.setState({ status: OBSERVATION });
        this.props.onStatusChange(true);
    }

    switchToNameList = () => {
        this.setState({ status: NAME_LIST });
        this.props.onStatusChange(false);
    }

    handleSkipRating = () => {
        this.props.handleTimerReset();
        this.handleSelectedValue(-1);
        let entryType = 'none';
        switch(this.state.entryType){
            case 0: entryType = 'small';
                break;
            case 1: entryType = 'whole';
                break;
            case 2: entryType = 'transition';
                break;
            default:
                 entryType = 'none';
        }
        let mEntry= {"id": this.generateHashCodeOfStudent(), "point": this.state.selectedPoint, entryType: entryType};
        this.props.firebase.handlePushSEEachEntry(mEntry);
        this.setState({ currentStudent: (this.state.currentStudent +1) % this.state.students.length });
        this.showModalForNextPerson();
    }

    handleConfirmRating = () => {
        if(this.state.selectedPoint !== -1){
            let entryType = 'none';
            switch(this.state.entryType){
                case 0: entryType = 'small';
                    break;
                case 1: entryType = 'whole';
                    break;
                case 2: entryType = 'transition';
                    break;
                default:
                    entryType = 'none';
            }
            let mEntry= {"id": this.generateHashCodeOfStudent(), "point": this.state.selectedPoint, entryType: entryType};
            console.log(mEntry);
            this.props.firebase.handlePushSEEachEntry(mEntry);
            this.setState({ currentStudent: (this.state.currentStudent +1) % this.state.students.length });
            this.props.handleTimerReset();
            this.handleSelectedValue(-1);
            this.setState({entries: this.state.entries+1});
            this.showModalForNextPerson();
        }
    }

    showModalForNextPerson = () =>{
        this.setState({modal: true});
        this.props.handleTimerReset();
    }

    beginObservingStudent = () =>{
        this.setState({modal: false});
        this.props.handleTimerStart();
    }

    generateHashCodeOfStudent = function(){
       return this.hashCode(this.state.students[this.state.currentStudent].concat(this.state.currentStudent))
    }

    /**
     * Returns a hash code for a string.
     * (Compatible to Java's String.hashCode())
     *
     * The hash code for a string object is computed as
     *     s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
     * using number arithmetic, where s[i] is the i th character
     * of the given string, n is the length of the string,
     * and ^ indicates exponentiation.
     * (The hash value of the empty string is zero.)
     *
     * @param {string} s a string
     * @return {number} a hash code value for the given string.
     */
    hashCode = function(s: string) {
        let h = 0; const l = s.length; let i = 0;
        if ( l > 0 )
            while (i < l)
                h = (h << 5) - h + s.charCodeAt(i++) | 0;
        return h;
    };

    handleSelectedValue=(point: number) =>{
        this.setState({ selectedPoint: point });
    }

    handleSelectedType = (type: number) => {
        this.setState({ entryType: type });
    }


    static propTypes = {
        classes: PropTypes.object.isRequired,
        onStatusChange: PropTypes.func.isRequired,
        teacherId: PropTypes.string,
        firebase: PropTypes.object.isRequired,
        time: PropTypes.number.isRequired,
        handleTimerReset: PropTypes.func.isRequired,
        handleTimerStart: PropTypes.func.isRequired,
    }


    /**
     * render function
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        const { classes, time } = this.props;
        switch (this.state.status) {
            case NAME_LIST:
                return (
                    <Grid
                        container
                        alignItems={'center'}
                        justify={'center'}
                        direction={'column'}
                    >
                        <Dialog
                            open={this.state.setOpen}
                            onClose={() => this.handleClose()}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {'Enter Student Name'}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    You can add a description of the Student for
                                    Your Reference.
                                    <form>
                                        <TextField
                                            id="name-filled"
                                            label="Student Name"
                                            variant="outlined"
                                            color="secondary"
                                            fullWidth
                                            value={
                                                this.state.studentTextFieldValue
                                            }
                                            onChange={
                                                this
                                                    .handleStudentTextFieldChange
                                            }
                                        />
                                    </form>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() => this.handleClose()}
                                    color="secondary"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() =>
                                        this.handleAddStudent(
                                            this.state.studentTextFieldValue.toString()
                                        )
                                    }
                                    color="secondary"
                                    autoFocus
                                >
                                    Add
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Grid
                            container
                            alignItems="center"
                            direction="row"
                            justify={'center'}
                            xs={12}
                            style={{ margin: 40 }}
                        >
                            <Grid
                                alignItems="flex-end"
                                direction="row"
                                justify="flex-end"
                                container
                                item
                                xs={8}
                            >
                                <Typography
                                    variant="h4"
                                    gutterBottom
                                    style={{ fontFamily: 'Arimo' }}
                                >
                                    Create Student List
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    style={{ fontFamily: 'Arimo' }}
                                >
                                    Please Enter the Student Names.
                                </Typography>
                            </Grid>
                            <Grid
                                alignItems="flex-start"
                                direction="row"
                                justify="center"
                                container
                                item
                                xs={4}
                            >
                                <Fab
                                    className={classes.button}
                                    aria-label="add"
                                    onClick={() => this.handleClickOpen()}
                                >
                                    <AddIcon />
                                </Fab>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            alignItems="center"
                            direction="row"
                            justify="center"
                        >
                            <Grid
                                alignItems="flex-start"
                                direction="row"
                                justify="flex-start"
                                container
                                item
                                xs={12}
                            >
                                <GridList
                                    cellHeight={60}
                                    className={classes.gridList}
                                    cols={4}
                                >
                                    {this.state.students.map(
                                        (student: string, i: number) => {
                                            return (
                                                <GridListTile
                                                    key={i + 'grid'}
                                                    cols={1}
                                                >
                                                    <Card>
                                                        <CardContent>
                                                            <Paper
                                                                className={
                                                                    classes.root
                                                                }
                                                                elevation={1}
                                                                style={{
                                                                    padding: 8,
                                                                }}
                                                            >
                                                                <Typography variant="subtitle2">
                                                                    {i +
                                                                        1 +
                                                                        ' : ' +
                                                                        student
                                                                            .charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase() +
                                                                        student.substring(
                                                                            1
                                                                        )}
                                                                </Typography>
                                                            </Paper>
                                                        </CardContent>
                                                    </Card>
                                                </GridListTile>
                                            )
                                        }
                                    )}
                                </GridList>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            alignItems="center"
                            direction="column"
                            justify="flex-start"
                        >
                            <Button
                                key={'Begin'}
                                variant="contained"
                                className={classes.button}
                                onClick={() => this.switchToObservationPage()}
                                disabled={this.state.students.length === 0}
                            >
                                Begin Observation
                            </Button>
                        </Grid>
                    </Grid>
                )
            case OBSERVATION:
                return (
                    <>
                        <Modal
                            open={this.state.modal}>
                            <div style={getModalStyle()} className={classes.paper}>
                                <Grid
                                    container
                                    alignItems="center"
                                    direction="column"
                                    justify="flex-start"
                                >
                                    <Typography variant="h6" gutterBottom style={{fontFamily: "Arimo"}}>
                                       Start Observing this Student
                                    </Typography>
                                    <Typography variant="h4" gutterBottom style={{fontFamily: "Arimo"}}>
                                        {this.state.students[this.state.currentStudent].charAt(0).toUpperCase()+this.state.students[this.state.currentStudent].substr(1)}
                                    </Typography>
                                    <Grid
                                        alignItems="center"
                                        direction="column"
                                        justify="space-evenly"
                                        container
                                        item xs={6}
                                    >
                                        <img src={ObserveImage} onClick={() =>this.beginObservingStudent()}/>
                                        <Button color="primary" variant="contained" className={classes.button} style={{fontFamily: "Arimo"}} onClick={() =>this.beginObservingStudent()}>
                                            Begin Observation
                                        </Button>
                                        <Button variant="outlined"  style={{fontFamily: "Arimo", color: "red", }} onClick={() =>this.handleSkipRating()}>
                                            Skip
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Modal>
                    <Button variant="flat" style={{margin: 10}} onClick={() =>this.switchToNameList()}>
                        <BackIcon/>  Back
                    </Button>

                    <Grid
                        container
                        alignItems="center"
                        direction="row"
                        justify={'center'}
                        xs={12}
                    >
                        <Grid
                            alignItems="center"
                            direction="row"
                            justify="space-between"
                            container
                            item xs={12}
                            style={{height: 10}}
                        >
                            <Grid item xs={10}>
                            </Grid>
                            <Grid item xs={2}>
                            </Grid>
                        </Grid>
                        <Grid
                            alignItems="center"
                            direction="row"
                            justify="center"
                            container
                            item xs={12}
                        >
                            <Typography variant="h6" gutterBottom style={{fontFamily: "Arimo"}}>
                                 {this.props.time != 0?"Please observe ":"Now Rate "}this Student's level of Engagement.
                            </Typography>
                        </Grid>
                        <Grid
                            alignItems="center"
                            direction="row"
                            justify="center"
                            container
                            item xs={12}
                        >
                            <Typography variant="h4" gutterBottom style={{fontFamily: "Arimo"}}>
                                {this.state.students[this.state.currentStudent].charAt(0).toUpperCase()+this.state.students[this.state.currentStudent].substr(1)}
                            </Typography>
                        </Grid>
                        <Grid
                            alignItems="stretch"
                            direction="row"
                            justify="space-between"
                            container
                            item xs={8}
                            style={{marginTop: 50, marginBottom: 50}}
                        >
                            <Button
                                variant={this.state.selectedPoint === 0? "contained": "outlined"}
                                disabled={this.props.time!=0?true:false}
                                style={{
                                    minHeight: 100,
                                    maxHeight: 100,
                                    minWidth: 100,
                                    maxWidth: 100,
                                    fontFamily: "Arimo",
                                    fontSize: 14
                                }}
                                onClick={()=>this.handleSelectedValue(0)}
                            >
                                <Grid
                                    alignItems="center"
                                    direction="column"
                                    justify="center"
                                    container
                                    item xs={12}
                                >
                                <Typography variant="h4" gutterBottom style={{fontFamily: "Arimo"}}>
                                    <b>0</b>
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    Off Task
                                </Typography>
                                </Grid>
                            </Button>
                            <Button
                                variant={this.state.selectedPoint === 1? "contained": "outlined"}
                                disabled={this.props.time!=0?true:false}
                                style={{
                                    minHeight: 100,
                                    maxHeight: 100,
                                    minWidth: 100,
                                    maxWidth: 100,
                                    fontFamily: "Arimo",
                                    fontSize: 14
                                }}
                                onClick={()=>this.handleSelectedValue(1)}

                            >
                                <Grid
                                    alignItems="center"
                                    direction="column"
                                    justify="center"
                                    container
                                    item xs={12}
                                >
                                <Typography variant="h4" gutterBottom style={{fontFamily: "Arimo"}}>
                                    <b>1</b>
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    Mildy Engaged
                                </Typography>
                                </Grid>
                            </Button>
                            <Button
                                disabled={this.props.time!=0?true:false}
                                variant={this.state.selectedPoint === 2? "contained": "outlined"}
                                style={{
                                    minHeight: 100,
                                    maxHeight: 100,
                                    minWidth: 100,
                                    maxWidth: 100,
                                    fontFamily: "Arimo",
                                    fontSize: 14,
                                }}
                                onClick={()=>this.handleSelectedValue(2)}
                            >
                                <Grid
                                    alignItems="center"
                                    direction="column"
                                    justify="center"
                                    container
                                    item xs={12}
                                >
                                <Typography variant="h4" gutterBottom style={{fontFamily: "Arimo"}}>
                                    <b>2</b>
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    Engaged
                                </Typography>
                                </Grid>
                            </Button>
                            <Button
                                disabled={this.props.time!=0?true:false}
                                variant={this.state.selectedPoint === 3? "contained": "outlined"}
                                style={{
                                    minHeight: 100,
                                    maxHeight: 100,
                                    minWidth: 100,
                                    maxWidth: 100,
                                    fontFamily: "Arimo",
                                    fontSize: 14
                                }}
                                onClick={()=>this.handleSelectedValue(3)}

                            >
                                <Grid
                                    alignItems="center"
                                    direction="column"
                                    justify="center"
                                    container
                                    item xs={12}
                                >
                                <Typography variant="h4" gutterBottom style={{fontFamily: "Arimo"}}>
                                    <b>3</b>
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    Highly Engaged
                                </Typography>
                                </Grid>
                            </Button>
                        </Grid>
                        <Grid
                            alignItems="stretch"
                            direction="row"
                            justify="space-around"
                            container
                            item xs={8}
                            style={{marginTop: 20, marginBottom: 20}}
                        >
                            <BootstrapButton
                                variant={this.state.entryType === 0? "contained": "outlined"}
                                style={{
                                    minHeight: 100,
                                    maxHeight: 100,
                                    minWidth: 100,
                                    maxWidth: 100,
                                    fontFamily: "Arimo",
                                    fontSize: 14,
                                    backgroundColor: this.state.entryType === 0 && "#0069d9",
                                    borderColor: this.state.entryType === 0 && "#005cbf",
                                }}
                                onClick={()=>this.handleSelectedType(0)}
                            >
                                <Grid
                                    alignItems="center"
                                    direction="column"
                                    justify="center"
                                    container
                                    item xs={12}
                                >
                                    <Typography variant="subtitle2" gutterBottom style={{color: '#ffffff'}}>
                                        Small Group
                                    </Typography>
                                </Grid>
                            </BootstrapButton>
                            <BootstrapButton
                                variant={this.state.entryType === 1? "contained": "outlined"}
                                style={{
                                    minHeight: 100,
                                    maxHeight: 100,
                                    minWidth: 100,
                                    maxWidth: 100,
                                    fontFamily: "Arimo",
                                    fontSize: 14,
                                    backgroundColor: this.state.entryType === 1 && "#0069d9",
                                    borderColor: this.state.entryType === 1 && "#005cbf",
                                }}
                                onClick={()=>this.handleSelectedType(1)}
                            >
                                <Grid
                                    alignItems="center"
                                    direction="column"
                                    justify="center"
                                    container
                                    item xs={12}
                                >
                                    <Typography variant="subtitle2" gutterBottom style={{color: '#ffffff'}}>
                                        Whole Group
                                    </Typography>
                                </Grid>
                            </BootstrapButton>
                            <BootstrapButton
                                variant={this.state.entryType === 2? "contained": "outlined"}
                                style={{
                                    minHeight: 100,
                                    maxHeight: 100,
                                    minWidth: 100,
                                    maxWidth: 100,
                                    fontFamily: "Arimo",
                                    fontSize: 14,
                                    backgroundColor: this.state.entryType === 2 && "#0069d9",
                                    borderColor: this.state.entryType === 2 && "#005cbf",
                                }}
                                onClick={()=>this.handleSelectedType(2)}
                            >
                                <Grid
                                    alignItems="center"
                                    direction="column"
                                    justify="center"
                                    container
                                    item xs={12}
                                >
                                    <Typography variant="subtitle2" gutterBottom style={{color: '#ffffff'}}>
                                        Transition
                                    </Typography>
                                </Grid>
                            </BootstrapButton>
                        </Grid>
                        <Grid
                            alignItems="center"
                            direction="row"
                            justify="space-between"
                            container
                            item xs={6}
                        >
                            <Button variant="outlined"  style={{fontFamily: "Arimo", color: "red", }} onClick={() =>this.handleSkipRating()}>
                                SKIP RATING
                            </Button>
                            <Button color="primary" variant="contained" className={classes.button} style={{fontFamily: "Arimo"}} disabled={this.state.entryType === -1 || this.state.selectedPoint === -1 || this.props.time !==0} onClick={() =>this.handleConfirmRating()}>
                                CONFIRM RATING
                            </Button>
                        </Grid>
                    </Grid>
                        </>);
            default:
                return <div>Unknown status value!!!</div>;
        }
    }


}

CenterMenuStudentEngagement.propTypes = {
    classes: PropTypes.object.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    teacherId: PropTypes.string,
    firebase: PropTypes.object.isRequired,
    time: PropTypes.number.isRequired,
    handleTimerReset: PropTypes.func.isRequired,
    handleTimerStart: PropTypes.func.isRequired,
};

export default withStyles(styles)(CenterMenuStudentEngagement);