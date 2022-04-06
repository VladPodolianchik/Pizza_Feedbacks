import { Button, TextField } from "@material-ui/core";
import { useEffect, useState, useMemo } from "react";
import classes from "./styles.module.css";
import Rating from "@material-ui/lab/Rating";

const DEFAULT_RATING = 3;

export default function FormContainer({
  item = {},
  setForm,
  getInLocalStorage = [],
  infoFromLocalStorage
}) {
  const [data, setData] = useState({
    phone: "",
    comment: "",
    rating: DEFAULT_RATING
  });

  const [inputFields, setInputFields] = useState([]);

  const isValidPhone = useMemo(() => {
    const re = /\+[0-9 ()]{2,9}/;
    return re.test(data.phone);
  }, [data]);

  const handleOnSubmit = () => {
    if (isValidPhone) {
      infoFromLocalStorage(
        getInLocalStorage.map((element) => {
          return element.name === item.name ? { ...element, ...data } : element;
        })
      );
      setForm(false);
    } else {
      setForm(false);
    }
  };
  const handleOnClick = () => {
    setInputFields((prev) => [...prev, { name: `input_${prev.length}` }]);
  };
  useEffect(() => {
    setData({
      ...getInLocalStorage.find((element) => element.name === item.name),
      rating: DEFAULT_RATING
    });
  }, []);
  const updateInputFields = [...inputFields].reverse();
  return (
    <div className={classes.feedBackForm}>
      <h3>Name: {item?.name}</h3>
      <Rating
        name="simple-controlled"
        defaultValue={DEFAULT_RATING}
        onChange={(event, value) => {
          setData((prev) => ({ ...prev, rating: value }));
        }}
      />
      <br />
      <button onClick={handleOnClick}>Add input</button>
      {updateInputFields.map((item, index) => (
        <input
          type="text"
          id={item.name}
          name={item.name}
          placeholder={item.name}
        />
      ))}
      <br />
      <TextField
        className={classes.feedBackInput}
        id="phone"
        label="Phone"
        variant="outlined"
        type="string"
        onChange={(e) =>
          setData((prev) => ({ ...prev, phone: e.target.value }))
        }
      />
      {!isValidPhone && (
        <p className={classes.errorPhone}>Enter correct phone number</p>
      )}
      <TextField
        className={classes.feedBackInput}
        multiline
        id="comment"
        label="Comment"
        variant="outlined"
        onChange={(e) =>
          setData((prev) => ({ ...prev, comment: e.target.value }))
        }
      />
      <br />
      <Button
        className={classes.feedBackBtnReturn}
        variant="contained"
        onClick={handleOnSubmit}
      >
        {isValidPhone ? "Save" : "Cancel"}
      </Button>
    </div>
  );
  console.log(item);
}
