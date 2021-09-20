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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
