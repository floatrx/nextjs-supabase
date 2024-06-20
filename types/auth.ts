export type TCredentials = {
  email: string;
  password: string;
};

export enum AuthServiceViaEmailAction {
  SignIn = 'signInWithPassword',
  SignUp = 'signUp',
}
