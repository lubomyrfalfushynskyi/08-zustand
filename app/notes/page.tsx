import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/notes';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  try {
    // Ensuring server-side prefetch matches client-side initial queryKey and params
    await queryClient.prefetchQuery({
      queryKey: ['notes', 1, ''],
      queryFn: () => fetchNotes({ page: 1, search: '' }),
    });
  } catch (error) {
    console.error('Prefetch failed:', error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
