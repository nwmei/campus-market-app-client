import {makeStyles} from "@material-ui/core/styles";

const ExplorePageStyles = makeStyles((theme) => ({
    root: {
        flexGrow:1
    },
    divider: props => ({
        marginTop: (props.numberOfFilters === 0) ? "0px" : "10px"
    }),
    main: {
        flexGrow: 1
    }
}));

export default ExplorePageStyles;