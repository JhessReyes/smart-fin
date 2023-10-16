// Authentication interface
export interface IAuthenticationService {
    /**
   * Log In with email and password
   * @param {{ email: string, password: string }} variables
   * @returns {{accessToken: string}}
   */
    signInWithEmailAndPassword(variables: { email: string, password: string }): Promise<boolean>;
    verifyToken?(token: string): Promise<boolean>;
    // Otros métodos relacionados con autenticación
}

export interface ICategory {
    id: string
    name: string
}

export interface IInputBudgetCategory {
    categoryId: string
    amount: number
}