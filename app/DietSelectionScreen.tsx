import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addDiet, removeDiet } from "./reducers/dietReducer";
import { RootState } from "./store";
import { useRouter } from "expo-router";
import dietsData from "../data/Diets.json";

const DietSelectionScreen: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDiets = useSelector((state: RootState) => state.diet.selectedDiets);
  const router = useRouter();

 
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const toggleDietSelection = (diet: string) => {
    if (selectedDiets.includes(diet)) {
      dispatch(removeDiet(diet));
    } else {
      dispatch(addDiet(diet));
    }
  };

  const showModal = (info: string) => {
    setModalContent(info);
    setModalVisible(true);
  };

  console.log("Currently selected diets:", selectedDiets);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select the diets you follow:</Text>
      <FlatList
        data={dietsData.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {/* Checkbox for selecting diets */}
            <TouchableOpacity
              style={[
                styles.checkbox,
                selectedDiets.includes(item.name) && styles.checkboxSelected,
              ]}
              onPress={() => toggleDietSelection(item.name)}
            >
              {selectedDiets.includes(item.name) && <View style={styles.checkboxFill} />}
            </TouchableOpacity>
            <Text style={styles.dietText}>{item.name}</Text>

            {/* Info button */}
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => showModal(item.tool_tip)}
            >
              <Text style={styles.infoText}>i</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button
        title="Next"
        onPress={() => {
          console.log("Selected Diets Before Navigating:", selectedDiets);
          router.push("/AllergiesScreen");
        }}
      />

      {/* Modal for showing diet information */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalContent}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxSelected: { borderColor: "#4caf50" },
  checkboxFill: { width: 14, height: 14, backgroundColor: "#4caf50" },
  dietText: { fontSize: 16, flex: 1 },
  infoButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default DietSelectionScreen;
