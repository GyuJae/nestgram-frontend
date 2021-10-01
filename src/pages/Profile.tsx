import { useQuery } from "@apollo/client";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useParams } from "react-router";
import styled from "styled-components";
import SEE_PROFILE_QUERY from "../apollo/gql/query/seeProfile";
import { seeProfile } from "../apollo/__type__/seeProfile";
import ProfilePost from "../components/ProfilePost";

const ProfileContainer = styled.main`
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
`;

const ProfileHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.color.lineGray};
  padding-bottom: 40px;
`;

const ProfileAvatarContainer = styled.div`
  width: 170px;
  height: 170px;
  margin-left: 65px;
`;

const ProfileAvatar = styled.img`
  border-radius: 50%;
  max-width: 100%;
  max-height: 100%;
`;

const ProfileInformationContainer = styled.div`
  margin-left: 90px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: 300;
`;

const FollowBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  background-color: ${(props) => props.theme.color.skyblue};
  font-size: 14px;
  font-weight: 600;
  padding: 5px 9px 5px 9px;
  color: ${(props) => props.theme.color.white};
  border-radius: 5px;
  margin-top: 10px;
`;

const UnFollowBtn = styled(FollowBtn)`
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.black};
  color: ${(props) => props.theme.color.black};
`;

const CountContainer = styled.div`
  display: flex;
  font-size: 16px;
  margin-top: 15px;
`;

const Count = styled.div`
  &:not(:last-child) {
    margin-right: 40px;
  }
`;

const CountMark = styled.span`
  font-weight: 600;
`;

const BioContainer = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const BioFullName = styled.span`
  font-weight: 600;
`;

const Bio = styled.span`
  margin-top: 5px;
`;

const ProfilePostContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const { data } = useQuery<seeProfile>(SEE_PROFILE_QUERY, {
    variables: {
      input: {
        username,
      },
    },
  });
  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileAvatarContainer>
          {data?.seeProfile.user?.avatar ? (
            <ProfileAvatar src={data?.seeProfile.user?.avatar} />
          ) : (
            <AiOutlineUser />
          )}
        </ProfileAvatarContainer>
        <ProfileInformationContainer>
          <UsernameContainer>
            <Username>{data?.seeProfile.user?.username}</Username>
            {!data?.seeProfile.user?.isMe &&
              (data?.seeProfile.user?.isFollowing ? (
                <UnFollowBtn>Following</UnFollowBtn>
              ) : (
                <FollowBtn>Following</FollowBtn>
              ))}
          </UsernameContainer>
          <CountContainer>
            <Count>
              게시물{" "}
              <CountMark>
                {data?.seeProfile.user?.posts?.length
                  ? data?.seeProfile.user?.posts?.length
                  : 0}
              </CountMark>
            </Count>
            <Count>
              팔로워{" "}
              <CountMark>{data?.seeProfile.user?.totalFollower}</CountMark>
            </Count>
            <Count>
              팔로우{" "}
              <CountMark>{data?.seeProfile.user?.totalFollowing}</CountMark>
            </Count>
          </CountContainer>
          <BioContainer>
            <BioFullName>
              {data?.seeProfile.user && data?.seeProfile.user.firstName}{" "}
              {data?.seeProfile.user && data?.seeProfile.user.lastName}
            </BioFullName>
            <Bio>{data?.seeProfile.user?.bio}</Bio>
          </BioContainer>
        </ProfileInformationContainer>
      </ProfileHeader>
      <ProfilePostContainer>
        {data &&
          data?.seeProfile &&
          data.seeProfile.user &&
          data.seeProfile.user.posts &&
          data.seeProfile.user.posts?.map((post) => (
            <ProfilePost key={post.id} post={post} />
          ))}
      </ProfilePostContainer>
    </ProfileContainer>
  );
};

export default Profile;
