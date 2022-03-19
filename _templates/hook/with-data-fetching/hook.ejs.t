---
to: <%= path %>
---
import { useQuery } from 'react-query';

const fetcher = async () => {
  // Use axios or fetch to do a http request here
}

export function <%= name %>() {
  // Use ONLY one useQuery per hook and optionally multiple useMutations
  const query = useQuery('QUERY-KEY', fetcher);
  const { mutate: updateResource } = useMutation(/* mutate function here */)
  return {
    ...query,
    updateResource
  }
}

