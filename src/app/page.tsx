import { ClientOnly } from '$/components/ClientOnly'
import { Container } from '$/components/Container'
import { EmptyState } from '$/components/EmptyState'
import { ListingCard } from '$/components/ListingCard'
import getCurrentUser from './actions/getCurrentUser'
import getListings, { ListingParams } from './actions/getListings'

export type Props = {
  searchParams: ListingParams
}
export default async function Home({ searchParams }: Props) {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  const isEmpty = !listings.length

  if (isEmpty) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          {listings.map((listing) => (
            <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}
