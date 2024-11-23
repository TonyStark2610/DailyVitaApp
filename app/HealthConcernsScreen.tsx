import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHealthConcerns } from "./reducers/healthConcernsReducer";
import { RootState } from "./store";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { useRouter } from "expo-router";

const HealthConcernsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();


  const initialHealthConcerns = useSelector(
    (state: RootState) => state.healthConcerns.healthConcerns
  );


  const [data, setData] = useState(
    initialHealthConcerns.map((item) => ({ name: item, selected: false }))
  );

  useEffect(() => {

    setData(
      initialHealthConcerns.map((item) => ({ name: item, selected: false }))
    );
  }, [initialHealthConcerns]);

  const toggleSelection = (itemName: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.name === itemName ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<{ name: string; selected: boolean }>) => (
    <TouchableOpacity
      style={[
        styles.item,
        isActive && styles.activeItem,
        item.selected && styles.selectedItem,
      ]}
      onLongPress={drag}
      onPress={() => toggleSelection(item.name)} 
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reorder and Select Your Health Concerns:</Text>
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)} 
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <Button
        title="Next"
        onPress={() => {
          
          const selectedConcerns = data.filter((item) => item.selected).map((item) => item.name);
          dispatch(setHealthConcerns(selectedConcerns));
          router.push("/DietSelectionScreen");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  item: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
  },
  activeItem: {
    backgroundColor: "#e0e0e0",
  },
  selectedItem: {
    backgroundColor: "#d0f0c0", 
    borderColor: "#4caf50",
  },
});

export default HealthConcernsScreen;
