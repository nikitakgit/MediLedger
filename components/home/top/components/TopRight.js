import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'



const TopRight = () => {
  return (
    <TopRightWrap>
       <Image src="https://img.freepik.com/free-vector/online-doctor-concept_23-2148529537.jpg?w=826&t=st=1714526434~exp=1714527034~hmac=6826fb9935db27d913c033a08233930ecea4e131d804714f957dac11b2010b04" width="740" height="700"/>
    </TopRightWrap>
  )
}

const TopRightWrap=styled.div`
    width: 38%;
    
`

export default TopRight