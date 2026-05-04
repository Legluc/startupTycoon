import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Stats } from '@/views/Stats'

export default async function StatsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in?redirect_url=/stats')
  }

  return <Stats />
}
