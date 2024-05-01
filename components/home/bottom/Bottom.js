import React from 'react'
import styled from 'styled-components'
import BottomLeft from './components/BottomLeft'
import BottomRight from './components/BottomRight'

const Bottom = () => {
  return (
    <BottomHomeWrap>
    <BottomLeft/>
    <BottomRight/>
    
</BottomHomeWrap>
)
}

const BottomHomeWrap=styled.section`
display: flex;
justify-content: center;
padding-bottom: 4%;
`

export default Bottom