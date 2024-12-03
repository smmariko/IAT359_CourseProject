import React from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";
import { colors, textStyles } from "../styles.js";
import { scaleHeight, scaleWidth } from "./dimensionScaling.js";

/* 
  How to use CustomTextInput component
  
  CustomTextInput
    A formField that has a label. It takes input, assigns it a value and can do something
    when the text is changed. 

    Customizable...
      placeholderText
      labelText
      labelTextColor
      width (scaled with scaleWidth)
      and margin from the top item!

    Implement it like this:

      import CustomTextInput from "./formField.js"

         <CustomTextInput
            marginTop={PixelsAwayfromAboveObject}
            placeholderText="Placeholder text"
            labelText="Label for Field"
            labelTextColor={color.textcolor}
            value={value}
            onChangeText={setValue}
            width={pixelWidthonFigmaScreen}
          />
*/

export const CustomTextInput = ({
  placeholderText,
  labelText,
  labelTextColor = colors.w10,
  value,
  onChangeText,
  width,
  marginTop,
  secureTextEntry = false, // Default to false if undefined,
}) => {
  return (
    <View
      style={[
        fieldStyles.fieldContainer,
        { marginTop: scaleHeight(marginTop) },
      ]}
    >
      <Text style={[fieldStyles.labelStyle, { color: labelTextColor }]}>
        {labelText}
      </Text>

      <TextInput
        placeholder={placeholderText}
        placeholderTextColor={colors.w4}
        style={[fieldStyles.inputStyle, { width: scaleWidth(width) }]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const fieldStyles = StyleSheet.create({
  inputStyle: {
    backgroundColor: colors.w0,
    color: colors.w10,
    borderColor: colors.w3,
    borderWidth: 1,
    height: 44,
    padding: 8,
    textAlign: "left",
    ...textStyles.b2,
  },
  labelStyle: {
    ...textStyles.bb3,
    marginBottom: 3,
  },
  fieldContainer: {
    marginHorizontal: 20,
  },
});
