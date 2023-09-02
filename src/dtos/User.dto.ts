import { Length, Matches } from "class-validator";

export class UserDTO {
  @Length(5, 50, { message: "Username must be between 5 and 50 characters." })
  username: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      "password must contain at least 1 letter, 1 number, 1 special character, and have a length of at least 8 characters.",
  })
  password: string;

  role: "Tester" | "Dev" | "Manager" | "Admin";
}
