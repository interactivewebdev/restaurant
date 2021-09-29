import React, { useState, useContext } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator, Colors, List } from "react-native-paper";
import { SafeArea } from "../components/SafeArea.component";
import { TablesContext } from "../../services/tables.context";
import styled from "styled-components";

const Title = styled(Text)`
  font-size: ${(props) => props.theme.sizes[2]};
  font-weight: bold;
`;

const TableName = styled(Text)`
  font-size: ${(props) => props.theme.sizes[1]};
`;

const EngagedCover = styled(View)`
  background-color: ${(props) => props.theme.colors.bg.danger};
  padding: ${(props) => props.theme.space[1]};
  border-radius: 4px;
`;

const Engaged = styled(Text)`
  font-size: ${(props) => props.theme.sizes[0]};
  color: ${(props) => props.theme.colors.text.white};
`;

export const TableScreen = ({ navigation }) => {
  const { tables, isLoading, error } = useContext(TablesContext);

  return (
    <SafeArea>
      {isLoading && (
        <View style={{ position: "absolute", top: "50%", left: "50%" }}>
          <ActivityIndicator
            size={50}
            style={{ marginLeft: -25 }}
            animating={true}
            color={Colors.blue400}
          />
        </View>
      )}
      <View>
        <FlatList
          numColumns={1}
          keyExractor={(item) => item.id}
          data={tables}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity style={styles.tableHead}>
                <Title>{item.name}</Title>
              </TouchableOpacity>
              <View style={styles.tableContainer}>
                {item.tables.map(function (t, index) {
                  return (
                    <TouchableOpacity
                      style={styles.table}
                      key={index}
                      onPress={() =>
                        navigation.navigate("Categories", {
                          restaurant_id: t.restaurant_id,
                          table_id: t.id,
                        })
                      }
                    >
                      <TableName>{t.name}</TableName>
                      {t.engaged && (
                        <EngagedCover>
                          <Engaged>Engaged</Engaged>
                        </EngagedCover>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        />
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  tableHead: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    backgroundColor: "skyblue",
    padding: 10,
    flex: 1,
  },
  tableContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  table: {
    backgroundColor: "coral",
    width: "24%",
    height: 50,
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
