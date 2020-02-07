import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Input} from 'react-native-elements';

const {width, height} = Dimensions.get('screen');
export const InputComponent = props => {
  return (
    <View style={styles.container}>
      <Input
        errorMessage={props.errorMessage}
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        onBlur={props.onBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: width - 50,
    alignSelf: 'center',
    margin: 15,
  },
});

// ImagePicker.openCamera({
//   multiple:true
// }).then(image =>{
//   setPictures([...pictures, image])
//   setTimeout(() => console.log(pictures), 100);
//   // setPictures(...JSON.stringify(image));
//   // console.log(pictures.length)
// })
