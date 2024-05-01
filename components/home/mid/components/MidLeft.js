
import styled from 'styled-components'
import Link from 'next/link'
import {useRouter} from 'next/router';

const MidLeft = () => {
    const Router=useRouter();
  return (
    <MidHomeLeftWrap>
        
        <Heading>WHY MEDILEDGER?</Heading>
        <Paragraph> Facilitates Seamless Financial Transactions</Paragraph>
        
        <Caption>
            NO PAPERWORK NO DELAYS 
        </Caption>
      <Paragraph> Access your health records from anywhere. </Paragraph>
      <Paragraph> Get Registered: </Paragraph>
        <ButtonWrap><Link  style={{textDecoration:'none'}} href="/addPatient" > <TNavLinks active={Router.pathname=="/addPatient"?true:false}>
        Register Patient
      </TNavLinks></Link></ButtonWrap>
       {/* <Paragraph>Scroll down  to see more </Paragraph> */}
       
        
    </MidHomeLeftWrap>    
  )
}

const TNavLinks=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme.colorDiv};     
    text-decoration: none;
    &:hover{
    background-color: ${(props) => props.theme.colorSec} ;
    color:${(props) => props.theme.color} ;
    transform: translateY(-2px);
    transition: transform 0.5s;
  }
    height: max-content;
    width: max-content;
    font-family: 'Poppins';
    margin: 5px;
    border-radius: 10px;
    padding: 2px 5px 5px;
    height: 50%;
    cursor: pointer;
    text-transform: uppercase;
     font-weight: bold ;
     font-size: large;
`

const Text=styled.p`
  margin-top: 0;
`
const MidHomeLeftWrap=styled.div`
  width:48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 10rem;
  margin-right: 4rem;
`
const Caption=styled.h1`
   font-family: 'Poppins';
   font-size:1rem;
   font-weight: 300;
   font-style: bold;
   height: max-content;
   width: max-content;
   letter-spacing: 0.2rem;
   color:${(props) => props.theme.btnColor} ;
`

const Heading=styled.h1`
   font-family: 'Poppins';
   font-size: 80px;
   font-weight: 1000;
   font-style: bold;
   height: 80px;
   width: max-content;
   letter-spacing: 0.5rem;
   color:${(props) => props.theme.btnColor} ;
`
const Paragraph=styled.p`
   margin:0;
   font-size: 20px;
   padding: 0;
   font-weight: 10000;
   text-align: center;
   font-family: 'Poppins';
   font-style: bold;
`
const ButtonWrap = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 3px;
  text-align: center;
  width: max-content;
  background-color: ${(props) => props.theme.btnColor};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  &:hover{
    background-color: ${(props) => props.theme.colorSec} ;
    color:${(props) => props.theme.color} ;
    transform: translateY(-2px);
    transition: transform 0.5s;
  }
  font-size: 14px;
  font-weight: bold;
  //transition: all 0.3s ease;
`
export default MidLeft