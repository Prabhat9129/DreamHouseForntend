export class User {
  public name: string;
  public email: string;
  public role: string;
  public contact: number | undefined;
  public gender: string | undefined;
  public city: string | undefined;
  public pincode: number | undefined;
  public address: string | undefined;
  public profileImg: string | undefined;
  constructor(
    name: string,
    email: string,
    role: string,
    contact?: number | undefined,
    gender?: string | undefined,
    city?: string | undefined,
    pincode?: number | undefined,
    address?: string | undefined,
    profileImg?: string | undefined
  ) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.contact = contact;
    this.gender = gender;
    this.city = city;
    this.pincode = pincode;
    this.address = address;
    this.profileImg = profileImg;
  }
}
