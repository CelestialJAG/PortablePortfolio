export default function getUserId(user: any): string {
  return user?.sub?.slice(user?.sub.indexOf("|") + 1);
}
