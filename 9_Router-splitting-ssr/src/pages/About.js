import React from 'react';
import queryString from 'query-string'

const About = ({match, location}) => {
    const query = queryString.parse(location.search)
    console.log(query)
    return (
        <div>
            <h2>This is About {match.params.name}</h2>
            <h2>Search Word is {query.search}</h2>
        </div>
    );
};

export default About;