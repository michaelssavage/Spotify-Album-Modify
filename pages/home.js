import { useEffect, useRef, useState } from "react";
import useVanta from "components/Vanta";
import styled from "styled-components";
import Card from "components/Card";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { Link } from "react-scroll";
import { getSession } from "next-auth/react";
import { getPlaylistTracks } from "lib/spotify";

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
  color: #000000;
`;

const Header1 = styled.h1`
  font-size: 6rem;
  padding: 0.5rem;
  margin: 0;
  text-align: center;
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

  const vRef = useRef(null);
  const vantaRef = useVanta(vRef);

  const handleGetTracks = async (url) => {
    const res = await fetch("/api/tracks");
    const { access_token } = await res.json();
    console.log(access_token);
    // const songs = await getPlaylistTracks(url, access_token);
    // console.log(songs);
  };

  useEffect(() => {
    const getMyPlaylists = async () => {
      const res = await fetch("/api/playlists");
      const { items } = await res.json();
      setList(items);
    };
    getMyPlaylists();
  }, []);

  return (
    <>
      <Main ref={vantaRef}>
        <Container>
          <Header1>Your Spotify Playlists</Header1>

          <Link to="playlists" spy={true} smooth={true}>
            <IconContext.Provider value={{ className: "arrowCtx" }}>
              <BsFillArrowDownCircleFill />
            </IconContext.Provider>
          </Link>
        </Container>
      </Main>

      <Playlists id="playlists">
        {list.map((item) => (
          <Card
            key={item.id}
            item={item}
            onClick={() => handleGetTracks(item.tracks.href)}
          />
        ))}
      </Playlists>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
