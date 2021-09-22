import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import { CustomInput } from "../_shared/Inputs";
import { DebounceInput } from "react-debounce-input";
import { getSearchedUsers } from "../../API/requests";
import UserContext from "../../contexts/UserContext";
import { useContext, useState } from "react";
import UserAvatar from "../_shared/UserAvatar";
import { Link } from "react-router-dom";
import routes from "../../routes/routes";
function UserFound({ user, clearSearch }) {
  return (
    <Link to={routes.user.replace(":id", user.id)} onClick={clearSearch}>
      <UserContainer>
        <UserAvatar
          src={user.avatar}
          customStyle={{ height: "40px", width: "40px" }}
        />
        <h2>{user.username}</h2>
        {user.isFollowingLoggedUser && <p>• following</p>}
      </UserContainer>
    </Link>
  );
}

export default function Search({ className }) {
  const { loggedUser } = useContext(UserContext);
  const [usersList, setUsersList] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  function searchUsers(e) {
    if (e.key === "Escape") return;

    setSearchValue(e.target.value);

    if (e.target.value.length > 2) {
      getSearchedUsers({
        username: e.target.value,
        token: loggedUser.token,
      })
        .then((response) => {
          setUsersList(response.data.users);
          setShowResults(true);
        })
        .catch((error) => console.log(error));

      return;
    }

    setShowResults(false);
  }

  function clearSearch() {
    setShowResults(false);
    setSearchValue("");
  }

  return (
    <Container className={className}>
      <SearchContainer>
        <DebounceInput
          type="search"
          element={SearchInput}
          customStyle={{
            loading: false,
          }}
          placeholder="Search for people and friends"
          minLength={2}
          debounceTimeout={300}
          value={searchValue}
          onChange={(e) => searchUsers(e)}
        />

        <AiOutlineSearch color="#C6C6C6" title={"Search"} fontSize="28px" />
      </SearchContainer>
      <ResultsContainer showResults={showResults}>
        {usersList.length > 0
          ? usersList.map((user, index) => (
              <UserFound user={user} key={index} clearSearch={clearSearch} />
            ))
          : "Nenhum usuario encontrado"}
      </ResultsContainer>
    </Container>
  );
}

const SearchInput = styled(CustomInput)`
  font-family: "Lato", sans-serif;
  background-color: transparent;
  border: none;
  font-size: 17px;
  width: 90%;
`;

const Container = styled.div`
  width: 43%;
  height: 45px;
  background-color: ${({ showResults }) =>
    showResults ? "#e7e7e7" : "transparent"};
  border-radius: 8px 8px 0 0;
  z-index: 1;

  &.timeline {
    display: none;
    width: 100%;
  }
  @media (max-width: 611px) {
    &.header {
      display: none;
    }

    &.timeline {
      display: initial;
      margin-top: 10px;
    }
  }
`;

const ResultsContainer = styled.div`
  display: ${({ showResults }) => (showResults ? "inherit" : "none")};
  background-color: #e7e7e7;
  width: 100%;
  bottom: 5px;
  border-radius: 0 0 8px 8px;
  overflow-y: scroll;
  max-height: 200px;
  z-index: 3;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  align-items: center;
  border-radius: 8px;
  padding: 0 5px;

  input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 5px;
  font-family: "Lato", sans-serif;
  color: #515151;

  h2 {
    margin: 0 3px;
  }

  p {
    color: #c5c5c5;
    font-style: italic;
    font-size: 13px;
  }
`;
