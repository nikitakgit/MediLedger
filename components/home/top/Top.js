
import React from 'react'
import styled from 'styled-components'
import TopLeft from './components/TopLeft'
import TopRight from './components/TopRight'

 const Top = () => {
  return (
    <TopWrap>
        <TopLeft/>
        <TopRight/>
        
    </TopWrap>
  )
}

const TopWrap=styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 2%;
    padding-top: 4.5rem;
    
`
export default Top