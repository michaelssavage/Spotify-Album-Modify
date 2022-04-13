import styled from "styled-components";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";

const NavHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  color: #000;
  font-size: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  font-size: 1rem;
`;

const LogoutBtn = styled.button`
  background-color: transparent;
  border: 4px solid #1ed760;
  padding: 0.25rem 0.5rem;
  margin-left: 0.5rem;
  border-radius: 5%;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    border: 4px solid #29f370;
    text-decoration: none;
  }
`;
const SignOut = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <NavHeader>
      <Link href="/home">Home</Link>
      {session?.token?.email ? (
        <SignOut>
          <span>{session?.token?.email}</span>
          <LogoutBtn onClick={signOut}>Logout</LogoutBtn>
        </SignOut>
      ) : (
        <></>
      )}
    </NavHeader>
  );
}
