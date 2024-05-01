import styled from "styled-components";
import {ethers} from 'ethers';
import MediLedger from '../../artifacts/contracts/MediLedger.sol/MediLedger.json'
import Patient from '../../artifacts/contracts/MediLedger.sol/Patient.json'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from "react-toastify";
import {TailSpin} from 'react-loader-spinner'


export default function Accounts({ Data , MyBills , MyRefunds }) {
   
   const Router = useRouter();     
  const [change, setChange] = useState(false);
  const [filterBills, setFilterBills] = useState(MyBills);
  const [filterRefunds, setFilterRefunds] = useState(MyRefunds);
  
   const [uploadLoading, setUploadLoading] = useState(false);
   const [uploaded, setUploaded] = useState(false);
  
   useEffect(() => {
    const Request = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
    
      const patient = new ethers.Contract(
        Data.address,
        Patient.abi,
        signer
      );

      try {
        console.log(MyBills);
        console.log(MyRefunds);
        
      } catch (e)
      {
        console.log(e);
      }


    }
    Request();
  }, [change])
    
   
   const reimburse = async () => {
     try {
        setUploadLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
         console.log("0++++++++++++")
      const patient = new ethers.Contract(
          Data.address,
          Patient.abi,
          signer
        );
        console.log("1++++++++++++")
        console.log(Data.pendingRefund+ "+++++++++" + typeof(Data.pendingRefund));
      const passed=await patient.passBill({value:ethers.utils.parseEther(Data.pendingRefund)});
          console.log("2++++++++++++")
        await passed.wait();
        console.log("3++++++++++++")

        
          setUploadLoading(false);
        setUploaded(true);
        
        toast.success("Reimburse,Please refresh !!!")
      
      setChange(true);
      }catch(e){
        console.log(e);
      }
   }

  return (
    <DetailWrapper>
      <TopLeftWrap>
        <Paragraph>Here we have our</Paragraph>
        <Heading>Account Section Portal</Heading>
        <Paragraph>Where Account Section Clear Pending Reimbursement Instantly</Paragraph> 
        <Paragraph>Maximizing Efficiency , Minimizing Paperwork</Paragraph>
        <Paragraph>Pending to Paid in Just One Click , Zero Hassle</Paragraph>
        <Caption>
            Streamlined Finance , Instant Refunds
        </Caption>
        <Paragraph> Where Blockchain Meets Billing Management </Paragraph>
        <ButtonWrap><TNavLinks>Transparent and Secure Records,Seamless Reimbursements</TNavLinks></ButtonWrap>
        <Paragraph> Financial Management Made Easy </Paragraph>
      </TopLeftWrap>    


        <RightContainer>
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
                <FundTextTitle>Pateint Wallet Id</FundTextTitle>
                  <FundTextContent>{Data.walletid.slice(0,6)}...{Data.walletid.slice(39)}</FundTextContent> 
              </Funds>  
        </FundsData> 
        <FundsData>
            <Funds>
                <FundTextTitle>Pending Reimbursement</FundTextTitle>
                <FundTextContent>{Data.pendingRefund} ETH</FundTextContent> 
             </Funds>  

            {uploadLoading == true ? <Buttons><TailSpin color='#fff' height={20} /></Buttons> :uploaded == false ? 
                <Funds><Button onClick={reimburse}>
                   Reimburse
                </Button></Funds>
                : <Funds><Button style={{cursor: "no-drop"}}>Transaction Completed Sucessfully</Button></Funds>
            }
        </FundsData>
         
      </RightContainer>
      <Heading>All Bills</Heading>
      <CardsWrapper>
            {filterBills.map((e) => {
              return (
                
              <Card key={e.timestamp}>
                  <CardData><Bold>Doctor : </Bold> {e.doctor.slice(0,6)}...{e.doctor.slice(39)}</CardData>
                  <CardData><Bold>Bill Amount : </Bold>{e.amount} ETH</CardData>
                  <CardData><Bold>Date and Time : </Bold>{new Date(e.timestamp * 1000).toLocaleString()}</CardData>
                  <CardData><TNavLinks><Link style={{textDecoration:'none'}} href={'https://gateway.lighthouse.storage/ipfs/' + e.hash}><Button>Report and Bill</Button></Link></TNavLinks></CardData>
              </Card>
              )
            })
        }
       </CardsWrapper> 
       <Heading>My Refunds</Heading>
       <CardsWrapper>
            {filterRefunds.map((e) => {
              return (
                <Card key={e.timestamp}>
                  <CardData><Bold>Amount : </Bold>{e.amount} ETH</CardData>
                  <CardData><Bold>Date and Time : </Bold>{new Date(e.timestamp * 1000).toLocaleString()}</CardData>
                </Card>
              )
            })
            }
        </CardsWrapper>

        
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
  const gender = await patient.gender();
  const pendingRefund = await patient.pendingRefund();


        const AllBills = patient.filters.allBills();
        const MyAllBills = await patient.queryFilter(AllBills);

        const MyBills = MyAllBills.map((e) => {
        return {
          doctor: e.args.Doctor,
          amount:parseInt(e.args.amount),
          timestamp: parseInt(e.args.timestamp),
          hash: e.args.hash
        }
        });

        const AllRefunds = patient.filters.refunds();
        const MyAllRefunds = await patient.queryFilter(AllRefunds);

        const MyRefunds=MyAllRefunds.map((e) => {
        return {
          amount: parseInt(e.args.amount),
          timestamp: parseInt(e.args.timestamp)
        }
        });
  

     const Data={
        address:context.params.address,
        pid:parseInt(pid),
        name,
        pendingRefund:pendingRefund.toString(),
         gender,
         allergies,
        bloodgrp,
         height:parseInt(height),
         weight:parseInt(weight),
       walletid
    }



    return {
        props:{
          Data,
          MyBills,
          MyRefunds
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
const DetailWrapper = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 98%;
`;
const RightContainer = styled.div`
  width: 50%;
  padding-top: 5rem;
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
const TopLeftWrap=styled.div`
padding-top: 10rem;
  width:48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const CardsWrapper = styled.div`
    
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 80%;
    margin-top: 25px;
    border: none;
  `
  const Card = styled.div`
    width: 25%;
    margin-top: 20px;
    /* border-radius: 2%; */
    border: solid black;
    &:hover{
      transform: translateY(-10px);
      transition: transform 0.5s;
    }
    
    &:not(:hover){
      transition: transform 0.5s;
    }
    background-color: ${(props) => props.theme.detail};
  `

    const CardData = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 2px 0px;
    padding: 5px;
    cursor: pointer;
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

const Bold=styled.p`
   margin:0;
   font-size: 1rem;
   padding: 0;
   font-weight: 500;
   text-align: center;
   font-family: 'Poppins';
   font-style: bold;
   font-weight:bolder;
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

const Button = styled.button`
    
    text-align: center;
    width: 100%;
    background-color: ${(props) => props.theme.btnColor};
    border: none;
    cursor: pointer;
    font-family: 'Comfortaa';
    text-transform: uppercase;
    border-radius: 5px;
    height: 3.5rem;
    &:hover{
      background-color: ${(props) => props.theme.colorSec} ;
      color:${(props) => props.theme.color} ;
      transform: translateY(-2px);
      transition: transform 0.5s;
    }
    color:${(props) => props.theme.colorDiv} ;
    font-size: 14px;
    font-weight: bold;
  `
  const Buttons = styled.button`
    
    text-align: center;
    width: 47%;
    background-color: ${(props) => props.theme.btnColor};
    border: none;
    cursor: pointer;
    font-family: 'Comfortaa';
    text-transform: uppercase;
    border-radius: 5px;
    height: 4.5rem;
    &:hover{
      background-color: ${(props) => props.theme.colorSec} ;
      color:${(props) => props.theme.color} ;
      transform: translateY(-2px);
      transition: transform 0.5s;
    }
    color:${(props) => props.theme.colorDiv} ;
    font-size: 14px;
    font-weight: bold;
  `