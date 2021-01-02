import {makeStyles} from "@material-ui/core/styles";

const MyItemsStyles = makeStyles({
    gridContainer: {
        paddingRight: "40px",
        paddingTop: "80px",
        flexGrow:1
    },
    subcontainer: {
        paddingTop: "10px",
    },
    divider: props => ({
        marginTop: (props.numberOfFilters === 0) ? "0px" : "10px"
    }),
    pageNavigation: {
        marginTop: "10px",
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default MyItemsStyles;