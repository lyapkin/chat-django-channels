import React from 'react'

import useConnectionUserInfo from '../hooks/useConnectionUserInfo'

const ConnectionInfo = () => {
    const connectionUserInfo = useConnectionUserInfo()

    return (
        <div>
            {connectionUserInfo && (`${connectionUserInfo.connectionFirstName} ${connectionUserInfo.connectionLastName}`.trim() || `${connectionUserInfo.connectionUsername}`)}
        </div>
    )
}

export default ConnectionInfo