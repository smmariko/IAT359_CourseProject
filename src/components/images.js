import React from "react";
import { Text, Image, StyleSheet, View, ScrollView } from "react-native";
import { colors, textStyles } from "../styles.js";
import { scaleBorderRadius, scaleHeight, scaleWidth } from "./dimensionScaling.js";

export const imageCaroussel = ({
    imageArray,
    marginTop,
}) => {

    //https://snack.expo.dev/65gMyd0d1T9QZmP514WUP

    const imageArrayLength =  {imageArray}.length;
    const imageStyles = StyleSheet.create({
        scrollContainer: {
        width: scaleWidth(314),
        height: scaleHeight(114),
        flexDirection: 'row',
        },
        scrollPadding: {
            gap:8,
        },
        maskContainer:{
            width: scaleWidth(130),
            height: scaleHeight(113),
            borderRadius: scaleBorderRadius(8),
            overflow: 'hidden', // Hide anything outside the mask
            justifyContent: 'center', // Center the image
            alignItems: 'center',
            backgroundColor: 'lightgray', // Just for visual purpose (can be removed)
        }
    }
    );

return (
    <ScrollView
    style={imageStyles.scrollContainer}
    horizontal={true}
    contentContainerStyle={imageStyles.scrollPadding}
    >


    </ScrollView>
);
};
