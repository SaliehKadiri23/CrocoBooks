import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-native'

const home = () => {
    const activeCategory = useSelector(state => state.book.activeBookCategory)
    const dispatch = useDispatch()
    return (
    <View>
      <Text>home - {activeCategory}</Text>
      <Button/ title='Bookooo' onPress={()=>}/>
    </View>
  )
}

export default home