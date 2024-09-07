'use server'
import { db } from "@/lib/prisma";
import { Meeting, User } from "@prisma/client";
import { getDbUser } from "./user.actions";

export const createNewMeeting = async (email: string, userId: string, title: string) => {
    try {
        const dbUser: User = await getDbUser(email);
        if (!dbUser) throw new Error("User not found");
        const meeting = await db.meeting.create({
            data: {
                title: title,
                userId: dbUser.id,
                hostId: userId,
                status: 'active',
                participants: {
                    create: {
                        name: dbUser.username,
                        image: dbUser.image,
                    },
                },
            },
            include: {
                participants: true,
            },
        });
        return meeting;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create new meeting");
    }

}

interface updateMeetingParams {
    callId: string,
    status: string
    meetingId: string
}
export const updateMeeting = async ({ callId, status, meetingId }: updateMeetingParams) => {
    try {
        const updatedMeeting = await db.meeting.update({
            where: {
                id: meetingId
            },
            data: {
                status: status,
                callId: callId
            }
        })
        return updatedMeeting
    } catch (error) {
        console.error(error)
    }
}

export const toggleMeetingState = async (meetingId: string) => {
    try {
        const updatedMeeting = await db.meeting.update({
            where: {
                id: meetingId
            },
            data: {
                status: 'inactive'
            }
        })

        return updatedMeeting
    } catch (error) {
        console.error(error)
    }
}

interface ScheduleMeetingParams {
    title: string,
    description: string,
    datetime: Date
}

export const scheduleMeeting = async (data: ScheduleMeetingParams) => {
    try {
        const scheduledMeeting = await db.meeting.create(
            {
                data: data
            }
        )

        return scheduledMeeting
    } catch (error) {
        console.error(error)
    }
}