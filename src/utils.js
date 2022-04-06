import { sample } from "lodash";

const VEGAN_LIMIT = 0.51;
const PIZZA_TYPES = {
  VEGAN: "vegan",
  MEAT: "meat",
  CHEESE: "cheese"
};

export const getPizzaType = (pizzaLovers) => {
  const vegans = pizzaLovers.filter(({ isVegan }) => isVegan).length;
  const ordinary = pizzaLovers.length;

  return vegans / ordinary > VEGAN_LIMIT
    ? sample([PIZZA_TYPES.VEGAN, PIZZA_TYPES.CHEESE])
    : PIZZA_TYPES.MEAT;
};

export const convertPrice = (native, currencies) => {
  const [price, code] = native.split(/\s+/g);

  return price * currencies[code];
};

export const roundPrice = (price) => Math.round(price * 10) / 10;
