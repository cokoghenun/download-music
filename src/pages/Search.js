/**  @jsx jsx  */
import { jsx } from '@emotion/core';
import { SEARCH } from '../query';
import AlbumCard from '../components/AlbumCard';
import mq from '../components/mq';
import ArtistCard from '../components/ArtistCard';
import queryString from 'query-string';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../components/Loading';
import Error from '../components/Error';
import SongItem from '../components/SongItem';
import { Link } from 'react-router-dom';

const Search = ({ location }) => {
  const query = queryString.parse(location.search)['q'].toLowerCase();
  const { data, loading, error } = useQuery(SEARCH, {
    variables: {
      input: { query, limit: 8 },
    },
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div>
      <div
        css={{
          fontSize: '2rem',
          marginBottom: '2rem',
        }}
      >
        Results for "{query}"
      </div>
      <div
        css={{
          margin: '3rem 0',
        }}
      >
        <div
          css={{
            margin: '2rem 0',
            fontSize: '1.5rem',
          }}
        >
          Artists
        </div>
        <div
          css={{
            display: 'grid',
            gridGap: '1rem',
            '@media  ( max-width :  549px )': {
              gridGap: '0.65rem',
            },
            justifyContent: 'center',
            gridTemplateColumns: 'repeat(2, calc(50% - 1rem))',
            [mq[1]]: {
              gridTemplateColumns: 'repeat(4, calc(25% - 1rem))',
            },
          }}
        >
          {data.searchArtist
            ? data.searchArtist.map((a, k) => <ArtistCard key={k} {...a} />)
            : null}
        </div>
      </div>
      <div
        css={{
          margin: '3rem 0',
        }}
      >
        <div
          css={{
            margin: '2rem 0',
            fontSize: '1.5rem',
          }}
        >
          Albums
        </div>
        <div
          css={{
            display: 'grid',
            gridGap: '1rem',
            '@media  ( max-width :  549px )': {
              gridGap: '0.65rem',
            },
            justifyContent: 'center',
            gridTemplateColumns: 'repeat(2, calc(50% - 1rem))',
            [mq[1]]: {
              gridTemplateColumns: 'repeat(4, calc(25% - 1rem))',
            },
          }}
        >
          {data.searchAlbum
            ? data.searchAlbum.map((a, k) => <AlbumCard key={k} {...a} />)
            : null}
        </div>
      </div>
      <div
        css={{
          margin: '3rem 0',
        }}
      >
        <div
          css={{
            margin: '2rem 0',
            fontSize: '1.5rem',
          }}
        >
          Songs
        </div>
        <div
          css={{
            display: 'grid',
            justifyContent: 'center',
            gridTemplateColumns: 'repeat(1, 100%)',
            [mq[0]]: {
              gridGap: '1rem',
              gridTemplateColumns: 'repeat(2, calc(50% - 1rem))',
            },
          }}
        >
          {data.searchSong
            ? data.searchSong.map((s, k) => (
                <Link
                  css={{
                    all: 'unset',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    textDecorationColor: '#fff',
                    textDecoration: 'underline',
                  }}
                  key={k}
                  to={`/song/${s.id}`}
                >
                  <SongItem {...s} simple />
                </Link>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
