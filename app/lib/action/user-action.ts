"use server"
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function changeUserStatusAction(userId: string, newStatus: "enabled" | "disabled") {
    const session = await auth();
    if (!session) {
        redirect("/");
    }

    const url = process.env.MY_TASK_USERS_BASE_API + `/${userId}/${newStatus}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + session.user?.accessToken
        }
    });
    if (response.ok) {
        revalidatePath("/dashboard/users");
    } else {
        throw Error("ChangeUserStatusError");
    }
}