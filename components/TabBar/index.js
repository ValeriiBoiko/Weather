import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from '../../constants';
import Tab from './Tab';

function TabBar(props) {
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-around',
        backgroundColor: Color.TAB_BAR,
    }
});

TabBar.defaultProps = {
    config: {
        children: [],
        options: {}
    }
}

export default TabBar;