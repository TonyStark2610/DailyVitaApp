import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert } from "react-native";

const FinalScreen: React.FC = () => {
  const [sunExposure, setSunExposure] = useState<string | null>(null);
  const [smokingStatus, setSmokingStatus] = useState<string | null>(null);
  const [alcoholConsumption, setAlcoholConsumption] = useState<string | null>(null);

  const handleSubmit = () => {
    if (sunExposure === null || smokingStatus === null || alcoholConsumption === null) {
      Alert.alert("Incomplete Selections", "Please answer all questions before submitting.");
    } else {
      console.log("Final Selections:");
      console.log("Daily Sun Exposure:", sunExposure);
      console.log("Smoking Status:", smokingStatus);
      console.log("Alcohol Consumption:", alcoholConsumption);

      Alert.alert("Thank You!", "Your personalized vitamin recommendations are being processed.");
    }
  };

  const renderRadioButton = (value: string, selectedValue: string | null, onPress: () => void) => (
    <TouchableOpacity
      style={styles.radioContainer}
      onPress={onPress}
    >
      <View style={[styles.radioButton, selectedValue === value && styles.radioButtonSelected]} />
      <Text style={styles.radioText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Is your daily exposure to sun limited?</Text>
      {renderRadioButton("Yes", sunExposure, () => setSunExposure("Yes"))}
      {renderRadioButton("No", sunExposure, () => setSunExposure("No"))}

      <Text style={styles.title}>Do you currently smoke (tobacco or marijuana)?</Text>
      {renderRadioButton("Yes", smokingStatus, () => setSmokingStatus("Yes"))}
      {renderRadioButton("No", smokingStatus, () => setSmokingStatus("No"))}

      <Text style={styles.title}>On average, how many alcoholic beverages do you have in a week?</Text>
      {renderRadioButton("0 - 1", alcoholConsumption, () => setAlcoholConsumption("0 - 1"))}
      {renderRadioButton("2 - 5", alcoholConsumption, () => setAlcoholConsumption("2 - 5"))}
      {renderRadioButton("5+", alcoholConsumption, () => setAlcoholConsumption("5+"))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Get my personalized vitamin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f8f9",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  radioButtonSelected: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  radioText: {
    fontSize: 14,
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: "#f94d44",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FinalScreen;
