import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Item from './Item';
import { widthDependedPixel, widthPercentageToDP } from '../../utils/units';
import { Color } from '../../constants';

class DetailWeatherInfo extends React.Component {
    render() {
        return (
            <View style={[
                styles.container,
                this.props.style
            ]}>
                <Item style={styles.item} 
                    name={'temp'} color={'#999'} 
                    size={widthDependedPixel(75)}
                    title={'Feels like'} value={'36 C'}/>
                <Item style={styles.item} 
                    name={'wind'} color={'#999'} 
                    size={widthDependedPixel(75)}
                    title={'Wind'} value={'9 km/h'} />
                <Item style={styles.item} 
                    name={'sunrise'} color={'#999'} 
                    size={widthDependedPixel(75)}
                    title={'Sunrise'} value={'9 km/h'} />
                <Item style={styles.item} 
                    name={'sunset'} color={'#999'} 
                    size={widthDependedPixel(75)}
                    title={'Sunset'} value={'9 km/h'} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: Color.WHITE,
        alignContent: 'stretch',
        flex: 1,
    },
    item: {
        minWidth: '50%'
    }
})

export default DetailWeatherInfo;