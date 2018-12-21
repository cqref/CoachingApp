import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid";
import cyan from "@material-ui/core/colors/teal";
import SignUpForm from "./SignUpForm";
import CloseIcon from "@material-ui/icons/Close"
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
function getModalStyle () {

    return {
        position: 'fixed',
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 4 * 1 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: cyan,
    },
});

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '40%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        borderRadius: 8,
    },
});

class SignUpModal extends React.Component {
    state = {
        open: true,
        value: 0
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = (index) => {
        this.setState({ value: index });
    };

    render () {
        const {classes} = this.props;

        return (
            <div>
                <Modal
                    open={this.state.open}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Grid xs={12} container alignItems="center" direction="row" justify="space-between">
                            <Typography component={'h6'} variant={'h6'}>
                                Sign Up
                            </Typography>
                            <IconButton style={{padding: 10}}>
                                <Tooltip title={"Close"} placement={'right'}>
                                    <CloseIcon onClick={this.props.handleClose}/>
                                </Tooltip>
                            </IconButton>
                        </Grid>
                        <Grid xs={12} container alignItems="center" direction="column" justify="flex-start">
                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                    centered
                                >
                                    <Tab label="Coach" />
                                    <Tab label="Teacher" />
                                    <Tab label="Administrator" />
                                </Tabs>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={this.state.value}
                                onChangeIndex={(e,index)=>this.handleChangeIndex(index)}
                            >
                                <TabContainer dir={theme.direction}>
                                    <SignUpForm/>
                                </TabContainer>
                                <TabContainer dir={theme.direction}>
                                    <SignUpForm/>
                                </TabContainer>
                                <TabContainer dir={theme.direction}>
                                    <SignUpForm/>
                                </TabContainer>
                            </SwipeableViews>
                        </Grid>
                    </div>
                </Modal>
            </div>
        );
    }
}

SignUpModal.propTypes = {
    classes: PropTypes.object.isRequired,
    handleClose: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUpModal);