import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { redirect } from "next/navigation";

export const requireUser = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error(" user not found in requireuser kinde sesson issue");
    // return redirect("/api/auth/login");
  }
  return user;
};
