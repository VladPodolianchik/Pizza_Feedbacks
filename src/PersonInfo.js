import { Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import classes from "./styles.module.css";

const DEFAULT_RATING = 3;

export default function PersonInfo({
  data = {},
  getInLocalStorage = [],
  infoFromLocalStorage,
  setForm
}) {
  const { name = "", comment = "", phone = "", rating = DEFAULT_RATING } = data;

  const handleOnClick = () => {
    infoFromLocalStorage(
      getInLocalStorage.map((elem) => {
        if (elem.name === name) {
          delete elem.rating;
          delete elem.phone;
          delete elem.comment;

          return elem;
        } else {
          return elem;
        }
      })
    );
    setForm(false);
  };

  return (
    <div className={classes.feedBackForm}>
      <div className={classes.feedBackNameWrapper}>
        <div>
          Name:
          <p className={classes.feedBackInfo}>{name}</p>
        </div>
        <p
          className={classes.feedBackBtnDelete}
          variant="contained"
          onClick={handleOnClick}
        >
          Delete
        </p>
      </div>
      <Rating name="simple-controlled" value={rating} readOnly />
      <div>
        <br />
        Phone:
        <p className={classes.feedBackInfo}> {phone}</p>
      </div>
      <div>
        Comment:
        <p className={classes.feedBackInfo}> {comment}</p>
      </div>
      <Button
        className={classes.feedBackBtnReturn}
        variant="outlined"
        onClick={() => setForm(false)}
      >
        <p>Return</p>
      </Button>
    </div>
  );
}
