import React from 'react';
import { Image, StyleSheet } from "react-native";

/**
 * This component was created to force images have 
 * correct dimensions base on aspectRatio by default
 * 
 * @param {Object} props 
 */

 //TODO: do the same for dynamic loaded images

function RNImage (props) {
    const source = props.source;
    let imageSize = {};

    if (source) {
        imageSize = Image.resolveAssetSource(source);
    }

    const aspectRatio = imageSize.width / imageSize.height;

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