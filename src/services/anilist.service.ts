const ANILIST_URL = 'https://graphql.anilist.co';

export const GET_TRENDING = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(sort: TRENDING_DESC, type: ANIME) {
        id
        title { romaji english }
        coverImage { extraLarge color }
        bannerImage
        description
        averageScore
        episodes
        genres
        status
        season
        seasonYear
        trailer { id site }
        studios(isMain: true) { nodes { name } }
      }
    }
  }
`;

export const GET_SEASONAL = `
  query ($season: MediaSeason, $year: Int, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(season: $season, seasonYear: $year, sort: POPULARITY_DESC, type: ANIME) {
        id
        title { romaji english }
        coverImage { extraLarge color }
        bannerImage
        averageScore
        episodes
        genres
        status
      }
    }
  }
`;

export const anilistQuery = async (query: string, variables: Record<string, unknown> = {}) => {
  const res = await fetch(ANILIST_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
};
