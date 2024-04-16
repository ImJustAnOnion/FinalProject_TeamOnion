import { useState } from 'react'

function Button() {
  const [view, setView] = useState('dark');
  const icon = view === 'light' ? '🌙' : '☀️';

  return (
    <button onClick={() => {
      setView(view === 'dark' ? 'light' : 'dark');
      document.documentElement.setAttribute('data-theme', view === 'dark' ? 'light' : 'dark');
    }} className='button py-2 px-4 rounded-full'>
      {icon}
    </button>
  )
}

export default Button
