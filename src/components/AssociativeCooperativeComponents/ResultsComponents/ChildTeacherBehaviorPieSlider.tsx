import * as React from "react";
import * as PropTypes from "prop-types";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ChildBehaviorsPie from "./ChildBehaviorsPie";
import TeacherBehaviorsPie from "./TeacherBehaviorsPie";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import * as Constants from '../../../constants/Constants';

interface Props {
  ac: number,
  noAc: number,
  noChildOpp: number,
  support: number,
  noSupport: number,
  noTeacherOpp: number
}

/**
 * Swipe View for Child and Teacher Associative&Cooperative Pie Charts
 * @class ChildTeacherBehaviorPieSlider
 * @return {void}
 */
class ChildTeacherBehaviorPieSlider extends React.Component<Props, {}> {

  static propTypes = {
    ac: PropTypes.number.isRequired,
    noAc: PropTypes.number.isRequired,
    noChildOpp: PropTypes.number.isRequired,
    support: PropTypes.number.isRequired,
    noSupport: PropTypes.number.isRequired,
    noTeacherOpp: PropTypes.number.isRequired
  }
  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <Grid container justify={"center"} direction={"column"}>
              <Typography align={"center"} variant="h5" style={{fontFamily: 'Arimo'}}>
                Child Behaviors
              </Typography>
              <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                Compare how often children:
              </Typography>
              <Grid container direction="column" alignItems="center">
                <Grid item style={{width: '100%'}}>
                  <List>
                    <ListItem style={{padding: 0}}>
                      <ListItemIcon style={{margin: 0}}>
                        <SignalWifi4BarIcon style={{fill: Constants.Colors.AC, transform: 'rotate(-45deg)'}} />
                      </ListItemIcon>
                      <ListItemText primary="Engaged in associative and cooperative interactions." />
                    </ListItem>
                    <ListItem style={{padding: 0}}>
                      <ListItemIcon style={{margin: 0}}>
                        <SignalWifi4BarIcon style={{fill: Constants.Colors.RedGraph, transform: 'rotate(-45deg)'}} />
                      </ListItemIcon>
                      <ListItemText primary="Played in the same area but did not interact." />
                    </ListItem>
                    <ListItem style={{padding: 0}}>
                      <ListItemIcon style={{margin: 0}}>
                        <SignalWifi4BarIcon style={{fill: '#bababa', transform: 'rotate(-45deg)'}} />
                      </ListItemIcon>
                      <ListItemText primary="Played alone (had no opportunity for interaction)." />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <ChildBehaviorsPie
                ac={this.props.ac}
                noAc={this.props.noAc}
                noChildOpp={this.props.noChildOpp}
              />
            </Grid>
          </div>
          <div>
            <Grid container justify={"center"} direction={"column"}>
              <Typography align={"center"} variant="h5" style={{fontFamily: 'Arimo'}}>
                Teacher Behaviors
              </Typography>
              <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                Compare how often the teacher:
              </Typography>
              <Grid container direction="column" alignItems="center">
                <Grid item style={{width: '100%'}}>
                  <List>
                    <ListItem style={{padding: 0}}>
                      <ListItemIcon style={{margin: 0}}>
                        <SignalWifi4BarIcon style={{fill: Constants.Colors.AppBar, transform: 'rotate(-45deg)'}} />
                      </ListItemIcon>
                      <ListItemText primary="Supported children&apos;s associative and cooperative interactions." />
                    </ListItem>
                    <ListItem style={{padding: 0}}>
                      <ListItemIcon style={{margin: 0}}>
                        <SignalWifi4BarIcon style={{fill: Constants.Colors.RedGraph, transform: 'rotate(-45deg)'}} />
                      </ListItemIcon>
                      <ListItemText primary="Was present in the center but did not support associative and cooperative interactions." />
                    </ListItem>
                    <ListItem style={{padding: 0}}>
                      <ListItemIcon style={{margin: 0}}>
                        <SignalWifi4BarIcon style={{fill: '#bababa', transform: 'rotate(-45deg)'}} />
                      </ListItemIcon>
                      <ListItemText primary="Was not present in the centers observed." />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <TeacherBehaviorsPie
                support={this.props.support}
                noSupport={this.props.noSupport}
                noTeacherOpp={this.props.noTeacherOpp}
              />
            </Grid>
          </div>
        </Slider>
      </div>
    );
  }
}

export default (ChildTeacherBehaviorPieSlider);
