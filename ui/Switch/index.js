import React, { useState } from 'react';
import { Switch } from 'react-native';

function RNSwitch(props) {
    const [isEnabled, toggle] = useState(props.value || false);

    return (
        <Switch
            {...props}
            onValueChange={() => {
                
                toggle(!isEnabled);
                props.onValueChange(!isEnabled);
            }}
            value={isEnabled}
        />
    )
}

export default RNSwitch;