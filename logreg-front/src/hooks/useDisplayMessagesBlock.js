import {useState, useEffect} from 'react'

import {MOBILE_VERSION_WIDTH} from '../constants'

export const useDisplayMessagesBlock = (connectionUserId) => {
    /*
        Helps unmount messages after they are hidden in mobile version
    */
    const [isVisible, setIsVisible] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

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