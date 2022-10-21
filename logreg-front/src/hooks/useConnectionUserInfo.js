import { useContext } from "react"

import ConnectionUserInfoContext from "../context/ConnectionUserInfoContext"

const useConnectionUserInfo = () => {
    return useContext(ConnectionUserInfoContext)
}

export default useConnectionUserInfo