/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlaces = /* GraphQL */ `
  query GetPlaces($id: ID!) {
    getPlaces(id: $id) {
      id
      city
      country
      description
      dateVisitedFrom
      dateVisitedTo
      favourite
      visited
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPlaces = /* GraphQL */ `
  query ListPlaces(
    $filter: ModelPlacesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlaces(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        city
        country
        description
        dateVisitedFrom
        dateVisitedTo
        favourite
        visited
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      location
      bio
      CountriesTotal
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        location
        bio
        CountriesTotal
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
