export class User {
  public name: string;
  public email: string;
  public role: string;
  public number: number | undefined;
  public gender: string | undefined;
  public city_id: string | undefined;
  public pincode: number | undefined;
  public address: string | undefined;
  public profileImg: string | undefined;
  constructor(
    name: string,
    email: string,
    role: string,
    number?: number | undefined,
    gender?: string | undefined,
    city_id?: string | undefined,
    pincode?: number | undefined,
    address?: string | undefined,
    profileImg?: string | undefined
  ) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.number = number;
    this.gender = gender;
    this.city_id = city_id;
    this.pincode = pincode;
    this.address = address;
    this.profileImg = profileImg;
  }
}
