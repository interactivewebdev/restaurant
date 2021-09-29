export const tablesRequest = async (restaurant_id) => {
  const request = {
    restaurant_id: restaurant_id,
  };

  const response = await fetch(
    "http://deltabiocare.com/restaurant/api/getTables",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );
  const json = await response.json();

  if (json.code == 200) {
    return json.data;
  } else {
    return "error";
  }
};
