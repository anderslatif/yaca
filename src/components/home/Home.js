import React from 'react';
import injectSheet from 'react-jss';
import YacaHomeGrid from './YacaHomeGrid';

class Home extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.background}>
                <YacaHomeGrid />
            </div>
        );
    }
}

const styles = {
    background: {
        backgroundColor: "black",
        height: "100vh",
        width: "100vw",
    }
};

export default injectSheet(styles)(Home);
