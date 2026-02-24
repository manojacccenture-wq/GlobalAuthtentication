export const maskEmail = (email) => {
  if (!email) return "";
  const [name, domain] = email.split("@");
  return `${name[0]}*****@${domain}`;
};