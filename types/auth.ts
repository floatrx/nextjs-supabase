export type TAuthCredentials = {
  email: string;
  password: string;
};

export enum EAuthServiceViaEmailAction {
  SignIn = 'signInWithPassword',
  SignUp = 'signUp',
}
