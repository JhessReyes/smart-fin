// Authentication interface
export interface IAuthenticationService {
    /**
   * Log In with email and password
   * @param {{ email: string, password: string }} variables
   * @returns {{accessToken: string}}
   */
    signInWithEmailAndPassword(variables: { email: string, password: string }): Promise<boolean>;
    signInWithGoogleProvider({ variables }: { variables: object }): Promise<any>;
    verifyToken?(token: string): Promise<boolean>;
    // Otros métodos relacionados con autenticación
}

// Authentication interface with Firebase
export interface IFirebaseAuthenticationService {
    /**
   * Log In with email and password
   * @param {{ email: string, password: string }} variables
   * @returns {{accessToken: string}}
   */
    signInWithEmailAndPassword(variables: { email: string, password: string }): Promise<any>;
    signInWithGoogleProvider(): Promise<any>;
    logOut({ variables }: { variables: object }): Promise<any>;
    verifyToken?(token: string): Promise<boolean>;
    // Otros métodos relacionados con autenticación
}

// SignUp interface
export interface ISignUpService {
    /**
   * Log In with email and password
   * @param {{ name: string, email: string, password: string,  planId: string }} variables
   * @returns {{accessToken: string}}
   */
    createUserWithEmailAndPassword(variables: { name: string, email: string, password: string, planId: string; }): Promise<boolean>;
    getPlans(): Promise<any>;
    // Otros métodos relacionados con registro
}

export interface ICategory {
    id: string
    name: string
}

export interface IInputBudgetCategory {
    categoryId: string
    amount: number
}

export interface IUser {
    id: string
    name: string
    email: string
    currency: string
    picture: string
}