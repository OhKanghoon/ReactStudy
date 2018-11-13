import React from 'react'
import quertString from 'query-string'


const About = ({location, match}) => {
  const query = quertString.parse(location.search)
  const detail = query.detail === 'true'
  return (
    <div>
        <h2>
          어바웃타임! {match.params.name}
        </h2>
        {detail && 'detail: blahblah'}
    </div>
  )
}

export default About;