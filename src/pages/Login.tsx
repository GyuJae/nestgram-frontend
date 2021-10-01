import React from "react";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillFacebook } from "react-icons/ai";
import styled from "styled-components";
import LOGIN_MUTATION from "../apollo/gql/mutations/login";
import { login, loginVariables } from "../apollo/__type__/login";
import Error from "../components/Error";
import { Link } from "react-router-dom";
import { onLoggedIn } from "../apollo/apollo";
import InstaLogo from "../components/InstaLogo";
import Loading from "../components/Loading";

type ILogin = {
  email: string;
  password: string;
};

const LoginContainer = styled.main`
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
  margin: 30px 0px;
`;

const LoginInstaSubTitle = styled.div`
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

const LoginInstaSubTitleItem = styled.div`
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

const Login = () => {
  const onCompleted = (data: login) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      onLoggedIn(token);
    }
  };
  const [loginFun, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted,
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit: SubmitHandler<ILogin> = async ({ email, password }) => {
    if (!loading) {
      await loginFun({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <LoginContainer>
      <FormContainer>
        <TitleContainer>
          <InstaLogo />
        </TitleContainer>
        <LoginInstaSubTitle>
          <LoginInstaSubTitleItem>
            친구들의 사진과 동영상을 보려면
          </LoginInstaSubTitleItem>
          <LoginInstaSubTitleItem> 가입하세요. </LoginInstaSubTitleItem>
        </LoginInstaSubTitle>
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
          {loading ? (
            <LoadingContainer>
              <Loading />
            </LoadingContainer>
          ) : (
            <SubmitInput type="submit" value="로그인" />
          )}
        </Form>
      </FormContainer>
      <StatusContainer>
        <span>계정이 없으신가요?</span>
        <SLink to="/create-account">가입하기</SLink>
      </StatusContainer>
    </LoginContainer>
  );
};

export default Login;
