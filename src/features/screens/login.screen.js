import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  StatusBar,
  AsyncStorage,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import styled from "styled-components";
import { SafeArea } from "../components/SafeArea.component";

const loginData = {
  phoneNumber: null,
  password: null,
};

const LoginBox = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  font-family: ${(props) => props.theme.fonts.body};
`;

const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.ui.primary};
`;

const Input = styled(TextInput)`
  margin-top: ${(props) => props.theme.space[1]};
`;

const LoginButton = styled(Button)`
  margin-top: ${(props) => props.theme.space[1]};
  padding: ${(props) => props.theme.space[2]};
`;

const submitLoginForm = async (data) => {
  try {
    const response = await fetch(
      "http://deltabiocare.com/restaurant/api/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const json = await response.json();

    if (json.code === 200) {
      await AsyncStorage.setItem("user", JSON.stringify(json.data));
      await AsyncStorage.setItem("logged", "1");

      //props.navigation.navigate("Tables");
    } else {
      //props.navigation.navigate("Notauthorised");
    }
  } catch (err) {
    console.error(err);
  }
};

export const LoginScreen = () => {
  const [contact, setContact] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    loginData.phoneNumber = contact;
    loginData.password = password;
  });

  return (
    <SafeArea>
      <View style={styles.box}>
        <ImageBackground
          source={require("../../../assets/images/bg.png")}
          style={styles.box}
        >
          <LoginBox>
            <Title> Waiter Login Panel </Title>
            <Input
              label="Contact Number"
              value={contact}
              keyboardType="numeric"
              onChangeText={(text) => setContact(text)}
            />
            <Input
              label="Password"
              secure
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <LoginButton
              title="Login"
              mode="contained"
              onPress={() =>
                submitLoginForm({ phoneNumber: contact, password: password })
              }
            >
              Login
            </LoginButton>
          </LoginBox>
        </ImageBackground>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: StatusBar.currentHeight,
  },
  box: {
    flex: 1,
  },
  colorWhite: {
    color: "#ffffff",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  button: {
    borderRadius: 4,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
