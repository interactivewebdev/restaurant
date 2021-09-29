import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  flex-direction: column;
  margin-top: ${StatusBar.currentHeight}px;
`;
