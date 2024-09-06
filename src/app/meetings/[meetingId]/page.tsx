import { generateToken } from "@/actions/token.actions";
import { getDbUser, getDbUserById } from "@/actions/user.actions";
import Meeting from "@/components/Meeting"
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { redirect } from "next/navigation";

const MeetingIdPage = async ({ params }: { params: { meetingId: string } }) => {
  const clerkUser = await currentUser();

  if (!clerkUser) redirect('/sign-in')

  const user: User = await getDbUser(clerkUser?.emailAddresses[0].emailAddress);

  const token = await generateToken(user.userId);
  return (
    <section className="bg-dark-primary">
      <Meeting
        meetingUser={user}
        token={token!}
        meetingId={params.meetingId}
      />
    </section>

  )
}

export default MeetingIdPage
