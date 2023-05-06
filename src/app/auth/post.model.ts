export interface post {
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface log {
  email: string;
  password: string;
}

export interface updatepassword {
  currentpassword: string;
  newpassword: string;
  conformpassword: string;
}
