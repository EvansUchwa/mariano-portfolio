export enum genericErrorEnum {
  errorOccur = "error occur",
  missingRequiredField = "Missing required fields",
  invalidCredential = "Invalid credential",
  invalidPermission = "Invalid permission",
}

export enum roleErrorEnum {
  invalidRole = "invalid role",
}

export enum passwordErrorEnum {
  incorrectPassword = "incorrect password",
  passwordsMismatch = "passwords mismatch",
}

export enum emailErrorEnum {
  emailNotFound = "email not found",
  emailAreadyUse = "email already registered",
  emailNotVerified = "email could not verified",
  invalidEmail = "invalid email",
}

export enum profileErrorEnum {
  notVerified = "Profile not verified",
  mcNumberAlreadyExist = "Mc Number already exist",
  dotNumberAlreadyExist = "Dot Number already exist",
}

export enum loadErrorEnum {
  notFound = "Load not found",
}
