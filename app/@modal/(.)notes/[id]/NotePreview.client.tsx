'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/notes';

export default function NotePreviewClient() {
  const params = useParams();
  const id = params.id as string;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    enabled: isMounted,
  });

  if (!isMounted || isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div>
      <div>
        <h2>{note.title}</h2>
      </div>
      <p>{note.tag}</p>
      <p>{note.content}</p>
      <p>
        {new Date(note.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
