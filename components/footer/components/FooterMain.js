import React from 'react'
import styled from 'styled-components'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


 const FooterMain = () => {
  return (
    <Main>
        <SubMain>
            <Division>
              <Head>MediLedger</Head>
              <Text>
                Decentralised Application for Medical Record and Account Management
              </Text>
            </Division>
            <Division>
                <Text><Head>Give Feedback</Head></Text>
                <Input type='EMail'></Input>
                <Submit><Input type='Submit'></Input></Submit>
            </Division>
            <Division>
                <Head>Follow Us</Head>
                <Icon>
                <InstagramIcon />
                <FacebookIcon />
                <LinkedInIcon />
                </Icon>
                
            </Division>
            <Division>
                <Head>Contact Us</Head>
                <Text>medi@nitp.ac.in</Text>
                <Text>+7687 8786</Text>
            </Division>
        </SubMain>
    </Main>
  )
}

const Submit=styled.button`
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 3px;
  text-align: center;
  width: max-content;
  background-color: ${(props) => props.theme.btnColor};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Poppins';
  text-transform: uppercase;
  &:hover{
    background-color: ${(props) => props.theme.colorSec} ;
    color:${(props) => props.theme.Color} ;
    transform: translateY(-2px);
    transition: transform 0.5s;
  }
  font-size: 14px;
  font-weight: bold;
`

const SubMain=styled.section`
    width: 60%;
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;

`
const Main=styled.div`
    background-color: ${(props)=>props.theme.bgDiv};
    width:150%;
    height:50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 5rem;
    border-bottom: 0.1rem solid ${(props)=>props.theme.colorDiv};
`
const Division=styled.div`
    width: 120%;
    padding-left: 80px;
    padding-right: 80px;
`
const Icon=styled.div`
   color: ${(props)=>props.theme.colorDiv};
`
const Text=styled.div`
   color: ${(props)=>props.theme.colorDiv};
`
const Head=styled.div`
   color: ${(props)=>props.theme.colorDiv};
   font-style: bold;
   font-weight: 20rem;
   font-family: 'Poppins';
   font-size: 95%;
   text-transform: uppercase;
   padding-bottom: 0.5rem;
   padding-top: 3rem;
   padding-right: 3rem;
   
`
const Input=styled.input`

`

export default FooterMain