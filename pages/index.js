import { useSession, signIn } from "next-auth/react";
import { useRef } from "react";
import useVanta from "components/Vanta";
import Image from "next/image";
import styled from "styled-components";

const Main = styled.main`
  min-height: 100vh;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  color: #fff;
`;

const Header1 = styled.h1`
  font-size: 6rem;
  padding: 1rem;
  margin: 0;
`;

const LoginBtn = styled.button`
  color: #fff;
  background-color: transparent;
  border: 4px solid #1ed760;
  font-size: 1.4rem;
  margin: 1rem;
  padding: 1rem 2rem;
  border-radius: 5%;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    border: 4px solid #29f370;
    text-decoration: none;
  }
`;

const ImageWrap = styled.span`
  margin-left: 1rem;
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Login() {
  const vRef = useRef(null);
  const vantaRef = useVanta(vRef);
  const { data: session } = useSession();

  return (
    <Main ref={vantaRef}>
      <Container>
        <Header1>Album Modifier</Header1>
        <h2>Replace songs that don't have the proper album version.</h2>
        <LoginBtn onClick={() => signIn()}>
          <span>Login with Spotify</span>
          <ImageWrap>
            <Image
              src="/SpotifyIcon.png"
              alt="Spotify Icon"
              height={40}
              width={40}
            />
          </ImageWrap>
        </LoginBtn>
      </Container>
    </Main>
  );
}
