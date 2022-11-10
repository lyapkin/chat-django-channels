import { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MOBILE_VERSION_WIDTH } from "../constants";

import {LastClickedConnectionContext} from '../context/LastClickedConnectionContext'


const useConnectionUserId = () => {
    /*
        It helps the browser back and forth buttons work the intended way
    */
    const isPrevLocationOutMainLeftWindowRef = useRef(false)
    const {lastClickedConnection, setLastClickedConnection} = useContext(LastClickedConnectionContext)
    const {connectionUserId} = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const connectionId = lastClickedConnection || connectionUserId
    
    useEffect(() => {
        if (connectionUserId && connectionUserId !== lastClickedConnection && lastClickedConnection) {
            // Before a search there is a chat open
            // It helps to replace the chat with a chosen search chat after going back from the search
            navigate(connectionId, {replace: true, state: location.state})
        } else if (!connectionUserId && lastClickedConnection && isPrevLocationOutMainLeftWindowRef.current &&
                    document.documentElement.clientWidth > MOBILE_VERSION_WIDTH) {
            // Before a search there is no chat open
            // It helps to display a chosen search chat after going back from the search
            // It runs in the full size version of the app
            navigate(connectionId)
        } else if (!connectionUserId && lastClickedConnection &&
                    (!location.state?.isOutOfMainLeftWindow || document.documentElement.clientWidth <= MOBILE_VERSION_WIDTH)) {
            setLastClickedConnection(null)
        }
    }, [connectionUserId, lastClickedConnection])

    useEffect(() => {
        return () => {
            if (location.state?.isOutOfMainLeftWindow) {
                isPrevLocationOutMainLeftWindowRef.current = true
            } else {
                isPrevLocationOutMainLeftWindowRef.current = false
            }
        }
    }, [location])

    return connectionId
}

export default useConnectionUserId