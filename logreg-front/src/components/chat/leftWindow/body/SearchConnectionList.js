import React from 'react'

import SearchConnection from './SearchConnection'

const SearchList = ({ searchResult }) => {
    const users = searchResult.users.map(item => <SearchConnection key={item.userId} data={item} />)
    const content = users.length ? 
        <>
            <h3 className='left-window__search-headline'>Users</h3>
            <ul className='left-window__list'>{users}</ul>
        </> :
        <h3 className='left-window__search-headline'>No Results</h3>
    
    return content
}

export default SearchList