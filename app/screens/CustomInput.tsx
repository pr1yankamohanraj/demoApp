import React from 'react';
import { StyleSheet, TextInput, View, } from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}  
            placeholderTextColor="#bbb"
            style={styles.input} 
            secureTextEntry={secureTextEntry}
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '80%', 

        borderColor: '#A7D8F0',
        borderWidth: 1,
        borderRadius: 5, 

        paddingHorizontal: 10, 
        marginVertical: -20,
        marginTop: 50,
    },
    input: {
        height: 40,
        fontSize: 16,
        color: '#000', 
    }
});

export default CustomInput 