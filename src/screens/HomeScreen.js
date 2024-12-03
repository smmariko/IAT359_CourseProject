import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
} from "react-native";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

import { Header } from "../components/header";
import { Card } from "../components/card";

export default HomeScreen = ({ navigation, route }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "restaurants"),
      (snapshot) => {
        const restaurantList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRestaurants(restaurantList);
      }
    );

    return unsubscribe;
  }, []);

  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      await deleteDoc(doc(db, "restaurants", restaurantId));
      Alert.alert("Success", "Restaurant deleted!");
    } catch (error) {
      Alert.alert("Error", "Failed to delete restaurant.");
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("RestaurantList", { restaurant: item })
      }
    >
      {item.images && item.images.length > 0 ? (
        <Image source={{ uri: item.images[0] }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text>No Image</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text numberOfLines={2} style={styles.notes}>
          {item.notes}
        </Text>
      </View>
      {editMode && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            setSelectedRestaurant(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.deleteButtonText}>Edit</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        type={editMode}
        onEditPress={() => setEditMode((prevMode) => !prevMode)}
        // onLogoutPress={() => } //needs to be logout press stuff here
      />
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddRestaurant")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {selectedRestaurant && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Edit {selectedRestaurant.name}
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  navigation.navigate("EditRestaurant", {
                    restaurant: selectedRestaurant,
                  });
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>Edit Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteModalButton]}
                onPress={() => {
                  handleDeleteRestaurant(selectedRestaurant.id);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#FF3D00",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  notes: {
    fontSize: 14,
    color: "#555",
  },
  deleteButton: {
    backgroundColor: "#FF3D00",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  deleteButtonText: {
    color: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FF3D00",
    borderRadius: 50,
    padding: 20,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#FF3D00",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteModalButton: {
    backgroundColor: "#d9534f",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
  },
});
