import ActionCard from "@/components/ActionCard";
import Hero from "@/components/Hero";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {

  const user = await currentUser();
  return (
    <main className="flex flex-col gap-8 h-full bg-dark-primary w-full overflow-y-scroll p-8 ">
      <Hero />

      <section className="flex w-full gap-4 mt-[200px] justify-between">
        <ActionCard
          title='New Meeting'
          subTitle='Setup a new recording'
          iconPath='/plus-white.svg'
          color='bg-orange'
          type='new'
          userId={user?.id}
          email={user?.emailAddresses[0].emailAddress}
        />
        <ActionCard
          title='Join Meeting'
          subTitle='via invitation link'
          iconPath='/user.svg'
          color='bg-blue'
          type='join'
        />
        <ActionCard
          title='Schedule Meeting'
          subTitle='Plan your meeting'
          iconPath='/calendar.svg'
          color='bg-purple'
          type='schedule'
        />
        <ActionCard
          title='View Recordings'
          subTitle='Meeting recordings'
          iconPath='/video.svg'
          color='bg-yellow'
          type='recordings'
        />
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white">Today&apos;s Upcoming Meetings</h2>
        {/* Upcoming Meetings */}
      </section>

    </main>
  );
}
