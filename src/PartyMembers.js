import classes from "./styles.module.css";
import Table from "rc-table";

export default function PartyMembers({
  setForm = {},
  setSelectedGuest,
  handleOnClick = () => {},
  guests = [],
  loading = false
}) {
  const RefreshInfo = () => {
    localStorage.removeItem("storedGuests");
    handleOnClick();
  };

  const handleOnOpenForm = (item = {}) => {
    if (item.eatsPizza) {
      setForm(true);

      setSelectedGuest(item);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      align: "center"
    }
  ];

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {!!guests.length && (
            <>
              <div className={classes.loadButtonConatiner}>
                <button className={classes.loadBtn} onClick={RefreshInfo}>
                  Clear app
                </button>
              </div>
              <div>
                {/* create table with react-table */}
                <Table
                  className={classes.table}
                  columns={columns}
                  data={
                    guests.length
                      ? [
                          ...guests.map((item, i) => {
                            const isValid = item?.rating && item?.phone;

                            return {
                              // create colums "Name"
                              name: (
                                <div className={classes.guestInfo}>
                                  {isValid && <span>&#10003;</span>}
                                  {/* {isValid && <span>✔️</span>} */}
                                  <p
                                    style={{
                                      color: item?.isVegan
                                        ? "green"
                                        : item?.eatsPizza
                                        ? "black"
                                        : "gray",
                                      cursor: item?.eatsPizza
                                        ? "pointer"
                                        : "unset"
                                    }}
                                    onClick={() => handleOnOpenForm(item)}
                                  >
                                    {item?.name}
                                  </p>
                                </div>
                              ),

                              key: i
                            };
                          })
                        ]
                      : [{ name: "", price: "", button: "", key: "1" }]
                  }
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
