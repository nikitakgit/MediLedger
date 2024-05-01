import styled from 'styled-components';
import { FormState } from '../AddPatientForm'
import { useContext ,useState} from 'react';

const FormLeft = () => {
  const Handler = useContext(FormState);

  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [idError, setIdError] = useState('');
  const [contactError, setContactError] = useState('');  
  const [ageError, setAgeError] = useState('');
  const [walletError, setWalletError] = useState('');

    const handleEmailChange=(e)=>{
     if (!validateEmail(e.target.value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleIdChange=(e)=>{
     if (!validateId(e.target.value)) {
      setIdError('Invalid Id');
    } else {
      setIdError('');
    }
  };

  const handleContactChange=(e)=>{
     if (!validateContact(e.target.value)) {
      setContactError('Invalid Contact');
    } else {
      setContactError('');
    }
  };

  const handleAgeChange=(e)=>{
     if (!validateAge(e.target.value)) {
      setAgeError('Invalid Age');
    } else {
      setAgeError('');
    }
  };

  const handleNameChange=(e)=>{
     if (!validateUserName(e.target.value)) {
      setNameError('Invalid User Name');
    } else {
      setNameError('');
    }
  };

  const handleWalletChange=(e)=>{
     if (!validateWallet(e.target.value)) {
      setWalletError('Invalid Wallet Id');
    } else {
      setWalletError('');
    }
  };

  const validateEmail = (email) => {
    // Use a regular expression to validate the email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
   const validateId=(id)=>{
    const idRegex=/^\d+$/i;
    return idRegex.test(id);
  }
  const validateContact=(contact)=>{
    const contactRegex=/^[1-9]\d{9}$/i;
    return contactRegex.test(contact);
  }
  const validateAge=(age)=>{
    const ageRegex=/^(?:0?[1-9]|[1-9][0-9]|1[01][0-9]|120)$/i;
    return ageRegex.test(age);
  }
  const validateUserName=(username)=>{
    const usernameRegex=/^[a-zA-Z0-9]+$/i;
    return usernameRegex.test(username);
  }

  const validateWallet=(wallet)=>{
    const walletRegex=/^[a-zA-Z0-9]{42}$/i;
    return walletRegex.test(wallet);
  }

  const changeId = (e) => {
    Handler.FormHandler(e);
    handleIdChange(e);
  }

  const changeWallet = (e)=> {
    Handler.FormHandler(e);
    handleWalletChange(e);
  }

  const changeName = (e) => {
    Handler.FormHandler(e);
    handleNameChange(e);
  }

  

  return (
    <FormLeftWrap>
      
      <FormInput>
        <label>PATIENT EMAIL ADDRESS</label>
        <Input  onChange={handleEmailChange}   placeholder='Enter Patient Mail Id Here' name='patientMail' style={{ borderColor: emailError ? 'red' : 'green' }}>
        </Input>
        {emailError && <div style={{ color: 'red' ,textAlign:'left'}}>{emailError}</div>}
      </FormInput>

      <FormInput>
        <label>PATIENT ID</label>
        <Input onChange={changeId} value={Handler.form.pid}  placeholder='Enter Unique Patient Id Here' name='pid' >
        </Input>
        {idError && <div style={{ color: 'red' ,textAlign:'left'}}>{idError}</div>}
      </FormInput>

      <FormInput>
        <label>PATIENT USERNAME</label>
        <Input onChange={changeName} onInput={changeName} value={Handler.form.name} placeholder='Enter Patient Name Here' name='name'>
        </Input>
        {nameError && <div style={{ color: 'red' ,textAlign:'left'}}>{nameError}</div>}
      </FormInput>

      <FormInput>
        <label>PATIENT AGE</label>
        <Input onChange={handleAgeChange}  placeholder='Enter age here' name='age'>
        </Input>
        {ageError && <div style={{ color: 'red' ,textAlign:'left'}}>{ageError}</div>}
      </FormInput>

      <FormInput>
        <label>PATIENT CONTACT INFORMATION</label>
        <Input onChange={handleContactChange} placeholder='Enter Contact info here' name='patientContact'>
        </Input>
        {contactError && <div style={{ color: 'red' ,textAlign:'left'}}>{contactError}</div>}
      </FormInput>

      <FormInput>
        <label>PATIENT GENDER </label>
            <Select onChange={Handler.FormHandler} value={Handler.form.gender} name="gender">
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
          </Select>
      </FormInput>

      <FormInput>
        <label>Patient METAMASK WALLET ID</label>
        <Input onChange={changeWallet} value={Handler.form.walletid} placeholder='Enter Wallet id here' name='walletid'>
        </Input>
        {walletError && <div style={{ color: 'red' ,textAlign:'left'}}>{walletError}</div>}
      </FormInput>

    </FormLeftWrap>
  )
}

const FormLeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin: 25px 50px 75px 100px;
`

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
  font-size:large;
  width:100% ;
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
  width:100% ;
`


export default FormLeft;