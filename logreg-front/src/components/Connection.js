import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'

import '../styles/Connection.css'

import { formatTime } from '../utils/dateTime'

const Connection = ({data}) => {
    const navigate = useNavigate()
    const {connectionUserId} = useParams()

    const date = parseDate(data.lastMessageTime)

    return (
        <li className={`connection ${(Number(connectionUserId) === data.connectionUserId) && 'connection_active'}`} onClick={() => navigate(`${data.connectionUserId}`, {replace: Boolean(connectionUserId)})}>
            <div className='connection__header'>
                <span className='connection__username'>@{data.connectionUsername}</span>
                <span className='connection__message-time'>{date}</span>
            </div>
            <div className='connection__body'>
                <span className='connection__message-sender'>{data.lastMessageSentBy ? data.lastMessageSentBy + ': ' : ''}</span>
                <span className='connection__message'>{data.lastMessageContent || ''}</span>
            </div>
        </li>
    )
}

export default Connection

function parseDate(value) {
    if (!value) return ''

    const date = new Date(Date.parse(value))
    const now = new Date()
    const dif = now - date

    if (dif < 24*3600*1000 && date.getDate() === now.getDate()) {
        return formatTime(date)
    }

    if (dif < 24*3600*1000*31 && date.getMonth() === now.getMonth()) {
        const days = now.getDate() - date.getDate()
        if (days === 1) return 'yesterday'
        return `${days} days ago`
    }

    if (dif < 24*3600*1000*31*365 && date.getFullYear() === now.getFullYear()) {
        const months = now.getMonth() - date.getMonth()
        if (months === 1) return 'last month'
        return `${months} months ago`
    }

    const years = now.getFullYear() - date.getFullYear()
    if (years === 1 ) return 'last year'
    return `${years} years ago`
}