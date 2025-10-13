import { useEffect, useRef, useState } from 'react'

type ChatMessage = {
  name: string
  message: string
  timestamp: number
}

const getDefaultChatUrl = () => {
  const env = (import.meta as any).env
  const fromEnv = env?.VITE_CHAT_URL as string | undefined
  if (fromEnv) return fromEnv
  // Default localhost port for docker-compose chat service
  return 'http://localhost:3001'
}

export function SimpleChat() {
  const [username, setUsername] = useState<string>(() => localStorage.getItem('demo_chat_username') || '')
  const [tempName, setTempName] = useState<string>('')
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [text, setText] = useState('')
  const socketRef = useRef<any>(null)
  const urlRef = useRef<string>(getDefaultChatUrl())

  // Connect when username is set
  useEffect(() => {
    if (!username || socketRef.current) return
    let isActive = true

    ;(async () => {
      const mod = await import('socket.io-client')
      const io = (mod as any).io || (mod as any).default?.io || (mod as any)
      const socket = io(urlRef.current, {
        // Allow both polling and websocket; align path without trailing slash
        autoConnect: true,
        withCredentials: false,
        path: '/socket.io',
      })
      if (!isActive) return
      socketRef.current = socket

      socket.on('connect', () => setConnected(true))
      socket.on('disconnect', () => setConnected(false))
      socket.on('chat_message', (msg: ChatMessage) => {
        setMessages((prev) => [...prev, msg])
      })
    })()

    return () => {
      isActive = false
    }
  }, [username])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        try {
          socketRef.current.disconnect()
        } catch {}
        socketRef.current = null
      }
    }
  }, [])

  const startChat = () => {
    const name = tempName.trim()
    if (!name) return
    setUsername(name)
    localStorage.setItem('demo_chat_username', name)
  }

  const sendMessage = () => {
    const msg = text.trim()
    if (!msg || !socketRef.current) return
    const payload = { name: username, message: msg }
    socketRef.current.emit('chat_message', payload)
    setText('')
  }

  if (!username) {
    return (
      <div className="p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="block text-sm text-muted-foreground mb-1">Enter your name to join</label>
            <input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded border px-3 py-2 bg-background"
            />
          </div>
          <button onClick={startChat} className="h-10 px-4 rounded bg-primary text-primary-foreground hover:bg-primary/90">
            Start Chat
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Server: {urlRef.current}</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2 text-sm">
        <div>
          Signed in as <span className="font-medium">{username}</span>
        </div>
        <div className={connected ? 'text-emerald-600' : 'text-rose-600'}>
          {connected ? 'Connected' : 'Disconnected'}
        </div>
      </div>
      <div className="h-56 overflow-y-auto rounded border bg-background p-3 space-y-2">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages yet. Say hello!</p>
        ) : (
          messages.map((m, i) => (
            <div key={i} className="text-sm">
              <span className="font-medium">{m.name}</span>
              <span className="mx-1 text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {new Date(m.timestamp).toLocaleTimeString()}
              </span>
              <span className="ml-2">{m.message}</span>
            </div>
          ))
        )}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 rounded border px-3 py-2 bg-background"
        />
        <button onClick={sendMessage} disabled={!connected} className="h-10 px-4 rounded bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
          Send
        </button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Server: {urlRef.current}</p>
    </div>
  )
}
