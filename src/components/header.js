import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { textStyles } from "../styles.js";
import { scaleHeight, scaleWidth } from "./dimensionScaling.js";
import { SecondaryButton } from "./button.js";

export const Header = ({ isEdit = false, onEditPress, onLogoutPress }) => {
  return (
    <View
      style={{
        width: scaleWidth(393),
        height: scaleHeight(137),
      }}
    >
      {!isEdit ? (
        <View>
          <View
            style={[
              styles.button,
              { marginTop: scaleHeight(20), gap: scaleWidth(268) },
            ]}
          >
            <SecondaryButton onPress={onLogoutPress} title="Log out" />
            <SecondaryButton onPress={onEditPress} title="Edit" />
          </View>
          <Text
            style={[
              textStyles.h4,
              { marginTop: scaleHeight(20), marginLeft: scaleWidth(20) },
            ]}
          >
            My Restaurants
          </Text>
        </View>
      ) : (
        <View>
          <SecondaryButton
            onPress={onEditPress}
            title="Done"
            marginTop={20}
            marginLeft={20}
          />
          <Text
            style={[
              textStyles.h4,
              { marginTop: scaleHeight(20), marginLeft: scaleWidth(20) },
            ]}
          >
            Edit Restaurants
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
  },
});
