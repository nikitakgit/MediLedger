import styled from 'styled-components';
import Left from './components/HLeft';
import Nav from './components/HNav';
import Right from './components/HRight';

const Header = () => {
  return (
    <HeaderWrap>
      <Left ></Left>
      <Nav ></Nav>
      <Right></Right>
    </HeaderWrap>
  )
}

const HeaderWrap = styled.div`
  margin-top: 40px;
  margin-bottom: 0;
  margin-right: 50px;
  margin-left: 100px;
  overflow: hidden;
  padding: auto;
  width: 90%;
  height: 80x;
  display: flex;
  background-color: ${(props)=>props.theme.Color};
  backdrop-filter: blur(100px); 
  box-shadow: 10px 20px 3px -2px rgb(112, 183, 220);
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  &:hover{
    background-color: ${(props) => props.theme.bgSubDiv} ;
    color:${(props) => props.theme.color} ;
    transform: translateY(-2px);
    transition: transform 1s;
  } 
`

export default Header