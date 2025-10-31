import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Alert_DetailsScreen() {
    return (
        <View style={styles.container}>
            <Text> Alert Details </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 105,
      backgroundColor: '#CBE9F3',
    },
  });