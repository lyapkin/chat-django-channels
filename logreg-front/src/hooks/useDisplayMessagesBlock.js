import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {MOBILE_VERSION_WIDTH} from '../constants'

export const useDisplayMessagesBlock = () => {
    /*
        Helps unmount messages after they are hidden in mobile version
    */
    const [isVisible, setIsVisible] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const {connectionUserId} = useParams()

    useEffect(() => {
        if (connectionUserId) {
            setIsVisible(true)
            setIsMounted(true)
        } else {
            setIsVisible(false)
            if (document.documentElement.clientWidth > MOBILE_VERSION_WIDTH) {
                setIsMounted(false)
            }
        }
    }, [connectionUserId])

    const handleTransitionEnd = () => {
        if (!isVisible) {
            setIsMounted(false)
        }
    }

    return [isVisible, isMounted, handleTransitionEnd]
}