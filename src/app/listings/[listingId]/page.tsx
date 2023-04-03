import { getListingById } from '$/app/actions/getListingById'
import { ClientOnly } from '$/components/ClientOnly'
import { EmptyState } from '$/components/EmptyState'

type Params = {
  listingId?: string
}

const ListingPage = async ({ params }: { params: Params }) => {
  const listing = await getListingById(params)

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return <ClientOnly>{listing.title}</ClientOnly>
}

export default ListingPage
