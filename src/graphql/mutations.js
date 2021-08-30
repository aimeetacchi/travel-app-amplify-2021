/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPlaces = /* GraphQL */ `
  mutation CreatePlaces(
    $input: CreatePlacesInput!
    $condition: ModelPlacesConditionInput
  ) {
    createPlaces(input: $input, condition: $condition) {
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
export const updatePlaces = /* GraphQL */ `
  mutation UpdatePlaces(
    $input: UpdatePlacesInput!
    $condition: ModelPlacesConditionInput
  ) {
    updatePlaces(input: $input, condition: $condition) {
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
export const deletePlaces = /* GraphQL */ `
  mutation DeletePlaces(
    $input: DeletePlacesInput!
    $condition: ModelPlacesConditionInput
  ) {
    deletePlaces(input: $input, condition: $condition) {
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
