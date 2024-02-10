'use client';

export default function Account({ params }: { params: { id: string, url: string } }) {
  const { id, url } = params;
  
  return (
    <>
      <h2>{id}</h2>
      <h2>{url}</h2>
    </>
  )
}
