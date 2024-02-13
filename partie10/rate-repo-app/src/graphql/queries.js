import { gql } from '@apollo/client';
import {
  USER_BASE_FIELDS,
  REPOSITORY_BASE_FIELDS,
  REVIEW_BASE_FIELDS
} from './fragments';

export const GET_REPOSITORIES = gql`
  query repos (
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $searchKeyword: String,
    $first: Int,
    $after: String
  ) {
  repositories(
    orderBy: $orderBy,
    orderDirection: $orderDirection,
    searchKeyword: $searchKeyword,
    first: $first,
    after: $after
  ){
    totalCount
    edges {
      node {
        ...repositoryBaseFields
      }
    }
    pageInfo {
      hasNextPage
      endCursor
      startCursor
      hasPreviousPage
    }
  }
}

${REPOSITORY_BASE_FIELDS}
`;

export const GET_CURRENT_USER = gql`
query getCurrentUser($includeReviews: Boolean = false) {
    me {
      ...userBaseFields
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...reviewBaseFields
          }
        }
      }
    }
  }

  ${USER_BASE_FIELDS}
  ${REVIEW_BASE_FIELDS}
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
          ...reviewBaseFields
        }
      }
    }
  }
}

${REVIEW_BASE_FIELDS}
`;