import Button from './controls/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {pageSize} from "./constants";
import {
  useWindowWidth,
} from '@react-hook/window-size'

const usePageNavigationStyles = makeStyles((theme) => ({
  pageNavigation: props => ({
    marginTop: props.component==='myItems' ? "10px" : (props.storeItemsCount > 3 ? "100px" : "200px"),
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: props.innerWidth < 480 ? "0px" : (props.component === "myItems" ? "0px" : "70px")
  }),
  textColor: {
    color: 'black'
  }
}));

const PageNavigation = ({backOnClick, nextOnClick, pageNumber, storeItemsCount, component}) => {
  const innerWidth = useWindowWidth();
  const classes = usePageNavigationStyles({storeItemsCount, component, innerWidth});
  return (
    <div className={classes.pageNavigation} >
      <Button className={classes.textColor} text="back" startIcon={<ArrowBackIosIcon />} onClick={backOnClick} disabled={pageNumber===1}/>
      <Typography className={classes.filterText} variant="subtitle1">page {pageNumber}</Typography>
      <Button className={classes.textColor} text="next" startIcon={<ArrowForwardIosIcon />} onClick={nextOnClick} disabled={storeItemsCount < pageSize}/>
    </div>
  )
};

export default PageNavigation;
