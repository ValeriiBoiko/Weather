import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Color } from '../../constants';
import { widthDependedPixel } from '../../utils/units';
import Touchable from '../../ui/Touchable';
import Icon from '../../ui/Icon/Icon';
import { connect } from 'react-redux';

function ButtonGroup(props) {
    const [activeButton, setActiveButton] = useState(props.selected);

    if (activeButton !== props.selected) {
        setActiveButton(props.selected);
    }

    const styles = getStyles(props);
    const activeStyle = [
        styles.groupButton,
        styles.activeGroupButton
    ];

    const buttons = props.buttons.map(button => {
        const style = button.value === activeButton ? activeStyle : styles.groupButton;
        const valueStyle = button.value === activeButton ? styles.contentActiveColor : styles.contentColor;

        const label = button.label ? <Text style={valueStyle}>{button.label}</Text> : null;
        const icon = button.icon ? <Icon name={button.icon} size={props.size} style={valueStyle} /> : null;

        return (
            <Touchable key={button.value} style={style} onPress={() => {
                setActiveButton(button.value);
                props.onValueChange(button.value);
            }}>
                {icon}
                {label}
            </Touchable>
        )
    })

    return (
        <View style={styles.buttonGroup}>
            {buttons}
        </View>
    )
}

const getStyles = (props) => (
    StyleSheet.create({
        buttonGroup: {
            flexDirection: 'row',
            alignItems: 'stretch',
            borderRadius: widthDependedPixel(7),
            overflow: 'hidden',
            borderColor: Color[props.colorScheme].CYAN,
            borderWidth: 1
        },
        groupButton: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: widthDependedPixel(35),
        },
        activeGroupButton: {
            backgroundColor: props.activeBackground
        },
        contentColor: {
            color: Color[props.colorScheme].BLACK
        },
        contentActiveColor: {
            color: Color[props.colorScheme].WHITE
        }
    })
)

ButtonGroup.defaultProps = {
    size: widthDependedPixel(30),
    buttons: []
}

const mapStateToProps = (state, props) => ({
    colorScheme: state.colorScheme,
    background: props.background || Color[state.colorScheme].TAB_BAR,
    activeBackground: props.activeBackground || Color[state.colorScheme].CYAN,
})

export default connect(mapStateToProps)(ButtonGroup);

// export default connect(mapStateToProps)(React.memo(ButtonGroup, (prevProps, nextProps) => {
//     // if (prevProps.selected !== nextProps.selected) {
//     //     return true
//     // }

//     // return false;

//     return true
// }));