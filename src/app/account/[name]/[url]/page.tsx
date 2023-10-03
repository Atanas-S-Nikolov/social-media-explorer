export default function Account({ params }: { params: { name: string, url: string } }) {
  const { name, url } = params;
  return (
    <>
      <h2>{name}</h2>
      <h2>{url}</h2>
    </>
  )
}
