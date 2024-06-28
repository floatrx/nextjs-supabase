export type TAuthCredentials = {
  email: string;
  password: string;
};

export enum AuthServiceViaEmailAction {
  SignIn = 'signInWithPassword',
  SignUp = 'signUp',
}
