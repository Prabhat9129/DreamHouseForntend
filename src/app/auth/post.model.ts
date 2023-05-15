export interface response {
  status: string;
  statuscode: number;
  message: string;
  user: {};
}

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

export interface updateProfile {
  name: string;
  email: string;
  password: string;
  role: string;
  number: number;
  gender: string;
  city_id: string;
  pincode: number;
  address: string;
}
