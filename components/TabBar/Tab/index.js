import React from 'react';
import { Action } from '../../../constants';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import Tab from './Tab';

class TabContainer extends React.Component {

    constructor(props) {
        super(props);
        this.screenEventListener = Navigation.events().registerComponentDidAppearListener(({ componentId, componentName, passProps }) => {
            this.props.setScreen(componentId)
        });

        this.openTab = this.openTab.bind(this);
    }

    render() {
        return (
            <Tab onPress={ this.openTab } {...this.props}/>
        )
    }

    openTab() {
        Navigation.mergeOptions(this.props.component, {
            bottomTabs: {
                currentTabIndex: this.props.index
            }
        });
    }
}

const mapStateToProps = (state) => ({
    currentScreen: state.app.currentScreen,
});

const mapDispatchToScreen = (dispatch) => ({
    setScreen: (screen) => dispatch({
        type: Action.SET_SCREEN,
        screenComponent: screen
    })
})

export default connect(mapStateToProps, mapDispatchToScreen)(TabContainer);