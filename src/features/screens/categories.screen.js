import React, * as react from "react";
import { View, Text } from "react-native";
import { SafeArea } from "../components/SafeArea.component";
import { categoryRequest } from "../../services/category.service";

export const CategoryScreen = ({ route, navigation }) => {
  const [restaurantId, setRestaurantId] = react.useState(null);
  const [tableId, setTableId] = react.useState(null);
  const [categories, setCategories] = react.useState([]);
  const [isLoading, setIsLoading] = react.useState(false);
  const [error, setError] = react.useState(null);

  setRestaurantId(route.params.restaurant_id);
  setTableId(route.params.table_id);

  const retrieveCategories = () => {
    setIsLoading(true);
    setTimeout(() => {
      categoryRequest(restaurantId)
        .then((data) => {
          console.log(data);
          setIsLoading(false);
          setCategories(data);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };

  react.useEffect(() => {
    retrieveCategories();
  }, []);

  return (
    <SafeArea>
      {categories.map(function (category, index) {
        return <Text>aa{category.name}</Text>;
      })}
    </SafeArea>
  );
};
