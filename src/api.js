import { convertPrice } from "./utils";

export const PARTY_GUEST_URL = "https://gp-js-test.herokuapp.com/pizza/guests";
const BOOK_OF_DIET_URL =
  "https://gp-js-test.herokuapp.com/pizza/world-diets-book";
const ORDER_PIZZA_URL = "https://gp-js-test.herokuapp.com/pizza/order";
const CURRENCY_URL = "https://gp-js-test.herokuapp.com/pizza/currency";

export const getGuests = async () => {
  const guestsResponse = await fetch(PARTY_GUEST_URL);

  if (!guestsResponse.ok) {
    console.warn(guestsResponse);

    return;
  }

  const { party } = await guestsResponse.json();
  if (!party || !party.length) {
    console.log("Nothing to show");

    return;
  }

  const dietNames = party
    .filter(({ eatsPizza }) => eatsPizza)
    .map(({ name }) => name)
    .join(",");
  const dietsResponse = await fetch(`${BOOK_OF_DIET_URL}/${dietNames}`);

  if (!dietsResponse.ok) {
    console.warn(dietsResponse);

    return;
  }

  const { diet } = await dietsResponse.json();

  const dietMap = diet.reduce((acc, { name, isVegan } = {}) => {
    acc[name] = isVegan;

    return acc;
  }, {});

  return party.map((guest) => ({
    ...guest,
    isVegan: dietMap[guest.name]
  }));
};

export const getPizza = async (type, slices) => {
  const [pizzaResponse, currencyResponse] = await Promise.all([
    fetch(`${ORDER_PIZZA_URL}/${type}/${slices}`),
    fetch(CURRENCY_URL)
  ]);

  if (!pizzaResponse.ok || !currencyResponse.ok) {
    console.warn(pizzaResponse, currencyResponse);

    return;
  }

  const pizza = await pizzaResponse.json();
  const currency = await currencyResponse.json();
  return { ...pizza, price: convertPrice(pizza.price, currency) };
};
