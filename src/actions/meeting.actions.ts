'use server'
import { db } from "@/lib/prisma";
import { Meeting, User } from "@prisma/client";
import { getDbUser } from "./user.actions";

export const createNewMeeting = async (email: string, userId: string, title: string) => {
    try {
        const dbUser: User = await getDbUser(email);

        if (!dbUser) throw new Error("User not found");


        const meeting: Meeting = await db.meeting.create({
            data: {
                title: title,
                userId: dbUser.id,
                hostId: userId,
                status: 'active',
            }
        });

        const firstParticipant = await db.participant.create({
            data: {
                name: dbUser.username,
                image: dbUser.image,
                meetingId: meeting.id
            }
        })

        console.log(meeting)
        return meeting;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create new meeting");
    }

}