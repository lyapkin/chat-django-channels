import React from 'react'

import SearchConnection from './SearchConnection'

const SearchList = ({ searchResult }) => {
    const users = searchResult.users.map(item => <SearchConnection key={item.userId} data={item} />)
    const content = users.length ? 
        <>
            <h3>Users</h3>
            <ul>{users}</ul>
        </> :
        <h3>No Results</h3>
    
    return content
}

export default SearchList