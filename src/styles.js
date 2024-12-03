/*
Styles

  These are styles that are used throughout the app and can be found in the Figma file
  Text, color and shadow styles!

  How to use

  Simply where you want to use it, do variable.specific style!

  Examples:

  import {colors, textStyles, shadowStyles} from "./styles.js"

  const exampleStyles StyleSheet.create({
  exampleStyle: {
    color: colors.w0,
    ...textStyles.b2, //Btw use it like this if you want to specify in StyleSheet that you basically want to include this already made style
    ...shadowStyles.buttonShadowm,
  },
  });

  Icons work a bit different. Use it in combination with CustomIcon to select whatever SVG you
  want from your imported SVGs.
*/

import { StyleSheet } from "react-native";

import AddImage from "../assets/icons/app-icons/addimage.svg";
import Add from "../assets/icons/app-icons/add.svg";
import ArrowDown from "../assets/icons/app-icons/arrowdown.svg";
import ArrowUp from "../assets/icons/app-icons/arrowup.svg";
import Back from "../assets/icons/app-icons/back.svg";
import Delete from "../assets/icons/app-icons/delete.svg";
import Edit from "../assets/icons/app-icons/edit.svg";
import RadioButton from "../assets/icons/app-icons/radiobutton.svg";
import RadioButtonChecked from "../assets/icons/app-icons/radiobuttonchecked.svg";
import Search from "../assets/icons/app-icons/search.svg";
import Toggle from "../assets/icons/app-icons/toggle.svg";
import ToggleChecked from "../assets/icons/app-icons/togglechecked.svg";

export const icons = {
  addImage: AddImage,
  add: Add,
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  back: Back,
  delete: Delete,
  edit: Edit,
  radioButton: RadioButton,
  radioButtonChecked: RadioButtonChecked,
  search: Search,
  toggle: Toggle,
  toggleChecked: ToggleChecked,
};

export const colors = {
  //Same as Figma file

  //greyscale
  w10: "#000000", //black
  w5: "#858585",
  w4: "#A2A2A2",
  w3: "#C0C0C0",
  w2: "#DFDFDF",
  w1: "#FAFAFA",
  w0: "#FFFFFF", //white

  r1: "#D10B0E", //red
  r0: "#FC3F32",

  o1: "#FFC49A", //orange
};

export const textStyles = StyleSheet.create({
  //Same as Figma file

  //headers
  h2: {
    fontFamily: "GT-Walsheim-Bold",
    fontSize: 64,
    lineHeight: 73.3,
  },
  h4: {
    fontFamily: "GT-Walsheim-Medium",
    fontSize: 32,
    lineHeight: 36.6,
  },

  //body
  b2: {
    fontFamily: "GT-Walsheim-Regular",
    fontSize: 16,
    lineHeight: 28,
  },
  b3: {
    fontFamily: "GT-Walsheim-Regular",
    fontSize: 13.6,
    lineHeight: 22,
  },
  //bold body
  bb2: {
    fontFamily: "GT-Walsheim-Medium",
    fontSize: 16,
    lineHeight: 28,
  },
  bb3: {
    fontFamily: "GT-Walsheim-Medium",
    fontSize: 13.6,
    lineHeight: 22,
  },
  //button text
  bt1: {
    fontFamily: "GT-Walsheim-Bold",
    fontSize: 16,
    lineHeight: 28,
  },
});

export const shadowStyles = StyleSheet.create({
  //shadows
  buttonShadow: {
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 11.1,
    elevation: 11.1,
    shadowOpacity: 1,
  },
});
