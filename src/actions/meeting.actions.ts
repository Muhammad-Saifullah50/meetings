'use server'
import { db } from "@/lib/prisma";
import { Meeting } from "@prisma/client";
import { getDbUser } from "./user.actions";

export const createNewMeeting = async (email: string, userId: string, title: string) => {
    try {
        const dbUser = await getDbUser(email);

        if (!dbUser) throw new Error("User not found");

        const meeting: Meeting = await db.meeting.create({
            data: {
                title: title,
                userId: dbUser.id,
                hostId: userId,
            }
        });
        console.log(meeting)
        return meeting;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create new meeting");
    }

}