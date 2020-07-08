/**  @jsx jsx  */
import { jsx } from '@emotion/core';
import SongList from '../components/SongList';
import AlbumInfo from '../components/AlbumInfo';
import mq from '../components/MediaQuery';

const Album = () => {
  return (
    <div
      css={{
        display: 'block',
        justifyContent: 'center',
        [mq[1]]: {
          display: 'flex',
        },
      }}
    >
      <AlbumInfo />
      <SongList />
    </div>
  );
};

export default Album;
