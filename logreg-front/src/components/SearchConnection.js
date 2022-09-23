import React from 'react'

const SearchConnection = ({data}) => {
    return (
        <li className='connection' >
            {data.username}
        </li>
    )
}

export default SearchConnection