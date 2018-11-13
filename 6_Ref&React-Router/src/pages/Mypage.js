import React from 'react'
import { Redirect } from 'react-router-dom';


const Mypage = ({value}) => {
  const checkLogged = () => {
    if(!value) {
      alert('로그인부터 하세욥 :)')
      return false
    } else return true
  }
  return (
    <div>
      { checkLogged() ? '마이페이지' : <Redirect to="/login"/> }
    </div>
  )
}

export default Mypage;