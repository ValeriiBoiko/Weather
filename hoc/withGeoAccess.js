import React from 'react';

function withGeoAccess(Component) {
    return (
        class extends React.Component {

            render () {
                return <Component {...this.props} />
            }

        }
    )
}

export default withGeoAccess;