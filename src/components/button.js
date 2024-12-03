import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { colors, textStyles, shadowStyles } from "../styles.js";
import { useState } from "react";
import {
  scaleBorderRadius,
  scaleHeight,
  scaleWidth,
} from "./dimensionScaling.js";

/* 
  How to use PrimaryButton and SecondaryButton component

    They both are basically the same. A button that when pressed, changes apperance for a little bit,
    before taking the action specified in its use.


    Implement it like this:

      import {PrimaryButton, SecondaryButton} from "./button.js"
      <PrimaryButton
        onPress={actionWhenPressed}
        title="ButtonTitle"
        marginTop={PixelsAwayfromAboveObject}
        paddingHorizontal={optionallyChangeButtonSidePadding}
        />

        <SecondaryButton
          onPress={actionWhenPressed}
        title="ButtonTitle"
        marginTop={PixelsAwayfromAboveObject}
        />

*/

export const PrimaryButton = ({
  onPress,
  title,
  marginTop,
  paddingHorizontal,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePressIn = () => {
    setIsPressed(true); // Button is pressed
  };
  const handlePressOut = () => {
    setIsPressed(false); // Button is released
  };

  return (
    <Pressable
      style={[
        shadowStyles.buttonShadow,
        buttonStyles.button,
        { borderRadius: scaleBorderRadius(8) },
        { marginTop: scaleHeight(marginTop) },
        { paddingHorizontal: scaleWidth(paddingHorizontal || 15) },
        { paddingVertical: scaleHeight(15) },
        isPressed && buttonStyles.buttonPressed,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Text
        style={[
          textStyles.bt1,
          { color: colors.w0 },
          isPressed && buttonStyles.buttonTextPressed,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export const SecondaryButton = ({ onPress, title, marginTop }) => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePressIn = () => {
    setIsPressed(true); // Button is pressed
  };
  const handlePressOut = () => {
    setIsPressed(false); // Button is released
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ marginTop: scaleHeight(marginTop) }}
    >
      <Text
        style={[
          textStyles.bt1,
          { color: colors.r0 },
          isPressed && buttonStyles.secondaryTextPressed,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export const IconButton = ({ onPress, marginTop, iconImage }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        { marginTop: scaleHeight(marginTop || 0) },
        { width: scaleWidth(24) },
        { height: scaleHeight(24) },
      ]}
    >
      <Image
        style={[{ width: scaleWidth(24) }, { height: scaleHeight(24) }]}
        source={iconImage}
        resizeMode="center"
      />
    </TouchableOpacity>
  );
};
const buttonStyles = StyleSheet.create({
  button: {
    //from style.js
    backgroundColor: colors.r0,

    //box
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  buttonPressed: {
    backgroundColor: colors.r1,
  },

  buttonTextPressed: {
    color: colors.o1,
  },
  secondaryTextPressed: {
    color: colors.r1,
  },
});
