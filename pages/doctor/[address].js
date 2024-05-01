
import styled from "styled-components";
import {ethers} from 'ethers';
import MediLedger from '../../artifacts/contracts/MediLedger.sol/MediLedger.json'
import Patient from '../../artifacts/contracts/MediLedger.sol/Patient.json'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from 'next/link'
import { useRouter } from 'next/router';
import {TailSpin} from 'react-loader-spinner'
import {create as IPFSHTTPClient} from 'ipfs-http-client';
import lighthouse from '@lighthouse-web3/sdk'

 export default function Detail({Data}) {
     const Router = useRouter();     

   const [uploadLoading, setUploadLoading] = useState(false);
   const [uploaded, setUploaded] = useState(false);
   const [file, setFile] = useState(null);
   const [amt, setAmt] = useState("");

   const [hash, setHash] = useState(null);

   useEffect(() => {
     console.log("hash changed:", hash);
      addBill();
    }, [hash]);

   const FileHandler = (e) => {
       setFile(e.target.files);
   }
   
   const AmtHandler = (e) => {
        setAmt(e.target.value);
    }
    
    const uploadFiles = async () => {
      console.log("uploading+++++++++++++", file)
      setUploadLoading(true);
      try {
        const output = await lighthouse.upload(
          file,
          "8b7405be.5af63b0efc684dc2ad3b05a0f5443cbd",
          false,
          null,
        );
        console.log("File Status:", output);
  
        console.log(
          "hihih Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
        );
        const h =""+output.data.Hash+"";
        console.log("h= "+h);
        setHash(h);
      } catch (error) {
        console.log(error);
        toast.warn("Error Uploading File");
      }
    };
   
   const addBill = async () => {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();
    
     console.log("1-------")
     const patient = new ethers.Contract(
            Data.address,
            Patient.abi,
            signer
     );
     try
     {
          console.log("bill amount = "+amt);
         const billamt = parseInt(amt);
          console.log("current file hash ------> "+hash);
          const addData = await patient.addBill(
            hash,
            billamt
          );
          await addData.wait();
          setUploadLoading(false);
          setUploaded(true);
       
          toast.success("Document Uploaded Sucessfully")
     } catch (e)
     {
       console.log(e);
     }
     
   }



  return (
    <DetailWrapper>
        
        <TopLeftWrap>
        <Paragraph>Documents will be uploaded here by</Paragraph>
        <Heading>OUR BEST DOCTORS</Heading>
        <Paragraph>Empowering Physicians , Enhancing Patient Outcomes</Paragraph> 
        <Paragraph>Doctors At The Helm of HealthCare Transformation</Paragraph>
        
        <Caption>
            Elevating Healthcare Standards
        </Caption>
        <Paragraph>Secure Prescriptions , Seamless Billing , Simplified Workflow</Paragraph>
        <ButtonWrap>In Just Few Clicks</ButtonWrap>
        <Paragraph>Manage Everything through a simple form</Paragraph>
       
        
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
            
        <DonateSection>
          
          <Funds>
            <FormInput>
              <label>Enter Amount</label>
              <Input onChange={AmtHandler} placeholder="Enter bill amount"/>
            </FormInput>
          </Funds>
          
          <Funds>
            <FormInput>
              <label>Select Documents</label>
              <Input onChange={FileHandler} type={'file'} accept='*/*'/>
            </FormInput>
          </Funds>
          
        </DonateSection>
        <DonateSection>
            {uploadLoading == true ? <Button><TailSpin color='#fff' height={20} /></Button> :uploaded == false ? 
                <Funds><Button onClick={uploadFiles}>
                    Upload Files to IPFS
                </Button></Funds>
                : <Funds><Button style={{cursor: "no-drop"}}>Files uploaded Sucessfully</Button></Funds>
          }
         </DonateSection>
        </RightContainer>
        
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

const FormInput = styled.div`
  display:flex ;
  flex-direction:column;
  font-family:'poppins';
  margin-top:10px ;
`
const Input = styled.input`
  padding:15px;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  ::placeholder{
    font-size: smaller;
    color: lightslategrey;
  }
  border:1px solid ${(props) => props.theme.bgDiv};
  outline:none;
  font-size:medium;
  width:90% ;
`

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
    font-weight: bold;
 `
