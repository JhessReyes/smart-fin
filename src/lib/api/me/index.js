export const UPDATE_USER = `
    mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      email
      id
    }
  }`