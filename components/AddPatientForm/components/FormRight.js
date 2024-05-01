import styled from 'styled-components';
 import { FormState } from '../AddPatientForm';
 import { useState, useContext } from 'react';

// const projectId = process.env.NEXT_PUBLIC_IPFS_ID
// const projectSecret = process.env.NEXT_PUBLIC_IPFS_KEY
// const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64')


const FormRight = () => {
  const Handler = useContext(FormState);

  const [htError, setHtError] = useState('');
  const [wtError, setWtError] = useState('');
  const [contactError, setContactError] = useState('');  
  const [bgError, setBgError] = useState('');

  const handleContactChange=(e)=>{
     if (!validateContact(e.target.value)) {
      setContactError('Invalid Contact');
    } else {
      setContactError('');
    }
  };

  const handleHtChange=(e)=>{
     if (!validateHt(e.target.value)) {
      setHtError('Invalid Height');
    } else {
      setHtError('');
    }
  };

  const handleWtChange=(e)=>{
     if (!validateWt(e.target.value)) {
      setWtError('Invalid Weight');
    } else {
      setWtError('');
    }
  };

  const handleBgChange=(e)=>{
     if (!validateBg(e.target.value)) {
      setBgError('Invalid Blood Group');
    } else {
      setBgError('');
    }
  };

  const validateHt=(ht)=>{
    const idRegex=/^\d+$/i;
    return idRegex.test(ht);
  }
  const validateWt=(wt)=>{
    const idRegex=/^\d+$/i;
    return idRegex.test(wt);
  }
  const validateBg=(bg)=>{
    const idRegex=/^(A|B|AB|O)[+-]$/i;
    return idRegex.test(bg);
  }
  const validateContact=(contact)=>{
    const contactRegex=/^[1-9]\d{9}$/i;
    return contactRegex.test(contact);
  }

  const changeHt = (e) => {
    Handler.FormHandler(e);
    handleHtChange(e);
  }

  const changeWt = (e)=> {
    Handler.FormHandler(e);
    handleWtChange(e);
  }

  const changeBg = (e) => {
    Handler.FormHandler(e);
    handleBgChange(e);
  }


  return (
    <FormRightWrap>
      
      <FormInput>
        <FormRow>
          <RowFirst>
            <label>ANY ALLERGIES</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.allergies} name="allergies" placeholder='Enter allergy information if any'></Input>
          </RowFirst>
          <RowSecond>
            <label>PATIENT HEIGHT (cm)</label>
            <Input onChange={changeHt} value={Handler.form.height} name="height"  ></Input>
            {htError && <div style={{ color: 'red' ,textAlign:'left'}}>{htError}</div>}
          </RowSecond>
          <RowSecond>
            <label>PATIENT WEIGHT (kg)</label>
            <Input onChange={changeWt} value={Handler.form.weight}  name="weight"  ></Input>
            {wtError && <div style={{ color: 'red' ,textAlign:'left'}}>{wtError}</div>}
          </RowSecond>
          <RowSecond>
            <label>PATIENT BLOOD GROUP</label>
            <Input onChange={changeBg} value={Handler.form.bloodgrp} name="bloodgrp"></Input>
            {bgError && <div style={{ color: 'red' ,textAlign:'left'}}>{bgError}</div>}
          </RowSecond>

          <RowFirst>
            <label>EMERGENCY CONTACT INFORMATION</label>
            <Input onChange={handleContactChange}  name="emergencyContact" ></Input>
            {contactError && <div style={{ color: 'red' ,textAlign:'left'}}>{contactError}</div>}
          </RowFirst>
          <RowSecond>
            <label>PATIENT MARITAL STATUS</label>
            <Select name="maritalStatus">
              <option>Married</option>
              <option>Unmarried</option>
              <option>Others</option>
            </Select>
          </RowSecond>
        </FormRow>
      </FormInput>
      
      
      <Button onClick={ Handler.registerPatient}>
        Register Patient
      </Button>
    </FormRightWrap>
  )
}

const FormRightWrap = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
  width: 100%;
  margin: 29px 100px 75px 100px;
`

const FormInput = styled.div`
  display:flex ;
  flex-direction:column;
  font-family:'poppins';
`

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  width:100% ;
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
  font-size:large;
  width:100% ;
`

const RowFirst = styled.div`
  display:flex ;
  flex-direction:column ;
  width:100% ;
  padding-top: 9px;
`

const RowSecond= styled.div`
  display:flex ;
  flex-direction:column ;
  width:100% ;
  padding-top: 9px;
`

const Select = styled.select`
  padding:15px;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  ::placeholder{
    font-size: smaller;
    color: lightslategrey;
  }
  border:1px solid ${(props) => props.theme.bgDiv};
  outline:none;
  font-size:large;
  width:107% ;
`


const Button = styled.button`
    text-align: center;
    width: 108%;
    background-color: ${(props) => props.theme.btnColor};
    border: none;
    cursor: pointer;
    font-family: 'Comfortaa';
    text-transform: uppercase;
    border-radius: 5px;
    height: 4rem;
    &:hover{
      background-color: ${(props) => props.theme.colorSec} ;
      color:${(props) => props.theme.color} ;
      transform: translateY(-2px);
      transition: transform 0.5s;
    }
    color:${(props) => props.theme.colorDiv} ;
    font-size: 14px;
    font-weight: bold;
    margin-top: 40px;
    margin-bottom: -5px;
  `

export default FormRight