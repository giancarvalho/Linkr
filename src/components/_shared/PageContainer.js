import styled from "styled-components";

const Container = styled.div`
    padding-top: 72px;
    width: 1000px;
    min-height: 100vh;

    @media (max-width: 700px){
        display: flex;
        flex-direction: column;
        width: 100vw;
    }
`
export { Container };