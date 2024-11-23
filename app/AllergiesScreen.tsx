import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addAllergy, removeAllergy } from "./reducers/allergyReducer";
import allergiesData from "../data/allergies.json"; 
import { RootState } from "./store";
import { useRouter } from "expo-router";

const AllergiesScreen: React.FC = () => {
  const [input, setInput] = useState(""); 
  const dispatch = useDispatch();
  const selectedAllergies = useSelector((state: RootState) => state.allergy.selectedAllergies);
  const router = useRouter();


  const filteredSuggestions = allergiesData.data.filter((item) =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );

  
  const handleSelect = (allergy: string) => {
    if (!selectedAllergies.includes(allergy)) {
      dispatch(addAllergy(allergy));
    }
    setInput(""); 
  };


  const handleRemove = (allergy: string) => {
    dispatch(removeAllergy(allergy));
  };

  useEffect(() => {
    console.log("Selected allergies updated:", selectedAllergies);
  }, [selectedAllergies]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Write Any Allergies or Sensitivities:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type an allergy (e.g., Milk)"
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <FlatList
        data={filteredSuggestions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestion}
            onPress={() => handleSelect(item.name)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.selectedContainer}>
        {selectedAllergies.map((allergy) => (
          <TouchableOpacity
            key={allergy}
            style={styles.selectedItem}
            onPress={() => handleRemove(allergy)}
          >
            <Text style={styles.selectedText}>{allergy} ✕</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button
        title="Next"
        onPress={() => {
          console.log("Navigating to next screen with selected allergies:", selectedAllergies);
          router.push("/FinalScreen");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  selectedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  selectedItem: {
    backgroundColor: "#d0f0c0",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  selectedText: {
    fontSize: 14,
    color: "#333",
  },
});

export default AllergiesScreen;
