import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Text} from 'react-native-elements';
import {InputComponent} from '../../components/Input/input';
import ImagePicker from 'react-native-image-picker';
import {TextInputMask} from 'react-native-masked-text';
import {Formik} from 'formik';
import * as yup from 'yup';

const {width, height} = Dimensions.get('screen');

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email('Enter a valid email')
    .required('Email is Required'),
  name: yup
    .string()
    .label('name')
    .required('Name is Required'),
  phoneNumber: yup
    .string()
    .label('number')
    .required('Phone number is Required'),
});
export const FormContainer = props => {
  const [pictures, setPictures] = useState([]);
  const [number, setNumber] = useState('');
  const [numberRef, setNumberRef] = useState();
  const [validForm, setValidForm] = useState(0);
  useEffect(() => {
    console.log('pictures', pictures);
    console.log(pictures.length);
  });

  const validateForm = () => {
    const isNumberValid = numberRef.isValid();
    setValidForm(isNumberValid ? 1: 2)
  };

  const selectImage = async () => {
    ImagePicker.showImagePicker(
      {noData: true, mediaType: 'photo'},
      response => {
        // console.log('Response = ', pictures);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          setPictures([...pictures, response.uri]);
          setTimeout(() => {}, 1000);
        }
      },
    );
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{name: '', email: ''}}
        validationSchema={validationSchema}
        onSubmit={values => {
          Alert.alert(JSON.stringify(values, null, 2));
        }}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          handleBlur,
        }) => (
          <>
            <View style={styles.container2}>
              <Text style={{alignSelf: 'center'}} h4>
                Form
              </Text>
              <InputComponent
                onChangeText={handleChange('name')}
                placeholder="Name"
                errorMessage={
                  errors.name ? errors.name : touched.name ? touched.name : null
                }
                value={values.name}
                onBlur={handleBlur('name')}
              />
              <InputComponent
                onChangeText={handleChange('email')}
                placeholder="Email"
                errorMessage={
                  errors.email
                    ? errors.email
                    : touched.email
                    ? touched.email
                    : null
                }
                value={values.email}
                onBlur={handleBlur('email')}
              />
              <TextInputMask
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#a1a09f',
                  width: width - 70,
                  alignSelf: 'center',
                }}
                type={'cel-phone'}
                options={{
                  maskType: 'INTERNATIONAL',
                  withDDD: true,
                  dddMask: '(99)',
                }}
                value={number}
                onChangeText={text => setNumber(text)}
                ref={ref => setNumberRef(ref)}
                placeholder="+999 999 999 999"
              />
              {validForm === 2 ? <Text style={{color:'red', marginLeft:30, fontSize:12}}>Wrong Entry</Text>:null}
            </View>
            <View style={styles.container3}>
              <TouchableOpacity onPress={() => selectImage()}>
                <Text style={{fontSize: 20, color: 'blue'}}>Select Image</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <Button title="Submit" onPress={validateForm} />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: width,
    height: height,
    alignItems: 'center',
  },
  container2: {
    marginVertical: 50,
  },
  container3: {
    marginBottom: 20,
    width: width,

    alignItems: 'center',
  },
  button: {
    width: width - 50,
  },
});
