import React, { useState } from 'react'
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native'
import image from './assets/favicon.png'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'
import uploadToAnonymousFilesAsync from 'anonymous-files'

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null)

  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
      alert('Permission to access camera is required')
      result
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync()

    if (pickerResult.cancelled === true) {
      return
    }

    // if (Platform.OS === 'web') {
    //   const remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri)
    //   console.log(remoteUri)
    //   setSelectedImage({ localUri: pickerResult.uri, remoteUri })
    // } else {
    setSelectedImage({ localUri: pickerResult.uri })
    // }
  }

  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert('Sharing is not available on your device')
      return
    }
    await Sharing.shareAsync(selectedImage.localUri)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pick an image</Text>

      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
          source={{
            uri:
              selectedImage !== null
                ? selectedImage.localUri
                : 'https://picsum.photos/200/300',
          }}
          style={styles.image}
          // source={image}
        />
      </TouchableOpacity>
      {selectedImage ? (
        <TouchableOpacity onPress={openShareDialog} style={styles.button}>
          <Text style={styles.buttonText}>Share Image</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c1c1c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    // resizeMode: 'contain',
  },
  button: {
    backgroundColor: 'yellow',
    padding: 8,
    marginTop: 8,
    borderRadius: 2,
  },
  buttonText: {
    fontSize: 16,
  },
})
