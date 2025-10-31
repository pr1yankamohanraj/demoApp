import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const CustomButton = ({onPress, text}) => {
    return (
        <Pressable onPress={ onPress } style={styles.container}> 
            <Text style={styles.text}> {text} </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor: '#0A4E78',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 20,
        marginTop: 2,
        marginBottom: 20,
        alignSelf: 'flex-start',
        width: '81%',
        bottom: -50,
        right: -35,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    }
});

export default CustomButton; 