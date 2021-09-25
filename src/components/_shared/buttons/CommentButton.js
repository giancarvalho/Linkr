import { AiOutlineComment } from "react-icons/ai";

import styled from "styled-components";

export default function CommentButton({ customStyle, ...otherprops }) {
    return (
        <Button customStyle={customStyle} {...otherprops}>
            <AiOutlineComment
                color={"inherit"}
                title={"Repost this in your feed"}
                cursor={"pointer"}
            />
        </Button>
    );
}

const Button = styled.button`
    font-size: ${({ customStyle }) =>
        customStyle && customStyle.fontSize ? customStyle.fontSize : "inherit"};
    color: ${({ customStyle }) =>
        customStyle && customStyle.color ? customStyle.color : "inherit"};
    margin: ${({ customStyle }) =>
        customStyle && customStyle.margin ? customStyle.margin : "0"};
    padding: 0;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    border: none;
    cursor: pointer;
`;