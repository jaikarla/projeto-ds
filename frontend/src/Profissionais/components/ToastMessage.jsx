export function ToastMessage({ toast }) {
  if (!toast.message) {
    return null
  }

  return (
    <div className={`toast-message toast-message--${toast.type}`} role="status">
      <span className="toast-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      {toast.message}
    </div>
  )
}
