import styled from "styled-components";
import {ethers} from 'ethers';
import MediLedger from '../../artifacts/contracts/MediLedger.sol/MediLedger.json'
import Patient from '../../artifacts/contracts/MediLedger.sol/Patient.json'
import { useRouter } from 'next/router';
import { TailSpin } from 'react-loader-spinner'


 export default function Detail({Data}) {
     const Router = useRouter();     


  return (
    <DetailWrapper>
      <BottomContainer>
        <TopLeftWrap>
        <Paragraph>Check Your  </Paragraph>
        <Heading>Medical History And Reimbursement Status Here</Heading>
        <Caption>
            YOUR UPDATES JUST A CLICK AWAY
          </Caption>
        <Paragraph>Scroll down  to see  more ...</Paragraph>
       
        
    </TopLeftWrap> 
    
        </BottomContainer>
        <TopLeftWrap>
        <Paragraph>Here we have our</Paragraph>
        <Heading>Patient Details</Heading>
        <Paragraph>Empowering Patients</Paragraph> 
        <Paragraph>Decentralizing for Accessibility , Privacy and Trust</Paragraph>
        <Paragraph>Transforming HealthCare One Block At A Time</Paragraph>
        <Caption>
            Your Health , Your Data , Your Blockchain
        </Caption>
        <Paragraph> Where Blockchain Meets Medical Records </Paragraph>
        <ButtonWrap><TNavLinks>Transparent and Secure Records,Seamless Reimbursements</TNavLinks></ButtonWrap>
        <Paragraph>Patient Centric Solutions </Paragraph>
       
        
    </TopLeftWrap>    



        <LeftContainer>
            <FundsData>
                <Funds>
                    <FundTextTitle>Pateint Id</FundTextTitle>
                    <FundTextContent>{Data.pid}</FundTextContent>
                </Funds>
                <Funds>
                    <FundTextTitle>Patient Name</FundTextTitle>
                    <FundTextContent>{Data.name}</FundTextContent>
                </Funds>
              </FundsData>
              <FundsData>
                <Funds>
                    <FundTextTitle>Patient Gender</FundTextTitle>
                    <FundTextContent>{Data.gender}</FundTextContent>
                </Funds>
                <Funds>
                    <FundTextTitle>Patient Blood Group</FundTextTitle>
                    <FundTextContent>{Data.bloodgrp}</FundTextContent>
                </Funds>
              </FundsData>
              <FundsData>
                <Funds>
                    <FundTextTitle>Patient height (in cm)</FundTextTitle>
                    <FundTextContent>{Data.height}</FundTextContent>
                </Funds>
                <Funds>
                    <FundTextTitle>Patient weight</FundTextTitle>
                    <FundTextContent>{Data.weight}</FundTextContent>
                </Funds>
            </FundsData>
            <FundsData>
                <Funds>
                    <FundTextTitle>Wallet Address</FundTextTitle>
                    <FundTextContent>{Data.walletid.slice(0,6)}...{Data.walletid.slice(39)}</FundTextContent>
                </Funds>
                <Funds>
                    <FundTextTitle>Allergies</FundTextTitle>
                    <FundTextContent>{Data.allergies}</FundTextContent>
                </Funds>
            </FundsData>
        </LeftContainer>
        
    </DetailWrapper>
  );

  }
export async function getStaticPaths(){
  
    const provider=new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
    );

    const contract =new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        MediLedger.abi,
        provider
    );

    const getAllPatients = contract.filters.allPatient();
    const AllPatients = await contract.queryFilter(getAllPatients);
    

    return{
        paths: AllPatients.map((e)=> ({
            params:{
                address:e.args.contractAddress.toString(),
            }
        })),
        fallback:"blocking"
    }
}

