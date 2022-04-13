import Image from "next/image";
import { shimmer, toBase64 } from "components/BlurImg";
import styled from "styled-components";

const CardItem = styled.div`
  cursor: pointer;
  border: 4px solid #2941ab;
  max-width: 15%;
  &:hover {
    border: 4px solid #3959e7;
  }
`;
const CardText = styled.div`
  word-wrap: break-word;
  padding: 0.2rem 0.4rem;
`;

export default function Card({ item, onClick }) {
  return (
    <CardItem onClick={onClick}>
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
      <CardText>
        {item.name} - {item.tracks.total} tracks
      </CardText>
    </CardItem>
  );
}
