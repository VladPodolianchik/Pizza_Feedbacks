import { useEffect, useState } from "react";
import FormContainer from "./FormContainer";
import PersonInfo from "./PersonInfo";
import PartyMembers from "./PartyMembers";
import { getGuests } from "./api";

export default function App() {
  const [form, setForm] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState();
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);

  const getInLocalStorage = JSON.parse(localStorage.getItem("storedGuests"));

  const infoFromLocalStorage = (element) =>
    localStorage.setItem("storedGuests", JSON.stringify(element));

  const handleOnClick = async () => {
    setLoading(true);
    const guests = await getGuests();

    infoFromLocalStorage(guests);

    setGuests(guests);

    guests && setLoading(false);
  };

  useEffect(() => {
    !getInLocalStorage && handleOnClick();
  }, []);

  useEffect(() => {
    setGuests(getInLocalStorage);
  }, [form]);

  return (
    <div>
      {form ? (
        selectedGuest?.rating && selectedGuest?.phone ? (
          <PersonInfo
            data={selectedGuest}
            getInLocalStorage={getInLocalStorage}
            infoFromLocalStorage={infoFromLocalStorage}
            setForm={setForm}
          />
        ) : (
          <FormContainer
            item={selectedGuest}
            getInLocalStorage={getInLocalStorage || []}
            infoFromLocalStorage={infoFromLocalStorage}
            setForm={setForm}
          />
        )
      ) : (
        <PartyMembers
          setForm={setForm}
          setSelectedGuest={setSelectedGuest}
          getInLocalStorage={getInLocalStorage}
          infoFromLocalStorage={infoFromLocalStorage}
          handleOnClick={handleOnClick}
          guests={guests}
          loading={loading}
        />
      )}
    </div>
  );
}
