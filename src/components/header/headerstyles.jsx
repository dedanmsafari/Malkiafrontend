import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content:flex ;
  text-decoration:none;
  background-color:thistle;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 80px;
  padding:15px;
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content:flex;
  text-decoration:none;
`;

export const OptionLink = styled(Link)`
  padding:20px 50px;
  cursor: pointer;
  text-decoration:none;
  &:focus,&:hover,&:visited,&:link,&:active{text-decoration:none;}
  justify-content:flex-end
`;
export const TitleContainer = styled.div`
align-items: center;
padding:10px 10px 5px 20px;
color:grey;
`