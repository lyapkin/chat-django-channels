import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MOBILE_VERSION_WIDTH } from "../constants";

import { useLastCkickedConnection } from "./useLastClickedConnection";


const useConnectionUserId = () => {
    /*
        This hook helps the messeges view in the right window to stay consistent while using the browwser back and forth buttons,
        holding it away from jumping between different chats.

        It gives the last clicked chat to the right window if there is any.
        If user navigates back and there is some other chat, different form the current one, in the history stack
        then the right window still renders the current one.

        Also the navigation buttons doesn't affect the rigth window while the left window view different from the main
        (the user's list of connections)
    */
    const isPrevLocationNotDefaultLeftWindowRef = useRef(false)
    const {lastClickedConnection: currentConnection, setLastClickedConnection} = useLastCkickedConnection()
    const {connectionUserId: historyConnection} = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const connectionId = currentConnection || historyConnection
    
    useEffect(() => {
        if (historyConnection && historyConnection !== currentConnection && currentConnection) {
            // When a user goes back or forth and there is a chat in the history stack different from the current one
            // it replaces the history chat with the current one.
            navigate(connectionId, {replace: true, state: location.state})
        } else if (!historyConnection && currentConnection && isPrevLocationNotDefaultLeftWindowRef.current &&
                    document.documentElement.clientWidth > MOBILE_VERSION_WIDTH) {
            // When a user goes back or forth and there is no chat in the history stack and there is the current chat
            // it puts the current chat in the popping up point from the history stack.
            // It runs in the full size version of the app
            navigate(connectionId)
        } else if (!historyConnection && currentConnection &&
                    (!location.state?.isLeftWindowNotDefault || document.documentElement.clientWidth <= MOBILE_VERSION_WIDTH)) {
            setLastClickedConnection(null)
        }
    }, [historyConnection, currentConnection])

    useEffect(() => {
        return () => {
            if (location.state?.isLeftWindowNotDefault) {
                isPrevLocationNotDefaultLeftWindowRef.current = true
            } else {
                isPrevLocationNotDefaultLeftWindowRef.current = false
            }
        }
    }, [location])

    return connectionId
}

export default useConnectionUserId