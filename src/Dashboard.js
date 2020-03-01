import React from 'react';
import { Paper, Typography } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';

import { makeStyles } from '@material-ui/core/styles';
import { CTX } from './Store';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 50,
        padding: theme.spacing(3, 2),
    },
    flex: {
        display: 'flex',
        alignItems: 'center'

    },
    topicsWindow: {
        width: '30%',
        height: 300,
        borderRight: '1px solid grey'
    },
    chatWindow: {
        width: '70%',
        height: 300,
        padding: '20px'
    },
    chatBox: {
        width: '85%'
    },
    chip: {
        //Add styles
    },
    button: {
        width: '15%',
        marginLeft: 10
    },
}));

export default function Dashboard() {

    const classes = useStyles();

    // CTX store
    const { allChats, sendChatAction, user } = React.useContext(CTX);
    const topics = Object.keys(allChats); // Get a list of topics from State

    // local State
    const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
    const [textValue, changeTextValue] = React.useState();
    // This hook passes a value and function, the value holds state, the function is called to change state

    return (
        <div>
            <Paper className={classes.root} elevation={3}>
                <AppBar>
                    <Typography variant="h4" component="h4">
                        Chat app
                    </Typography>
                </AppBar>
                <Typography variant="h5" component="h5">
                    {activeTopic}
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem
                                        key={topic} button
                                        onClick={e => changeActiveTopic(e.target.innerText)}
                                    >
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                ))

                            }
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            allChats[activeTopic].map((chat, i) => (
                                <div className={classes.flex} key={i}>
                                    <Chip label={chat.from} className={classes.chip} />
                                    <Typography variant='body1' gutterBottom>{chat.msg}</Typography>
                                </div>
                            ))

                        }
                    </div>
                </div>
                <div className={classes.flex}>
                    <TextField
                        label="Send a chat"
                        variant="outlined"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={e => changeTextValue(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="inherit"
                        className={classes.button}
                        onClick={() => {
                            sendChatAction({ from: user, msg: textValue, topic: activeTopic });
                            changeTextValue('');
                        }
                        }
                    >
                        Send
                    </Button>
                </div>
            </Paper>
        </div>
    )
}
