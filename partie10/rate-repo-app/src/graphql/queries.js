import { gql } from '@apollo/client';
import { USER_BASE_FIELDS, REPOSITORY_BASE_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repos {
  repositories {
    edges {
      node {
        ...repositoryBaseFields
      }
    }
  }
}

${REPOSITORY_BASE_FIELDS}
`;

export const GET_CURRENT_USER = gql`
query {
    me {
      ...userBaseFields
    }
  }

  ${USER_BASE_FIELDS}
`;

export const GET_REPOSITORY = gql`
query repo($id: ID!) {
  repository(id: $id) {
    ...repositoryBaseFields
    url
  }
}

${REPOSITORY_BASE_FIELDS}
`;

export const GET_REVIEWS = gql`
query repo($id: ID!) {
  repository(id: $id) {
    id
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;