import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import { Center, Text, Container, FormControl, Input, NativeBaseProvider, VStack, ScrollView, Button, HStack} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';



export default class ReservationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      totalPersons: '',
      date: new Date(1598051730000),
      showDate: false,
      dateMode: 'date',
      time: new Date(1598051730000),
      showTime: false,
      timeMode: 'time',      
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      phoneError: false,
      totalPersonsError: false,
      
      animating: false,
    }
  }

  //Date
  onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      showDate: false,
      date: currentDate
    });
    console.log('Date ' +this.state.date.toDateString() + ' ' + event);
  };

  showDateMode = (currentMode) => {
    this.setState({
      showDate: true,
      dateMode: currentMode
    })
  };

  showDatepicker = () => {
    this.showDateMode('date');
  };

  //Time

  onChangeTime = (event, selectedTime) => {
    const currentDate = selectedTime || this.state.time;
    this.setState({
      showTime: false,
      time: currentDate
    });
    console.log('Time ' +this.state.date.toDateString() + ' ' + JSON.stringify(event));
  };

  showTimeMode = (currentMode) => {
    this.setState({
      showTime: true,
      timeMode: currentMode
    })
  };

  showTimepicker = () => {
    this.showTimeMode('time');
  };

  phoneValidation = (phone) => {
    var regexp = /(\d[0-9]{8,16})$/   
    return regexp.test(phone)
  }

  onFocus = () => {
    this.setState({
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      phoneError: false,
      totalPersonsError: false,
      dateError: false,
      timeError: false,
    })
  }

  clearField = () => {
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      totalPersons: '',
    })
  }

  addReservation = (firstName, lastName, email, phone, totalPersons, date, time) => {    
    if(!firstName){
      this.setState({firstNameError: true});
      return;
    }
    else if (!lastName) {
      this.setState({lastNameError: true});
      return
    }
    else if(!email){
      this.setState({emailError: true});
      return
    }
    else if (!phone || !this.phoneValidation(phone)) {
      this.setState({phoneError: true});
      return
    }
    else if (!totalPersons){
      this.setState({totalPersons: true});
      return
    }
    else if (!date){
      this.setState({dateError: true});
      return
    }
    else if(!time){
      this.setState({timeError: true});
      return
    }
    this.setState({animating: true})    
    let data = {
      firstname: firstName, 
      lastName: lastName, 
      email: email, 
      phone: phone, 
      totalPersons: totalPersons, 
      date: date, 
      time: time,
    }
    axios.post('http://192.168.42.215:8082/api/Reservation', data)
    .then(() =>{     
      console.log('Reservation Created Successfully');
      alert('Your reservation was successfully submitted')
      this.setState({animating: false});
      this.props.navigation.navigate('Menu');
      this.clearField();
    })
    .catch((err) =>{
      console.log('Could not add Reservation ' +err);
      this.setState({animating: false})
    })
  }

  
 render() {
   const {animating } = this.state
  return(
    <NativeBaseProvider>
      <Container style={styles.container}>
           <ScrollView w={Dimensions.get('window').width - 40} my={16}>
           <VStack space={3} >
             <FormControl >
               <Input size={'lg'}
                _focus={{borderColor: 'grey'}}
                isInvalid = {this.state.firstNameError}
                variant = 'outline'
                placeholder = 'First Name'               
                autoCapitalize = 'none'
                autoCorrect = {false}
                keyboardType= 'default'
                onChangeText={firstName => this.setState({firstName})}
                value = {this.state.firstName}
                onFocus = {() => this.onFocus()}
               />
             </FormControl>

             <FormControl>
               <Input size={'lg'}
                _focus={{borderColor: 'grey'}}
                isInvalid = {this.state.lastNameError}
                variant = 'outline'
                placeholder = 'Last Name'                
                autoCapitalize = 'none'
                autoCorrect = {false}
                keyboardType= 'default'
                onChangeText={lastName => this.setState({lastName})}
                value = {this.state.lastName}
                onFocus = {() => this.onFocus()}
               />
             </FormControl>

             <FormControl>
               <Input size={'lg'}
                _focus={{borderColor: 'grey'}}
                isInvalid = {this.state.emailError}
                variant = 'outline'
                placeholder = 'Email'                
                autoCapitalize = 'none'
                autoCorrect = {false}
                keyboardType= 'email-address'
                onChangeText={email => this.setState({email})}
                value = {this.state.email}
                onFocus = {() => this.onFocus()}
               />
             </FormControl>

             <FormControl>
               <Input size={'lg'}
                _focus={{borderColor: 'grey'}}
                isInvalid = {this.state.phoneError}
                variant = 'outline'
                placeholder = 'Phone'                
                autoCapitalize = 'none'
                autoCorrect = {false}
                keyboardType= 'phone-pad'
                onChangeText={phone => this.setState({phone})}
                value = {this.state.phone}
                onFocus = {() => this.onFocus()}
               />
             </FormControl>

             <FormControl>
               <Input size={'lg'}
                _focus={{borderColor: 'grey'}}
                isInvalid = {this.state.totalPersonsError}
                variant = 'outline'
                placeholder = 'Total Persons'                
                autoCapitalize = 'none'
                autoCorrect = {false}
                keyboardType= 'number-pad'
                onChangeText={totalPersons => this.setState({totalPersons})}
                value = {this.state.totalPersons}
                onFocus = {() => this.onFocus()}
               />
             </FormControl>

             <FormControl isDisabled> 
                {this.state.showDate && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.date}
                    mode={this.state.dateMode}
                    //is24Hour={true}                    
                    onChange={this.onChangeDate}
                  />
                )}          
               <Input size={'lg'}
                _focus={{borderColor: 'grey'}}                
                variant = 'outline'
                onChangeText={date => this.setState({date})}
                value = {this.state.date.toDateString()}
                onFocus = {() => this.onFocus()}
                InputRightElement = {<Button size={'lg'} backgroundColor={'#8C502E'} onPress={() => {this.showDatepicker()}}>Date</Button>}
               />
             </FormControl>

             <FormControl isDisabled>
                {this.state.showTime && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.time}
                    mode={this.state.timeMode}
                    is24Hour={true}                    
                    onChange={this.onChangeTime}
                  />
                )} 
               <Input  size={'lg'}
                _focus={{borderColor: 'grey'}}                
                variant = 'outline'                
                onChangeText={time => this.setState({time})}
                value = {this.state.time.toTimeString()}
                onFocus = {() => this.onFocus()}
                InputRightElement = {<Button size={'lg'} backgroundColor={'#8C502E'} onPress={() => {this.showTimepicker()}}>Time</Button>}
               />
             </FormControl>
             <Button 
             size={'lg'} backgroundColor={'#8C502E'} h={50}
             _text = {{fontFamily: 'MontserratSemiBold', fontSize: 18}} 
             isLoading = {this.state.animating}               
             isLoadingText ='Submitting'
             spinnerPlacement = 'start'
             _spinner={{ color: "white", size: 30 }}
             
              onPress = {() => {
                this.addReservation(
                  this.state.firstName,
                  this.state.lastName,
                  this.state.email,
                  this.state.phone,
                  this.state.totalPersons,
                  this.state.date,
                  this.state.time,
                )
              }} 
             >
               Create Reservation

             </Button>
           </VStack>    
           </ScrollView>
      </Container>
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
    alignSelf: 'center'
  },
 
  
});
