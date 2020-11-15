import Header from './Header';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: "40px",
    paddingTop:"70px", 
  }
});

const About = () => {
  const classes = useStyles();

  return(
    <div>
      <Header />
      <div className={classes.gridContainer}>
        <h1>
          About Smarter Trade App
        </h1>
        <h2>
          A message from the Founder and CEO:
        </h2>
        <p>
          A message from the Founder and CEO:
          Our goal is to give you the power to buy and sell things with a frictionless experience
        </p>
      </div>
    </div>
  )
};

export default About;