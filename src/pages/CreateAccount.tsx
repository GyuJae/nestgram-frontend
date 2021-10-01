import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillFacebook } from "react-icons/ai";
import styled from "styled-components";
import Error from "../components/Error";
import { Link } from "react-router-dom";
import { createUser, createUserVariables } from "../apollo/__type__/createUser";
import CREATE_USER_MUTATION from "../apollo/gql/mutations/createUser";
import { useHistory } from "react-router-dom";
import InstaLogo from "../components/InstaLogo";
import Loading from "../components/Loading";

type ICreateAccount = {
  email: string;
  password: string;
  firstName: string;
  lastName?: string | null;
  username: string;
};

const CreateAccountContainer = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const FormContainer = styled.div`
  width: 350px;
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.1px solid ${(props) => props.theme.color.lineGray};
  margin-bottom: 5px;
`;

const TitleContainer = styled.header`
  height: 51px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
`;

const CreateAccountInstaSubTitle = styled.div`
  color: ${(props) => props.theme.color.gray};
  opacity: 0.5;
  font-size: 17px;
  font-weight: 600;
  width: 268px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const CreateAccountInstaSubTitleItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FacebookContainer = styled.div`
  width: 268px;
  font-size: 18px;
  background-color: ${(props) => props.theme.color.skyblue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: ${(props) => props.theme.color.white};
  padding: 5px 9px 5px 9px;
  border-radius: 5px;
  margin-bottom: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const OrContainer = styled.div`
  font-size: 15px;
  margin-bottom: 15px;
  width: 268px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${(props) => props.theme.color.gray};
  font-weight: 600;
`;

const LineContainer = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.color.lineGray};
  width: 100px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ItemInput = styled.input`
  padding: 8px 5px;
  width: 268px;
  margin-bottom: 5px;
  border: 1px solid ${(props) => props.theme.color.lineGray};
  outline: none;
  &:focus {
    border-color: ${(props) => props.theme.color.gray};
  }
`;

const SubmitInput = styled.input`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 268px;
  background-color: ${(props) => props.theme.color.skyblue};
  color: ${(props) => props.theme.color.white};
  padding: 5px 0px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const StatusContainer = styled.div`
  width: 350px;
  height: 70px;
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1px solid ${(props) => props.theme.color.lineGray};
  font-size: 14px;
`;

const SLink = styled(Link)`
  all: unset;
  color: ${(props) => props.theme.color.skyblue};
  margin-left: 5px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.skyblue};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.white};
  padding: 5px 0px;
  border-radius: 5px;
`;

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateAccount>();

  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ICreateAccount> = ({
    email,
    password,
    firstName,
    lastName,
    username,
  }) => {
    if (!loading) {
      createUserFun({
        variables: {
          input: {
            email,
            password,
            firstName,
            lastName,
            username,
          },
        },
      });
    }
  };

  const history = useHistory();
  const onCompleted = (data: createUser) => {
    const {
      createUser: { ok, error },
    } = data;
    if (ok) {
      alert("Account Created! Log in now!");
      history.push("/");
    } else {
      setError(error);
    }
  };

  const [createUserFun, { loading }] = useMutation<
    createUser,
    createUserVariables
  >(CREATE_USER_MUTATION, {
    onCompleted,
  });

  return (
    <CreateAccountContainer>
      <FormContainer>
        <TitleContainer>
          <InstaLogo />
        </TitleContainer>
        <CreateAccountInstaSubTitle>
          <CreateAccountInstaSubTitleItem>
            친구들의 사진과 동영상을 보려면
          </CreateAccountInstaSubTitleItem>
          <CreateAccountInstaSubTitleItem>
            {" "}
            가입하세요.{" "}
          </CreateAccountInstaSubTitleItem>
        </CreateAccountInstaSubTitle>
        <FacebookContainer>
          <AiFillFacebook />
          Facebook으로 로그인
        </FacebookContainer>
        <OrContainer>
          <LineContainer></LineContainer> 또는 <LineContainer></LineContainer>{" "}
        </OrContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ItemInput
            placeholder="이메일 주소"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <Error error="Email is required." />}
          <ItemInput
            placeholder="비밀번호"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <Error error="Password is required." />}
          <ItemInput
            placeholder="이름"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && <Error error="First is required." />}
          <ItemInput placeholder="성명" {...register("lastName")} />
          <ItemInput
            placeholder="사용자 이름"
            {...register("username", { required: true })}
          />
          {errors.username && <Error error="Username is required." />}
          {loading ? (
            <LoadingContainer>
              <Loading />
            </LoadingContainer>
          ) : (
            <SubmitInput type="submit" value={"가입"} />
          )}
        </Form>
        {error && <Error error={error} />}
      </FormContainer>
      <StatusContainer>
        <span>계정이 있으신가요?</span>
        <SLink to="/">로그인</SLink>
      </StatusContainer>
    </CreateAccountContainer>
  );
};

export default CreateAccount;
