import React from 'react';
import injectSheet from 'react-jss';
import Paper from '@material-ui/core/Paper';

class YacaGridItem extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Paper>
                <img className={classes.image} src={"https://cdn0.iconfinder.com/data/icons/cloud-computing-20/48/19-512.png"}></img>
            </Paper>
        );
    }
}

const styles = {
    image: {
        backgroundColor: "blue",
        height: "10em",
        width: "5em",
    }
};

export default injectSheet(styles)(YacaGridItem);
