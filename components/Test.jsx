import React from "react";
import { View, Button } from "react-native";
import Toast from "react-native-toast-message";

const Test = () => {
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Hello from Test",
      text2: "This is a test toast message.",
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Show Toast" onPress={showToast} />
    </View>
  );
};

export default Test;
