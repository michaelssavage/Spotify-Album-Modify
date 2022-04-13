import { useSession, signOut } from "next-auth/react";
import { useRef, useState } from "react";
import useVanta from "components/Vanta";
import Image from "next/image";
import styled from "styled-components";
import { shimmer, toBase64 } from "components/BlurImg";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { Link } from "react-scroll";

const Main = styled.main`
  height: 100vh;
  width: 100%;
  padding: 0 2rem;
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
  padding: 0.5rem;
  margin: 0;
  text-align: center;
`;

const NavHeader = styled.h3`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LogoutBtn = styled.button`
  color: #fff;
  background-color: transparent;
  border: 4px solid #1ed760;
  padding: 0.25rem 0.5rem;
  margin-left: 0.5rem;
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
const PlaylistBtn = styled.button`
  color: #fff;
  background-color: transparent;
  border: 4px solid #2941ab;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5%;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    border: 4px solid #3959e7;
    text-decoration: none;
  }
`;

const Playlists = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-evenly;
`;

export default function Home() {
  const [list, setList] = useState([]);
  const [clicked, setClicked] = useState(false);
  const { data: session, status } = useSession();

  const getMyPlaylists = async () => {
    const res = await fetch("/api/playlists");
    const { items } = await res.json();
    setList(items);
    setClicked(true);
  };
  const vRef = useRef(null);
  const vantaRef = useVanta(vRef);

  return (
    <>
      <Main ref={vantaRef}>
        <Container>
          <NavHeader>
            {session?.token?.email ? (
              <>
                <span>Signed in as {session?.token?.email}</span>
                <LogoutBtn onClick={() => signOut()}>Logout</LogoutBtn>
              </>
            ) : (
              <></>
            )}
          </NavHeader>
          <Header1>Album Modifier</Header1>

          {clicked ? (
            <Link to="playlists" spy={true} smooth={true}>
              <IconContext.Provider value={{ className: "arrowCtx" }}>
                <BsFillArrowDownCircleFill />
              </IconContext.Provider>
            </Link>
          ) : (
            <PlaylistBtn onClick={() => getMyPlaylists()}>
              Get all my playlists
            </PlaylistBtn>
          )}
        </Container>
      </Main>

      <Playlists id="playlists">
        {list.map((item) => (
          <div key={item.id}>
            <Image
              src={item.images[0]?.url}
              alt="Playlist Cover Art"
              width={200}
              height={200}
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(1080, 720)
              )}`}
              placeholder="blur"
            />
            <p>{item.name}</p>
          </div>
        ))}
      </Playlists>
    </>
  );
}
