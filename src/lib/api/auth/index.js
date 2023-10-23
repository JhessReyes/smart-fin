export const SIGNIN_WITH_EMAIL_AND_PASSWORD = `mutation SignInWithEmailAndPassword($email: String!, $password: String!) {
    signInWithEmailAndPassword(email: $email, password: $password) {
        accessToken
    }
}`;

export const VERIFY_ME = `query Me {
    me {
      id
      email
      plan {
        name
        id
      }
      name
    }
  }`

export const CREATE_USER_WITH_EMAIL_AND_PASSWORD = `mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }`