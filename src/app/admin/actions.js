"use server";
import { clerkClient } from "@clerk/nextjs/server";
export async function Users() {
  try {
    const { data } = await clerkClient.users.getUserList();
    // console.log(data[0].emailAddresses[0].emailAddress);
    const temp = data?.map((u) => ({
      id: u.id,
      firstName: u.firstName ? u.firstName : "",
      lastName: u.lastName ? u.lastName : "",
      email: u.emailAddresses[0].emailAddress,
      imageUrl: u.imageUrl,
      createdAt: u.createdAt,
    }));

    return data && temp ? temp : [];
  } catch (error) {
    console.error("Error fetching users:", error); // Error handling
  }
}
export async function DeleteUser(userId) {
  try {
    await clerkClient.users.deleteUser(userId);
  } catch (error) {
    console.log(error);
  }
}
