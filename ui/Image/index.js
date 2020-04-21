import React from 'react';
import { Image, StyleSheet } from "react-native";

function RNImage (props) {
    let imageSize = {};
    let aspectRatio = 1;

    if (!props.source.uri) {
        imageSize = Image.resolveAssetSource(props.source);
        aspectRatio = imageSize.width / imageSize.height;
    }

    return (
        <Image {...props} style={[
            styles.image, {aspectRatio: aspectRatio},
            props.style
        ]}/>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: undefined
    }
})

export default RNImage;