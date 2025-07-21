import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-native'
import {setActiveBookCategory} from "../../store/features/book/bookSlice.js"
import "../../global.css"
const home = () => {
    const activeCategory = useSelector(state => state.book.activeBookCategory)
    const dispatch = useDispatch()
    return (
    <View>
      <Text className="mt-20">home - {activeCategory}</Text>
      <Button title='Bookooo' onPress={()=> dispatch(setActiveBookCategory("Moraasoo"))}/>
    </View>
  )
}

export default home