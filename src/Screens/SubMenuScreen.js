import {NativeBaseProvider,  VStack, HStack, Skeleton, FlatList, Text, Image, Center } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View, Dimensions  } from 'react-native';


export default class SubMenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  displaySubMenu = ({item}) => {  
     let isLoaded = false 
    if (item.subMenu != '') {
      isLoaded = true;      
    }    
    
    return(
      <VStack borderWidth={0} borderColor={'coolGray.300'} bg={'coolGray.100'} rounded={0} shadow={0} mt={3} w={Dimensions.get('window').width -15} >
        <HStack>
          {/* Image */}
          <Skeleton size={100} borderRadius={100} mt={3} isLoaded={isLoaded}>
          <Image alignSelf={'center'} alt='SubMenu Image' source = {{uri:item.image}} size={100} mt={3} borderRadius={100} resizeMode={"contain"}/>
          </Skeleton>                    
          <VStack mt={5} w={"90%"} flex={1} alignItems={'flex-start'} >
            {/* Name */}
          <Skeleton.Text ml={10} lines={1} mt={0} isLoaded={isLoaded}>
            <Text  fontSize={18} fontFamily={'MontserratSemiBold'} mt={0} ml={5} >{item.name}</Text>           
          </Skeleton.Text>
          {/* Description */}
          <Skeleton.Text  ml={10} lines={1} mt={1} lineHeight={20} isLoaded={isLoaded}>
          <Text lineHeight={22} fontSize={18} fontFamily={"SourceSansProRegular"} mt={1} ml={5}  >{item.description}</Text>            
          </Skeleton.Text>
          {/* Price */}
          <HStack>
            {/* Naira */}
            <Skeleton pt={5} mr={1} size={4} ml={5} mb={4} mt={2} isLoaded={isLoaded}>
              <Image pt={5} mr={1} size={4} mb={4} ml={5} mt={2} alt='Naira' source= {require('../Images/Naira.png')}/>
            </Skeleton>
            {/* Amount */}
            <Skeleton.Text  ml={5} lines={1} mt={1}  mb={4} isLoaded={isLoaded}>
              <Text  fontSize={19} fontFamily={"SourceSansProRegular"} mt={1}  mb={4}>{item.price}</Text>
            </Skeleton.Text>
          </HStack>
          </VStack>
        </HStack>
      </VStack>
    )
  }

  
 render() {
  let { subMenu } = this.props.route.params;
  
  return(
    <NativeBaseProvider>
      <Center >
         <FlatList
            data={subMenu}
            renderItem={this.displaySubMenu}
            keyExtractor={item => item.id}
         />

    </Center>
    </NativeBaseProvider>
  )
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    
  },
});
