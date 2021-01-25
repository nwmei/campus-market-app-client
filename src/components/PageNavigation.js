import Button from './controls/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {makeStyles} from "@material-ui/core/styles";
import React from "react";

const usePageNavigationStyles = makeStyles((theme) => ({
  pageNavigation: props => ({
    marginTop: props.component==='myItems' ? "10px" : (props.storeItemsCount > 3 ? "10px" : "200px"),
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: props.component === "myItems" ? "0px" : "70px"
  }),
  textColor: {
    color: 'black'
  }
}));

const PageNavigation = ({backOnClick, nextOnClick, pageNumber, storeItemsCount, component}) => {
  const itemsOnPage = (storeItemsCount)
  const classes = usePageNavigationStyles({storeItemsCount, component});
  return (
    <div className={classes.pageNavigation} >
      <Button className={classes.textColor} text="back" startIcon={<ArrowBackIosIcon />} onClick={backOnClick} disabled={pageNumber===1}/>
      <h4>page {pageNumber} </h4>
      <Button className={classes.textColor} text="next" startIcon={<ArrowForwardIosIcon />} onClick={nextOnClick}/>
    </div>
  )
};

export default PageNavigation;
