/*
How CustomIcon works

It's like an icon that you can substitute with a lot of other icons, if they're
the same size. Based on Figma variants swaps. Must be an SVG file.

To use...

Wherever you want an icon, simply...

<CustomIcon
name='exampleiconname'
width={exampleWidth}
height={exampleHeight}
color={colors.exampleColor}
/>

Note that for the colors to work, your SVG's paths must have no fills.

*/

import React from "react";
import { View } from "react-native";
import { icons } from "../styles";

const CustomIcon = ({ name, width = 24, height = 24, color }) => {
  const SvgIcon = icons[name];

  if (!SvgIcon) {
    console.warn(`Icon "${name}" not found!`);
    return null;
  }

  return (
    <View>
      <SvgIcon width={width} height={height} fill={color} />
    </View>
  );
};

export default CustomIcon;
