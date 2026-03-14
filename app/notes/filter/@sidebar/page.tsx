import type { Metadata } from 'next';
import { fetchNotes } from '@/lib/api/notes';
import NoteList from '@/components/NoteList/NoteList';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const tag = slug[0] || 'all';
  const title = tag === 'all' ? 'All Notes' : `${tag} Notes`;

  return {
    title: `${title} | NoteHub`,
    description: `Browse ${title.toLowerCase()} on NoteHub. Keep your ideas organized.`,
    openGraph: {
      title: `${title} | NoteHub`,
      description: `Browse ${title.toLowerCase()} on NoteHub. Keep your ideas organized.`,
      url: `https://notehub.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          alt: `NoteHub ${title}`,
        },
      ],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug = [] } = await params;
  const tag = slug[0] || 'all';
  const notesResponse = await fetchNotes({ tag: tag === 'all' ? undefined : tag });
  const notes = Array.isArray(notesResponse) ? notesResponse : notesResponse.notes;

  return (
    <div>
      <h1>Notes {tag !== 'all' ? `- ${tag}` : ''}</h1>
      <NoteList notes={notes} />
    </div>
  );
}
