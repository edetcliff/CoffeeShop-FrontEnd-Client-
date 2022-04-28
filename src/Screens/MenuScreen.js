import React, { Component } from 'react';
import { StyleSheet,  Dimensions,  } from 'react-native';
import axios from 'axios';
import { Text, Container, VStack, Image, Skeleton, Pressable, NativeBaseProvider,  ScrollView } from 'native-base';



export default class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoaded: false,
    }
  }

  GetMenu = () => {
    axios.get('http://192.168.42.215:8082/api/menu')
    .then((res) =>{
      this.setState({dataSource: res.data});
      if (this.state.dataSource != '') {       
        this.setState({isLoaded: true});               
      }
      //console.log('dataSource ' +JSON.stringify(this.state.dataSource));
    })
    .catch((err) =>{
      console.log('Could not fetch Menu ' + err);
    })
  }



  componentDidMount() {
    this.GetMenu();
  }
  
 render() {
   let {dataSource} = this.state    
    //
      return(
        <NativeBaseProvider >
         <Container style={styles.container}>          
           <ScrollView w={ Dimensions.get('window').width - 15  }>
           {
             dataSource.map((item, index) =>{
              let {isLoaded} = this.state            
              let subMenu = item.subMenu;              
               return (                
                    <VStack key={index} borderWidth={1} borderColor="coolGray.300" bg="coolGray.100" rounded={8} p={0} mt={3} mb={2} shadow={3} >
                      <Pressable key={index} onPress ={() => {this.props.navigation.navigate('SubMenu', {subMenu})}} >                      
                        <Skeleton w={Dimensions.get('window').width } h={200} isLoaded={isLoaded}>
                          <Image source ={{uri: item.image}} alt = 'Menu image' w={Dimensions.get('window').width } h={200}/>
                        </Skeleton>
                        <Skeleton.Text lines={1} isLoaded={isLoaded}  mt={5} mb={5}  px={5} >
                          <Text style = {styles.text} fontSize={"lg"} lineHeight={"18px"} mt={5} mb={5} px={5}>{item.name}</Text>
                        </Skeleton.Text>                                         
                      </Pressable>
                    </VStack >       
               )
             })
           }
           </ScrollView>
         </Container>
       </NativeBaseProvider>
     )
   // 
   
  
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
  text: {
    fontFamily: 'MontserratSemiBold',
    //fontSize: 16,
  }
});
