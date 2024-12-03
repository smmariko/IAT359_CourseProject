import { Dimensions } from "react-native";

/*
Dimensions
    Basically jsut react-native's Dimensions but in a separate function bc of resuse.
    If I make the component, I will usually account for the scaling on any pixel value with this function

    How to Use:

        import{scaleWidth, scaleHeight} from "./dimensionScaling.js"

        const Example = () => {
            const exampleStyles StyleSheet.create({
                exampleStyle: {
                    width: scaleWidth(number),
                    height: scaleHeight(number),
                },
            });

            return (
                //your app
                
                <ExampleComponent {width=scaleWidth(width)}

            );
        };

    Important notes!
        
        This runs once when it is loaded. That means that if device orientation changes, it does not account for that
        nor does it account for resizable screens. I can change that if that's the case, but since our screens are don't change like that,
        I thought Dimensions was more appropriate for us because the alternative checks constantly (useDimensions).

        If you want to use in styles or StyleSheet, DO IT INLINE OR WITHIN THE COMPONENT! 
        This is cause StyleSheet.create is static, so it doesn't accept dynamically calculated values,
        such as scaleWidth and scaleHeight from Dimensions.get. React Native's StyleSheet.create expects
        static values at the time of creation, which is why using scaleWidth or scaleHeight directly in the StyleSheet.create call won't work.


*/

// Base dimensions from Figma design
const BASE_WIDTH = 393; // Figma width
const BASE_HEIGHT = 852; // Figma height

//get initial dimensions
const { width, height } = Dimensions.get("window");

//scale and export factors
export const scaleWidth = (size) => (width / BASE_WIDTH) * size;
export const scaleHeight = (size) => (height / BASE_HEIGHT) * size;

// Scale borderRadius
export const scaleBorderRadius = (size) => {
  return Math.min(scaleWidth(size), scaleHeight(size));
};
