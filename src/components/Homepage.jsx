import React from 'react'
import Cryptocurrencies from './Cryptocurrencies'

const Homepage = () => {
    return (
        <React.Fragment>
            {<Cryptocurrencies home asShow={"Home"}/>}
        </React.Fragment>
    )
}

export default Homepage
