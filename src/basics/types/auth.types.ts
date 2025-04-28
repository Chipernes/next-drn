export type AuthCredentials = {
  login: string;
  password: string;
  role: 'SERVICE' | 'KITCHEN' | 'ADMINISTRATION';
};
