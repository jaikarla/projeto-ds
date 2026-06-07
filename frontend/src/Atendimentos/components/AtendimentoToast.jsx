import { Check, X } from 'lucide-react'

export function AtendimentoToast({ toast }) {
  if (!toast.message) {
    return null
  }

  const Icon = toast.type === 'danger' ? X : Check

  return (
    <div className={`atendimento-toast atendimento-toast--${toast.type}`} role="status">
      <span className="atendimento-toast-icon" aria-hidden="true">
        <Icon />
      </span>
      {toast.message}
    </div>
  )
}
