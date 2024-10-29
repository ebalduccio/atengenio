'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MessageCircle, Send, X, Smile, Check, Paperclip } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  id: number
  text: string
  sender: 'user' | 'support'
  read?: boolean
  reaction?: string
  timestamp: string
}

const emojis = ['👍', '❤️', '😊', '🎉', '🤔', '😂', '🙌', '💡']

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Como posso ajudar você hoje? 👋",
      sender: 'support',
      read: true,
      timestamp: '09:00'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => setIsOpen(!isOpen)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      const newUserMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, newUserMessage])
      setInputMessage('')
      simulateTyping()
    }
  }

  const simulateTyping = () => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const supportResponse: Message = {
        id: messages.length + 2,
        text: "Obrigado por sua mensagem! Nossa equipe responderá em breve. 😊",
        sender: 'support',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prevMessages => [...prevMessages, supportResponse])
    }, 2000)
  }

  const handleReaction = (messageId: number, reaction: string) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, reaction } : msg
      )
    )
  }

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-96 h-[32rem] flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Consulta Inteligente</h2>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-grow px-4 py-6" ref={scrollAreaRef}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-6 flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-end gap-2">
                      {message.sender === 'support' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold ring-2 ring-white dark:ring-gray-900">
                          S
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        {message.text}
                        <div className="text-xs mt-1 opacity-70">{message.timestamp}</div>
                      </div>
                      {message.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold ring-2 ring-white dark:ring-gray-900">
                          U
                        </div>
                      )}
                    </div>

                    <div className="flex items-center mt-1 space-x-2">
                      {message.read && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center text-xs text-gray-500"
                        >
                          <Check className="w-3 h-3 mr-1" />
                          <span>Lido</span>
                        </motion.div>
                      )}
                      {message.reaction && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-sm"
                        >
                          {message.reaction}
                        </motion.span>
                      )}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 rounded-full p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <Smile className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2">
                          <div className="flex flex-wrap gap-1">
                            {emojis.map((emoji) => (
                              <button
                                key={emoji}
                                className="text-xl hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1.5 transition-colors"
                                onClick={() => handleReaction(message.id, emoji)}
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                    S
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg">
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="rounded-full bg-gray-100 dark:bg-gray-800 border-0 focus-visible:ring-1 focus-visible:ring-violet-500"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full bg-gradient-to-r from-violet-500 to-purple-500 hover:opacity-90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={toggleChat}
              size="icon"
              className="rounded-full h-14 w-14 bg-gradient-to-r from-violet-500 to-purple-500 hover:opacity-90 shadow-lg"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}