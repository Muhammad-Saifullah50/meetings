'use server'

import { StreamChat } from 'stream-chat';

export const generateToken = async (userId: string) => {
    const api_key = process.env.STREAM_API_KEY!;
    const api_secret = process.env.STREAM_API_SECRET
    const user_id = userId;

    try {
        const serverClient = StreamChat.getInstance(api_key, api_secret);
        const token = serverClient.createToken(user_id);

        return token
    } catch (error) {
        console.error(error)
    }
}
