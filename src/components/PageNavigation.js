import Button from './controls/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {makeStyles} from "@material-ui/core/styles";

const usePageNavigationStyles = makeStyles((theme) => ({
  pageNavigation: {
    marginTop: "10px",
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColor: {
    color: 'black'
  }
}));

const PageNavigation = ({backOnClick, nextOnClick, pageNumber}) => {
  const classes = usePageNavigationStyles();
  return (
    <div className={classes.pageNavigation} >
      <Button className={classes.textColor} text="back" startIcon={<ArrowBackIosIcon />} onClick={backOnClick} disabled={pageNumber===1}/>
      <h4>page {pageNumber} </h4>
      <Button className={classes.textColor} text="next" startIcon={<ArrowForwardIosIcon />} onClick={nextOnClick}/>
    </div>
  )
};

export default PageNavigation;
