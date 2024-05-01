import React from 'react' ;
import styled from 'styled-components';
import {useRouter} from 'next/router';
import Link from 'next/link';


//  const HLeft = () => {
//   return (
//     <HLeftWrap>
//     <Link style={{textDecoration:'none', color:'black'}} href={'/addDoctor'}><HNavLinks active={Router.pathname=="/addDoctor"?"true":"false"}>
//         MediLedger
//           </HNavLinks> </Link>
//     </HLeftWrap>
//   )
// }

const HLeft = () => {
  const Router=useRouter();
  return (
      <HLeftWrap>
      <Link style={{textDecoration:'none', color:'black'}} href={'/'}><HNavLinks active={Router.pathname=="/"?"true":"false"}>
        MediLedger
          </HNavLinks> </Link>
    </HLeftWrap>
  )
}

 const HLeftWrap=styled.h1`
   font-weight: bold;
   text-transform: uppercase;
   font-size: 30px;
   margin-left: 10px ;
   font-family: 'Comfortaa';
 `

 const HNavLinks=styled.div`
 .link{
   color:'black';
 }
 display: flex;
 align-items: center;
 justify-content: space-between;
 color: 'black';    
 text-decoration: none;
 &:hover{
 background-color: ${(props) => props.theme.ColorSec} ;
 color:${(props) => props.theme.btnColor} ;
 transform: translateY(-3px);
 transition: transform 0.5s;
}
 height: 100%;
 width: max-width;
 font-family: 'Comfortaa';
 margin:7px;
 border-radius: 6px;
 padding: 2px 5px 5px;
 cursor: pointer;
 text-transform: uppercase;
  font-weight: bold ;
  font-size: 80%;
`

export default HLeft;