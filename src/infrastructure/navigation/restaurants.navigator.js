import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TableScreen } from "../../features/screens/table.screen";
import { OrderScreen } from "../../features/screens/order.screen";
import { CategoryScreen } from "../../features/screens/categories.screen";

const RestaurantStack = createStackNavigator();

export const RestaurantNavigator = () => {
  return (
    <RestaurantStack.Navigator>
      <RestaurantStack.Screen name="Tables" component={TableScreen} />
      <RestaurantStack.Screen name="Categories" component={CategoryScreen} />
      <RestaurantStack.Screen name="Order" component={OrderScreen} />
    </RestaurantStack.Navigator>
  );
};
