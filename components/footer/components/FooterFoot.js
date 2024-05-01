import React from 'react'
import styled from 'styled-components'

 const FooterFoot = () => {
  return (
    <Header>
        <SubHeader>
        <Div>
          <Text>
          National Institute of Technology Patna-800005, Bihar, INDIA ©2024 NIT Patna
          </Text>
        </Div>
        </SubHeader>
    </Header>
  )
}

const Header=styled.section`
height: 5vh;
width: 100%;
display: flex;
flex-direction: row;
justify-content: center;
text-aligned: center;
// background-color: ${(props) => props.theme.bgDiv};
`
const SubHeader=styled.section`
width: 60%;
display: flex;
`
const Div=styled.div`
     width: 100%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     
`

const Text=styled.div`
color: ${(props)=>props.theme.colorDiv};
    font-family: 'Poppins';
`
export default FooterFoot