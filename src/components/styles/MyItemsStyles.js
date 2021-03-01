import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 185;

const MyItemsStyles = makeStyles((theme) => ({
    gridContainer: {
        flexGrow:1
    },
    subcontainer: {
        paddingTop: "10px",
    },
    divider: props => ({
        marginTop: (props.numberOfFilters === 0) ? "0px" : "10px"
    }),
    root2: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        marginTop: 90
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default MyItemsStyles;