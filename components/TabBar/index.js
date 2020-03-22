import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Color } from '../../constants';
import Icon from '../../ui/Icon/Icon';
import { Navigation } from 'react-native-navigation';
import Tab from './Tab';

class TabBar extends React.Component {

    constructor(props) {
        super(props);

        this.tabs = props.config.children;
        this.options = props.config.options
    }

    render() {
        const tabs = this.tabs.map((tab, index) => (
            <Tab style={styles.tab} key={tab.component.id} component={tab.component.id} 
                index={index} options={tab.component.options.bottomTab}/>
        ))

        return (
            <View style={[
                this.props.style,
                styles.container
            ]}>
                {tabs}
            </View>
        )   
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-around',
        backgroundColor: Color.TAB_BAR,
    },
    tab: {

    }
});

TabBar.defaultProps = {
    config: {
        children: [],
        options: {}
    }
}

export default TabBar;