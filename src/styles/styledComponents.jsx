import styled from 'styled-components'

export const Input = styled.input`
    margin-bottom: 5%;
`

export const Label = styled.label`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 1%;
`

export const Button = styled.input`
    background-color: #0275D8;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    color: #fff;
    padding: 1.5%;
    font-size: 20px;
    margin-bottom: 5%;
    &:hover{
        opacity: 0.8;
        transition: 0.7s;
    }
`

export const LongImage = styled.img`
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 0;
    padding: 0;
    width: 100% !important;
`

export const Logo = styled.img`
    width: 40%;
    display: block;
    margin-left: auto;
    margin-right: auto;
`

export const Sidebar_bg = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 0 ;
    padding: 0 ;
    width: 100% !important;
    background-color: #212529
`
