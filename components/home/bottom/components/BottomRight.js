import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

const BottomRight = () => {
  return (
    <BottomHomeRightWrap>
       <Image src="https://img.freepik.com/free-vector/group-doctors-standing-hospital-building-team-practitioners-ambulance-car_74855-14034.jpg?w=1380&t=st=1714527120~exp=1714527720~hmac=ef1e6d8c3ebbdea2c3f661e56622707db1b9cb33f072ca5ee9f906fe9b565b34" width="750" height="700"/>
    </BottomHomeRightWrap>
  )
}

const BottomHomeRightWrap=styled.div`
padding-top: 4rem;
    width: 48%;
    display: flex;
    image-align: center;
`
export default BottomRight