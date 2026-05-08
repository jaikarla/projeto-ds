import { ProfessionalsPage } from './features/professionals/ProfessionalsPage'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <span>BPA - Boletim Produção Ambulatorial</span>
      </header>

      <ProfessionalsPage />
    </main>
  )
}

export default App
