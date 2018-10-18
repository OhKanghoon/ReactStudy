import React from 'react'

const Home = ({history}) => {
  return (
    <div>
      <h2>
        간지나는 홈
        <button onClick={() => {history.push('./posts')}}> 포스트로 이동 </button>
      </h2>
    </div>
  )
}

export default Home;