import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Geocoder from "react-native-geocoding";
import * as ImagePicker from "expo-image-picker";

//styles
import {
  IconButton,
  PrimaryButton,
  SecondaryButton,
} from "../components/button";
import { colors, textStyles, shadowStyles } from "../styles";
import {
  scaleWidth,
  scaleHeight,
  scaleBorderRadius,
} from "../components/dimensionScaling.js";
import {
  CustomLocationInput,
  CustomTextInput,
  ScrollCustomTextInput,
} from "../components/formField";
import { ImageCarousel } from "../components/images.js";

Geocoder.init("AIzaSyBj-DzHK0Z04dPkkdTfgEqXiS4eJS-cD2o");

export default AddRestaurantScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [placeId, setPlaceId] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true); // Function to open modal
  const closeModal = () => setModalVisible(false); // Function to close modal

  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || libraryStatus !== "granted") {
      alert("Permission to access camera and media library is required!");
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleImagePicker = async (type) => {
    try {
      let result;

      if (type === "camera") {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      } else if (type === "library") {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }

      if (!result.canceled) {
        const newImageUri = result.assets ? result.assets[0].uri : result.uri;

        console.log("New Image URI:", newImageUri);

        setImages((prevImages) => [...prevImages, newImageUri]);
      }
    } catch (error) {
      console.error("Error opening image picker:", error);
    }
  };

  const handleAddRestaurant = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Restaurant name is required.");
      return;
    }
    if (!location.trim()) {
      Alert.alert("Error", "Restaurant location is required.");
      return;
    }

    try {
      await addDoc(collection(db, "restaurants"), {
        name,
        notes,
        images,
        location,
        latitude,
        longitude,
        placeId,
        showReviews,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Restaurant added successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to add restaurant.");
    }
  };

  // const renderImageItem = ({ item }) => (
  //   <Image source={{ uri: item }} style={oldStyles.image} />
  // );

  //styles
  const dynamicStyles = StyleSheet.create({
    dynamicHeaderContainer: {
      marginLeft: scaleWidth(20),
    },
    dynamicHeader: {
      marginTop: scaleHeight(10),
    },
  });

  return (
    <SafeAreaView style={oldStyles.safeAreaContainer}>
      <View style={dynamicStyles.dynamicHeaderContainer}>
        <IconButton
          onPress={() => navigation.goBack()}
          name="back"
          color={colors.w10}
          marginTop={0}
        />
        <Text style={[textStyles.h4, dynamicStyles.dynamicHeader]}>
          Create Restaurant
        </Text>
      </View>
      <CustomTextInput
        placeholderText={"Restaurant Name"}
        labelText={"Name"}
        marginTop={20}
        value={name}
        onChangeText={setName}
      />

      <ScrollCustomTextInput
        placeholderText={"Type notes here"}
        labelText={"Notes"}
        marginTop={20}
        value={notes}
        onChangeText={setNotes}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ height: 120 }}
      >
        <CustomLocationInput
          placeholderText="Enter Restaurant Location"
          labelText="Location"
          marginTop={30}
          onPress={(data, details = null) => {
            const { lat, lng } = details.geometry.location;
            setLocation(data.description);
            setLatitude(lat);
            setLongitude(lng);
            const placeId = data.place_id;
            setPlaceId(placeId);
          }}
        />
      </KeyboardAvoidingView>

      {/* <View style={styles.imageContainer}>
        {images.length > 0 ? (
          <FlatList
            data={images}
            horizontal={true}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.imageList}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text>No Images</Text>
          </View>
        )}
        <View style={styles.imageButtons}>
          <TouchableOpacity
            style={styles.addImageButton}
            onPress={() => handleImagePicker("camera")}
          >
            <Text style={styles.addImageText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addImageButton}
            onPress={() => handleImagePicker("library")}
          >
            <Text style={styles.addImageText}>Library</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      <ImageCarousel
        openModal={openModal}
        imageArray={images}
        isHeader={true}
        isLabel={true}
        marginTop={20}
        marginLeft={20}
      />

      <Modal
        transparent={true}
        onRequestClose={closeModal}
        animationType="fade"
        visible={isModalVisible}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeModal}
        >
          <View
            style={[
              styles.card,
              {
                borderRadius: scaleBorderRadius(8),
                width: scaleWidth(330),
                height: scaleHeight(154),
              },
            ]}
          >
            <Text
              style={[
                textStyles.h4,
                {
                  marginTop: scaleHeight(30),
                  marginLeft: scaleWidth(93),
                  color: colors.w10,
                },
              ]}
            >
              Add Photo
            </Text>

            <View
              style={[
                styles.horizontalLine,
                { width: scaleWidth(330), marginTop: scaleHeight(20) },
              ]}
            />
            <View style={styles.buttonContainer}>
              <SecondaryButton
                onPress={() => handleImagePicker("camera")}
                title="Camera"
                marginLeft={0}
              />
              <View
                style={[styles.VerticalLine, { height: scaleHeight(67) }]}
              />
              <SecondaryButton
                onPress={() => handleImagePicker("library")}
                title="Library"
                marginLeft={0}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Text style={styles.reviewLabel}>Reviews</Text>
      <View style={oldStyles.toggleContainer}>
        <Text style={(textStyles.b3, { marginLeft: scaleWidth(20) })}>
          Show Google Reviews of this restaurant
        </Text>
        <Switch
          style={{ marginRight: scaleWidth(20) }}
          value={showReviews}
          onValueChange={(value) => setShowReviews(value)}
        />
      </View>
      <PrimaryButton
        marginTop={-10}
        title="Create"
        onPress={handleAddRestaurant}
      />
    </SafeAreaView>
  );
};

const oldStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    fontSize: 24,
    color: "#FF3D00",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  notesInput: {
    height: 100,
    textAlignVertical: "top",
  },
  imageContainer: {
    marginBottom: 15,
  },
  imageList: {
    marginVertical: 10,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: "#eee",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  imageButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addImageButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#FF3D00",
    borderRadius: 8,
    alignItems: "center",
  },
  addImageText: {
    color: "#fff",
  },
  autocompleteContainer: {
    marginBottom: 20,
  },
  listView: {
    zIndex: 1000,
  },
  autocompleteRow: {
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  createButton: {
    backgroundColor: "#FF3D00",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.w0,
    buttonShadow: shadowStyles.buttonShadow,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: colors.w3,
  },
  VerticalLine: {
    backgroundColor: colors.w3,
    width: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  reviewLabel: {
    marginLeft: 20,
    marginTop: 30,
    ...textStyles.bb3,
    color: colors.w10,
  },
});
