import { db } from "@/lib/prisma";

export const getDbUser = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email: email,
            },
        });
        return user;
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to fetch user");
    }
}

export const getDbUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: id,
            },
        })
        return user
    }
    catch (error) {
        console.log(error)
    }
}

