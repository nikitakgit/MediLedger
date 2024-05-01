import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {useRouter} from 'next/router';

const BottomLeft = () => {
    const Router=useRouter();
  return (
    <BottomHomeLeftWrap>
        {/* <Paragraph>Become a part of </Paragraph> */}
        <Heading>MEDILEDGER</Heading>
        <Paragraph>A secure, transparent, and efficient platform for managing medical records and reimbursement processes.</Paragraph>
        
        <Caption>
            A DIGITALLY SMARTER SOLUTION
            
        </Caption>
        <Paragraph>To visit Patient Details, Click Below: </Paragraph>
        <ButtonWrap><Link  style={{textDecoration:'none'}} href="/" > <TNavLinks active={Router.pathname=="/"?true:false}>
        All Patients
      </TNavLinks></Link></ButtonWrap>
       
        
    </BottomHomeLeftWrap>    
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
    margin:5px;
    border-radius: 10px;
    padding: 2px 5px 5px;
    cursor: pointer;
    text-transform: uppercase;
     font-weight: bold ;
     font-size: medium;
`

const Text=styled.p`
  margin-top: 0;
`
const BottomHomeLeftWrap=styled.div`
  width:48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 10rem;
  margin-left: 4rem;
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
   font-size: 90px;
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
  // transition: all 0.3s ease;
`
export default BottomLeft