export const metadata = { title: 'PokeScout', description: 'Scanner de cartes Pokémon' }
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin:0, background:'#080810' }}>{children}</body>
    </html>
  )
}