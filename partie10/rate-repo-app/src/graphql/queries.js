import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query repos {
  repositories {
    edges {
      node {
        id
        fullName
        language
        forksCount
        ownerAvatarUrl
        description
        stargazersCount
        reviewCount
        ratingAverage
      }
    }
  }
}
`;
