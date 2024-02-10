import { gql } from '@apollo/client';
import { USER_BASE_FIELDS } from './fragments';

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

export const GET_CURRENT_USER = gql`
query {
    me {
      ...userBaseFields
    }
  }

  ${USER_BASE_FIELDS}
`;