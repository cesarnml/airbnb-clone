import { SafeUser } from '$/types'
import { useRouter } from 'next/navigation'
import { useLoginModal } from './useLoginModal'
import { MouseEvent, useCallback, useMemo } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

type Params = {
  listingId: string
  currentUser?: SafeUser | null
}

export const useFavorite = ({ listingId, currentUser }: Params) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(listingId)
    // FIXME reference variable in dependency array
  }, [currentUser?.favoriteIds, listingId])

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!currentUser) {
        return loginModal.onOpen()
      }
      try {
        let request

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`)
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`)
        }
        await request()
        router.refresh()
        toast.success('Success')
      } catch (err) {
        toast.error('Something went wrong')
      }
    },
    // FIXME reference variable in dependency array
    [currentUser, hasFavorited, listingId, loginModal, router],
  )
  return {
    hasFavorited,
    toggleFavorite,
  }
}
