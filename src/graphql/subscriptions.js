/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePlaces = /* GraphQL */ `
  subscription OnCreatePlaces($owner: String!) {
    onCreatePlaces(owner: $owner) {
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
export const onUpdatePlaces = /* GraphQL */ `
  subscription OnUpdatePlaces($owner: String!) {
    onUpdatePlaces(owner: $owner) {
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
export const onDeletePlaces = /* GraphQL */ `
  subscription OnDeletePlaces($owner: String!) {
    onDeletePlaces(owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String!) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String!) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String!) {
    onDeleteUser(owner: $owner) {
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
