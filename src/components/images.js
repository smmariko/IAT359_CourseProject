import React from "react";
import { Text, Image, StyleSheet, View, FlatList } from "react-native";
import { CameraButton } from "./button.js";
import { colors, textStyles } from "../styles.js";
import {
  scaleBorderRadius,
  scaleHeight,
  scaleWidth,
} from "./dimensionScaling.js";

export const ImageCarousel = ({
  openModal,
  marginTop,
  imageArray,
  isHeader = false,
  isLabel = false,
  marginLeft,
}) => {
  console.log("Image Array in Carousel:", imageArray); // Add this to verify the array

  const dynamicStyles = StyleSheet.create({
    dynamicContainer: {
      width: scaleWidth(353),
      height: scaleHeight(114),
      flexDirection: "row",
      overflow: "hidden",
    },
    dynamicMaskContainer: {
      width: scaleWidth(130),
      height: scaleHeight(113),
      borderRadius: scaleBorderRadius(8),
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: scaleWidth(8),
    },
    dynamicLabel: {
      marginBottom: scaleHeight(4),
    },
    dynamicMainContainer: {
      marginTop: scaleHeight(marginTop || 0),
      marginLeft: scaleWidth(marginLeft),
    },
  });

  const renderItem = ({ item }) => (
    <View style={dynamicStyles.dynamicMaskContainer}>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

  const renderHeader = () => <CameraButton onPress={openModal} />;

  return (
    <View style={dynamicStyles.dynamicMainContainer}>
      {isLabel && (
        <Text style={[styles.label, dynamicStyles.dynamicLabel]}>Images</Text>
      )}

      <FlatList
        ListHeaderComponent={isHeader ? renderHeader : null}
        data={imageArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.dynamicContainer}
        horizontal={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "center",
    width: 150,
    height: 150,
  },
  label: {
    ...textStyles.bb3,
    color: colors.w10,
  },
});
