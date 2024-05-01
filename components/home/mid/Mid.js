import React from 'react'
import styled from 'styled-components'
import MidLeft from './components/MidLeft'
import MidRight from './components/MidRight'

const Mid = () => {
  return (
    <MidHomeWrap >
      <MidRight/>
        <MidLeft/>
        
    </MidHomeWrap>
  )
}
const MidHomeWrap=styled.section`
    display: flex;
    justify-content: center;
    padding-bottom: 2%;
    
`

export default Mid