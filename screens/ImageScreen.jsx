import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar } from '@rneui/base'
import { Button } from '@rneui/themed'
import * as WebBrowser from 'expo-web-browser'
import ImageList from '../components/ImageList'
import { getImages } from '../api/pexels'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library';

const ImageScreen = ({ route }) => {
  const { image } = route.params

  const handlePress = async () => {
    await WebBrowser.openBrowserAsync(image.photographer_url)
  }

  const downloadFile = () => {
    try{
      let fileUri = FileSystem.documentDirectory + image.id + '.jpeg'
      const { uri } = FileSystem.downloadAsync(image.src.large2x, fileUri)
      saveFile(uri)

    } catch(err) {
      console.log(err)
    }
  }

  const saveFile = async (fileUri) => {
    const {status} = MediaLibrary.requestPermissionsAsync()
    if(status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(fileUri)
      await MediaLibrary.createAlbumAsync('Download', asset, false)
    }
  }

  const handleDownload = async() => {
    await downloadFile()
  }

  const [photos, setPhotos] = useState([])

  const loadImages = async (searchTerm) => {
    const response = await getImages(searchTerm)
    setPhotos(response.data.photos)
  }

  useEffect(() => {
    loadImages()
  }, [])

  return (
    <View style={styles.headerPhotographer}>
      <Image source={{ uri: image.src.large2x, height: 350 }} />
      <View style={{
        display: 'flex',
        paddingVertical: 18,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%'
      }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Avatar title={image.photographer.split(' ').map(string => string[0]).join('').toUpperCase()} containerStyle={{ backgroundColor: 'red' }} rounded />
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.textPhotographer}>{image.photographer}</Text>
          </TouchableOpacity>
        </View>
        <Button title="Download" buttonStyle={{ backgroundColor: '#229783' }} onPress={handleDownload} />
      </View>
      <View>
        <ImageList photos={photos} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerPhotographer: {
    backgroundColor: '#0D0D0D',
    flex: 1,
    flexDirection: 'column',
    padding: 10
  },
  textPhotographer: {
    color: 'white',
    fontWeight: 'bold',
    marginStart: 5,
    fontSize: 18
  }
})

export default ImageScreen