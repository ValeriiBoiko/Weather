import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from '../../constants';
import Tab from './Tab';
import { connect } from 'react-redux';

function TabBar(props) {
    const styles = getStyles(props);

    const tabs = props.config.children.map((tab, index) => (
        <Tab style={styles.tab} key={tab.component.id} component={tab.component.id}
            index={index} options={tab.component.options.bottomTab} />
    ));

    return (
        <View style={[
            props.style,
            styles.container
        ]}>
            {tabs}
        </View>
    )
}

const getStyles = (props) => (
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            height: 60,
            justifyContent: 'space-around',
            backgroundColor: Color[props.colorScheme].TAB_BAR,
        }
    })
)

TabBar.defaultProps = {
    config: {
        children: [],
        options: {}
    }
}

const mapStateToProps = (state) => ({
    colorScheme: state.colorScheme
})

export default connect(mapStateToProps)(TabBar);