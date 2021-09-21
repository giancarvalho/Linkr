import { useState } from "react";
import { CustomInput } from "../_shared/Inputs";
import { useHistory } from "react-router-dom";
import routes from "../../routes/routes";
import styled from "styled-components";

export default function SearchHashtag() {
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();

  function handleKeys(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      history.push(routes.trending.replace(":HASHTAG", searchValue));
      setSearchValue("");
    }
  }

  return (
    <Container>
      #
      <Input
        type="search"
        customStyle={{ loading: false, width: "85%" }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => handleKeys(e)}
        placeholder="type a hashtag"
      />
    </Container>
  );
}

const Container = styled.div`
  width: 270px;
  height: 35px;
  background-color: #252525;
  border-radius: 5px;
  color: #fff;
  margin: 5px auto 15px;
  padding-left: 10px;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const Input = styled(CustomInput)`
  font-family: Lato, sans-serif;
  font-size: 16px;
  width: 250px;
  background-color: transparent;
  outline: none;
  border: none;

  :focus {
    color: #fff;
  }

  ::placeholder {
    font-style: italic;
  }
`;
