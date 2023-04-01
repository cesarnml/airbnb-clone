import { authOptions } from '$/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

import prisma from '$/lib/prismadb'

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession()
    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findFirst()

    if (!currentUser) {
      return null
    }
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    }
  } catch (err) {
    return null
  }
}
