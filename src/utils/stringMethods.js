export const schoolName = (email) => {
  if (!email.endsWith('.edu')) {
    return 'Off-Campus'
  } else {
    return email.substring(email.lastIndexOf("@") +1, email.lastIndexOf("."));
  }
};

export const userInitials = (fName, lName) => {
  return `${fName.substring(0,1)}${lName.substring(0,1)}`;
};
