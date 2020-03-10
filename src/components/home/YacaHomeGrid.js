import React from 'react';
import injectSheet from 'react-jss';
import Grid from '@material-ui/core/Grid';
import { MobileScreenShare as Mobile, Laptop } from '@material-ui/icons';
import { Keyboard, Mouse, CameraFront, PermCameraMic, Videocam } from '@material-ui/icons';
import { BrowserView, MobileView } from "react-device-detect";
import FlapBox from './flapbox/FlapBox';

class YacaHomeGrid extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <BrowserView>
                    <Laptop className={classes.icon}
                            color="primary"
                            fontSize="large"
                    />
                    <Grid container justify="center">
                        {[0, 1, 2].map(value => (
                            <Grid key={value} item>
                                <FlapBox />
                            </Grid>
                        ))}
                    </Grid>
                </BrowserView>
                <MobileView>
                    <Mobile className={classes.icon}
                            color="primary"
                            fontSize="large"
                    />
                    <Grid container justify="center">
                        {[0, 1, 2].map(value => (
                            <Grid key={value} item>
                                <FlapBox />
                            </Grid>
                        ))}
                    </Grid>
                </MobileView>
                <Videocam className={classes.icon}
                        color="primary"
                        fontSize="large"
                />
            </React.Fragment>
        );
    }
}

const styles = {
    icon: {
    }
};

export default injectSheet(styles)(YacaHomeGrid);
