import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import SEE_FEED_QUERY from "../apollo/gql/query/seeFeed";
import { seeFeed } from "../apollo/__type__/seeFeed";
import Feed from "../components/Feed";

const HomeContainer = styled.main``;

const Home = () => {
  const { data } = useQuery<seeFeed>(SEE_FEED_QUERY);
  return (
    <HomeContainer>
      {data && data.seeFeed.map((data) => <Feed key={data.id} data={data} />)}
    </HomeContainer>
  );
};

export default Home;
