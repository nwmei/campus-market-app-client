import {makeStyles} from "@material-ui/core/styles";

const ExplorePageStyles = makeStyles((theme) => ({
    root: {
        paddingTop:"80px",
        flexGrow:1
    },
    divider: props => ({
        marginTop: (props.numberOfFilters === 0) ? "0px" : "10px"
    }),
    pageNavigation: {
        marginTop: "30px",
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

export default ExplorePageStyles;