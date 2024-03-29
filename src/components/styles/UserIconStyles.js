import {makeStyles, withStyles} from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import {deepOrange} from "@material-ui/core/colors";

export const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

export const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 10
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        size: ''
    },
    margin: {
        paddingBottom: 0,
        paddingTop: 0,
    },
    button: {
        fontSize: 11,
        border:0,
        paddingBottom: 0,
        paddingTop: 0,
        color: 'black',
        textTransform: 'none'
    },
}));