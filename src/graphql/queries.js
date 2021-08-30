/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlaces = /* GraphQL */ `
  query GetPlaces($id: ID!) {
    getPlaces(id: $id) {
      id
      city
      country
      description
      dateVisited
      tags
      favourite
      visited
      imgUrl
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
        dateVisited
        tags
        favourite
        visited
        imgUrl
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
