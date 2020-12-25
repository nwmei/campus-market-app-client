import {makeStyles} from "@material-ui/core/styles";

const ExplorePageStyles = makeStyles((theme) => ({
    root: {
        paddingTop:"80px",
        flexGrow:1
    },
    filter: {
        paddingBottom:"80px"
    },
    divider: props => ({
        marginTop: (props.numberOfFilters === 0) ? "0px" : "10px"
    })
}));

export default ExplorePageStyles;