export async function getStaticProps(context){
    const provider=new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
    );

    const patient =new ethers.Contract(
        context.params.address,
        Patient.abi,
        provider
    );

    const pid = await patient.pid();
    const name=await patient.name();
     const bloodgrp=await patient.bloodgrp();
     const height=await patient.height();
     const weight=await patient.weight();
    const walletid = await patient.walletid();
    const allergies = await patient.allergies();
     const gender=await patient.gender();
     const pendingRefund=await patient.pendingRefund();


     const Data={
        address:context.params.address,
        pid:parseInt(pid),
        name,
        pendingRefund:ethers.utils.formatEther(pendingRefund),
         gender,
         allergies,
        bloodgrp,
         height:parseInt(height),
         weight:parseInt(weight),
        walletid
    }



    return {
        props:{
            Data
        },
    revalidate: 10
    }

}





const FundTextContent = styled.p`
  margin: 2px;
  padding: 0;
  font-family: "Poppins";
  font-size: normal;
`;

const Update=styled.div`
width: 100%;
`
const DetailWrapper = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 98%;
`;
const LeftContainer = styled.div`
  width: 45%;
  padding-top: 5rem;
  
`;
const RightContainer = styled.div`
  width: 50%;
  padding-top: 5rem;
`;
const BottomContainer=styled.div`
  width: 50%;
  padding-top: 10rem;
  width:48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`

const Title = styled.h1`
  padding-bottom: 3rem;
  margin: 0;
  text-align: center;
  font-family: "Comfortaa";
  font-size: x-large;
  color: ${(props) => props.theme.color};
`;
const DonateSection = styled.div`
  display: flex;
  width: 100%;
  justify-content:space-between;
  align-items: center;
  margin-top: 10px;
`;
const Textarea = styled.textarea`
  padding: 8px 15px;
  background-color: ${(props) => props.theme.detail};
  color: ${(props) => props.theme.color};
  //border: none;
  border-radius: 8px;
  //outline: none;
  ::placeholder{
    color:${(props) => props.theme.colorDiv} ;
  }
  font-size: large;
`;
const Donate = styled.button`
  display: flex;
  justify-content: center;
  width: 45%;
  padding: 15px;
  color: white;
  background-color: ${(props) => props.theme.btnDetail};
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: large;
`;

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
    font-family: 'Comfortaa';
    margin:7px;
    border-radius: 6px;
    padding: 2px 5px 5px;
    cursor: pointer;
    text-transform: uppercase;
     font-weight: bold ;
     font-size: medium;
    

`

const Text=styled.p`
  margin-top: 0;
`
const TopLeftWrap=styled.div`
padding-top: 10rem;
  width:48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Caption=styled.h1`
   font-family: 'Oswald';
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
   font-size: 4rem;
   font-weight: 300;
   font-style: bold;
   height: max-content;
   width: max-content;
   letter-spacing: 0.5rem;
   color:${(props) => props.theme.btnColor} ;
   justify-content: center;
   align-items: center;
   text-transform: uppercase;
`
const Paragraph=styled.p`
   margin:0;
   font-size: 1rem;
   padding: 0;
   font-weight: 500;
   text-align: center;
   font-family: 'Poppins';
   font-style: bold;
`
const ButtonWrap = styled.button`
margin-bottom: 10px;
  padding: 8px;
  text-align: center;
  width: max-content;
  background-color: ${(props) => props.theme.btnDetail};
   color:${(props) => props.theme.colorDiv} ;
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  &:hover{
    background-color: ${(props) => props.theme.colorSec} ;
    transform: translateY(-2px);
    transition: transform 0.5s;
  }
  font-size: 14px;
  font-family: 'Comfortaa';
`


const FundsData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const Funds = styled.div`
  width: 45%;
  background-color: ${(props) => props.theme.detail};
  padding: 8px;
  text-align: center;
`;
const FundTextTitle = styled.p`
  margin: 2px;
  padding: 0;
  font-family: "Poppins";
  font-size: normal;
  color:${(props) => props.theme.colorDiv} ;
`;
