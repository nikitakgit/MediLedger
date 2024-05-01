import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'



const MidRight = () => {
  return (
    <MidHomeRightWrap>
       <Image src="https://img.freepik.com/free-vector/online-doctor-concept_23-2148508373.jpg?size=626&ext=jpg&ga=GA1.1.1726448641.1714521732&semt=sph" width="640" height="700"/>
    

    </MidHomeRightWrap>
  )
}

const MidHomeRightWrap=styled.div`
    padding-top: 6rem;
    width: 48%;
    display: flex;
    justify-content: right;
    padding-right: 5rem;
    padding-bottom: 1rem;
`
export default MidRight