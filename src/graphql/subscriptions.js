/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($owner: String) {
    onCreateTodo(owner: $owner) {
      id
      name
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($owner: String) {
    onUpdateTodo(owner: $owner) {
      id
      name
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($owner: String) {
    onDeleteTodo(owner: $owner) {
      id
      name
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateEmployee = /* GraphQL */ `
  subscription OnCreateEmployee($owner: String) {
    onCreateEmployee(owner: $owner) {
      id
      username
      nickname
      birthday
      comment
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateEmployee = /* GraphQL */ `
  subscription OnUpdateEmployee($owner: String) {
    onUpdateEmployee(owner: $owner) {
      id
      username
      nickname
      birthday
      comment
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteEmployee = /* GraphQL */ `
  subscription OnDeleteEmployee($owner: String) {
    onDeleteEmployee(owner: $owner) {
      id
      username
      nickname
      birthday
      comment
      createdAt
      updatedAt
      owner
    }
  }
`;
