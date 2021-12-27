import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import { colors, sizes } from "../common/theme";

export default function AppButton({title, onPress, color="white", backgroundColor="primary", style, ...otherProps}: Props) {
  return (
    <TouchableOpacity
      style={[
        customStyles.button,
        { backgroundColor: colors[backgroundColor] },
        style
      ]}
      onPress={onPress}
      {...otherProps}
    >
      <Text style={[customStyles.buttonText, {color: colors[color]}]}>{title}</Text>
    </TouchableOpacity>
  )
}

const customStyles = StyleSheet.create({
  buttonText: {
    fontWeight: '700',
    letterSpacing: 1,
    fontSize: sizes.fontL
  },
  button: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "50%",
    marginVertical: 10,
  }
});

interface Props {
  title: string, 
  onPress: Function | any, 
  color?: string,
  backgroundColor?: string, 
  style?: Object
  [otherProps:string]: any,
}