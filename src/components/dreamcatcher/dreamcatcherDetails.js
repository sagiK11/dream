import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Image from "react-image-enlarger";
import { addToCart } from "../../store/actions/dreamActions";
import {
  Grid,
  TextField,
  MenuItem,
  CircularProgress,
  Icon,
  Button,
  makeStyles,
} from "@material-ui/core";
import AddDialog from "./AddToCartDialog";

class DreamcatcherDetails extends Component {
  state = {
    amount: 1,
    isZoomed: false,
  };
  handleChange = (event) => {
    this.setState({
      amount: event.target.value,
    });
  };
  handleAmount = (event) => {
    this.setState({
      amount: event.target.value,
    });
  };
  handleAddToCart = () => {
    this.props.addToCart(this.props, this.state.amount);
  };
  setZommed = (isZoomed) => {
    this.setState({
      isZoomed,
    });
  };

  render() {
    const { dreamcatcher } = this.props;
    if (dreamcatcher) {
      return (
        <div className="container">
          <Grid container direction="row-reverse">
            <Grid container item xs={12} sm={12} md={4} lg={6}>
              <Image
                dirction="col"
                zoomed={this.state.isZoomed}
                src={dreamcatcher.img}
                alt="לוכד חלומות"
                onClick={() => this.setZommed(true)}
                className="img-details"
                onRequestClose={() => this.setZommed(false)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={6}
              container
              dirction="col"
              className="details-col"
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <ModelTitle title={dreamcatcher.model} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <ModelDescription description={dreamcatcher.description} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <ModelDiameter diameter={dreamcatcher.diameter} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <ModelInventory amount={dreamcatcher.amount} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <ModelHandMade />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <ModelPrice price={dreamcatcher.price} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <AmountSelection
                  amount={dreamcatcher.amount}
                  func={this.handleAmount}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <AddToCartButton
                  amount={this.state.amount}
                  dreamcatcher={dreamcatcher}
                  func={this.handleAddToCart}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return (
        <Grid
          container
          className="valign-wrapper"
          justify="center"
          style={{ height: "10rem" }}
        >
          <Grid item>
            <CircularProgress color="primary" />
          </Grid>
        </Grid>
      );
    }
  }
}

const ModelTitle = (props) => {
  return <h3>{props.title}</h3>;
};
const ModelDescription = (props) => {
  return (
    <div>
      <span>
        <b>תיאור</b>
      </span>
      <h6 style={paraStyle}>{props.description}</h6>
    </div>
  );
};

const ModelDiameter = (props) => {
  return (
    <div>
      <span>
        <b>קוטר</b>
      </span>
      <h6>{props.diameter} ס"מ</h6>
    </div>
  );
};

const ModelInventory = (props) => {
  return (
    <h6>
      כמות במלאי - <span>{props.amount}</span>
    </h6>
  );
};

const ModelHandMade = () => {
  return (
    <div className="center">
      <Icon>check</Icon>
      <span>עבודת יד</span>
    </div>
  );
};

const ModelPrice = (props) => {
  return <h6 className="center details-price">{props.price} &#8362;</h6>;
};

const AmountSelection = (props) => {
  const amount = props.amount;
  const isDisabled = Number(amount) === 0;
  const options = !isDisabled
    ? Array.from({ length: amount }, (_, i) => i + 1)
    : ["אזל"];

  return (
    <div className="center">
      <TextField
        variant="outlined"
        select
        size="small"
        color="primary"
        label="כמות"
        defaultValue={isDisabled ? "אזל" : 1}
        onChange={props.func}
        disabled={isDisabled}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

const AddToCartButton = (props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("עבור לסל שלי");
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
    props.func();
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const isDisabled = Number(props.dreamcatcher.amount) === 0;
  return (
    <div className="center">
      <Button
        className={isDisabled ? classes.buttonDisabled : classes.button}
        onClick={handleClickOpen}
        disabled={isDisabled}
      >
        <span>הוסיפי לסל</span>
      </Button>
      <AddDialog
        amount={props.amount}
        dreamcatcher={props.dreamcatcher}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const model = ownProps.match.params.model;
  const dreamcatchers = state.firestore.data.dreamcatchers;
  const dreamcatcher = dreamcatchers ? dreamcatchers[model] : null;
  return {
    dreamcatcher: dreamcatcher,
    profile: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (dreamcatcher, amount) =>
      dispatch(addToCart(dreamcatcher, amount)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: "dreamcatchers",
    },
  ])
)(DreamcatcherDetails);

const paraStyle = {
  lineHeight: "1.8rem",
};

const useStyles = makeStyles({
  button: {
    backgroundColor: "black",
    color: "white",
    fontSize: "1.5em",
    letterSpacing: "2px",
    minHeight: "1em",
    display: "block",
    width: "100%",
    borderRadius: "2em",
    border: "2px solid black",
    marginTop: "1em",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
  buttonDisabled: {
    backgroundColor: "white",
    fontSize: "1.5em",
    letterSpacing: "2px",
    minHeight: "1em",
    display: "block",
    width: "100%",
    borderRadius: "2em",
    border: "2px solid black",
    marginTop: "1em",
  },
});
