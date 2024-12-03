import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import { ImageCarousel } from "./images";
import { colors, textStyles } from "../styles";
import {
  scaleBorderRadius,
  scaleHeight,
  scaleWidth,
} from "./dimensionScaling.js";

export const Card = ({ restaurant, onPress }) => {
  const dynamicStyles = StyleSheet.create({
    dynamicBackgroundContainer: {
      width: scaleWidth(349),
      height: scaleHeight(189),
      borderRadius: scaleBorderRadius(8),
    },
    heading: {
      ...textStyles.b3,
      marginTop: scaleHeight(13),
      marginLeft: scaleWidth(20),
    },
  });

  return (
    <Pressable
      style={[
        dynamicStyles.dynamicBackgroundContainer,
        styles.backgroundContainer,
      ]}
      onPress={onPress}
    >
      <Text style={dynamicStyles.heading}>{restaurant.name}</Text>
      <ImageCarousel imagesArray={restaurant.images}> </ImageCarousel>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    borderColor: colors.w2,
    borderWidth: 2,
    backgroundColor: colors.w0,
  },
});
