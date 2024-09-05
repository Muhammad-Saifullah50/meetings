import { generateToken } from "@/actions/token.actions";
import { getDbUser, getDbUserById } from "@/actions/user.actions";
import Meeting from "@/components/Meeting"
import { User } from "@prisma/client";

const MeetingIdPage = async ({ params }: { params: { userId: string } }) => {

  const user: User = await getDbUserById(params.userId);
  const token = await generateToken(user.userId);
  return (
    <Meeting
      meetingUser={user}
      token={token!}
    />
  )
}

export default MeetingIdPage
