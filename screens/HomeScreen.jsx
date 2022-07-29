import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { getImages } from '../api/pexels'
import { useState } from 'react'
import ImageList from '../components/ImageList'
import {Input, Button} from '@rneui/themed'

const HomeScreen = ({openSearch}) => {

  const [photos, setPhotos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const loadImages = async (searchTerm) => {
    const response = await getImages(searchTerm)
    setPhotos(response.data.photos)
  }

  const handleSearch = async () => {
    await loadImages(searchTerm)
  }

  useEffect(() => {
    loadImages()
  }, [])
  

  return (
    <>
      {openSearch && (
        <View style={styles.searchSeccion}>
          <Input 
            leftIcon={{type: 'feather', name: 'search', color: 'white'}}
            leftIconContainerStyle={styles.searchLeftIcon}
            placeholder='Search a Term' 
            style={styles.input}
            inputContainerStyle={styles.searchInput}
            onChangeText={setSearchTerm}
          />
          <Button title={'Search'} buttonStyle={styles.searchButton} onPress={handleSearch}/>
        </View>
      )}
      <View style={styles.container}>
        <Text style={styles.totalResultText}>1000 Results</Text>
        <ImageList photos={photos}/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center'
  },
  totalResultText: {
    color: '#D0D0D0',
    textAlign: 'right',
    width: '100%',
    // paddingTop: 28
  },
  searchInput: {
    backgroundColor: '#2c292c',
    borderBottomWidth: 0,
    paddingHorizontal: 4,
    color: 'white'
  },
  searchSeccion: {
    backgroundColor: '#0D0D0D',
    width: '100%',
    paddingLeft: 10,
    flex: 1/7,
    flexDirection: 'row',
    paddingRight: 80,
    alignItems: 'center'
  },
  input: {
    color: 'white'
  },
  searchLeftIcon: {
    paddingStart: 10,
    marginRight: 7
  },  
  searchButton: {
    backgroundColor: '#229783',
    marginBottom: 27
  }
})

export default HomeScreen