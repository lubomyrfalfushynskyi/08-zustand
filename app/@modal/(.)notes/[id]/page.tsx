'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/notes';
import Modal from '@/components/Modal/Modal';
import { use } from 'react';

export const dynamic = 'force-dynamic';

export default function InterceptedNotePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const modalStyles = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
  };

  if (isLoading) return <Modal isOpen={true} onClose={() => router.back()}><p>Loading...</p></Modal>;
  if (!note) return <Modal isOpen={true} onClose={() => router.back()}><p>Note not found</p></Modal>;

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <div style={modalStyles}>
        <div style={{ marginBottom: '15px', borderBottom: '1px solid #eee' }}>
          <h2 style={{ margin: 0, paddingBottom: '10px' }}>{note.title}</h2>
        </div>
        <p style={{ display: 'inline-block', padding: '4px 8px', backgroundColor: '#f0f0f0', borderRadius: '4px', fontSize: '12px' }}>{note.tag}</p>
        <p style={{ marginTop: '15px', lineHeight: '1.6' }}>{note.content}</p>
        <p style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Modal>
  );
}
