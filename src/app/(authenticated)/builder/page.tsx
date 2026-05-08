'use client'

import React, { useEffect, useRef, useState } from 'react'
import Cookies from "js-cookie";
const chatId = "a66b1f65-7d04-4d49-9943-0140d98c692d\n"
const token = Cookies.get("access_token");

const WS_URL = `ws://localhost:8888/audio?chatId=${chatId}&token=${token}`

export default function VoiceTestApp() {

    const wsRef = useRef<WebSocket | null>(null)
    const audioContextRef = useRef<AudioContext | null>(null)
    const streamRef = useRef<MediaStream | null>(null)

    const [connected, setConnected] = useState(false)
    const [recording, setRecording] = useState(false)

    const [partialText, setPartialText] = useState('')
    const [finalText, setFinalText] = useState('')
    const [logs, setLogs] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [aiMessages, setAiMessages] = useState<string[]>([])
    const [aiStreaming, setAiStreaming] = useState(false)
    const addLog = (msg: string) => {
        setLogs(prev => [`${new Date().toLocaleTimeString()} | ${msg}`, ...prev])
    }

    const connectWS = () => {

        if (wsRef.current?.readyState === WebSocket.OPEN) return

        const ws = new WebSocket(WS_URL)
        ws.binaryType = 'arraybuffer'

        ws.onopen = () => {
            setConnected(true)
            setError(null)
            addLog('WS connected')
        }

        ws.onclose = () => {
            setConnected(false)
            setRecording(false)
            addLog('WS disconnected')
        }

        ws.onerror = () => {
            setError('WebSocket error')
            addLog('WS error')
        }

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)

                // 🎤 STT
                if (data.type === 'partial') {
                    setPartialText(data.text)
                }

                if (data.type === 'final') {
                    setFinalText(prev => (prev + ' ' + data.text).trim())
                    setPartialText('')
                }

                // 🤖 AI STREAM START
                if (data.type === 'ai_chunk') {
                    setAiStreaming(true)

                    setAiMessages(prev => {
                        const updated = [...prev]
                        const lastIndex = updated.length - 1

                        if (lastIndex >= 0 && updated[lastIndex].startsWith('...')) {
                            updated[lastIndex] =
                                updated[lastIndex].replace('...', '') + data.text
                        } else {
                            updated.push(data.text)
                        }

                        return updated
                    })
                }

                // 🤖 AI DONE
                if (data.type === 'ai_done') {
                    setAiStreaming(false)
                    addLog('AI response finished')
                }

                if (data.type === 'error') {
                    setError(data.message)
                }

            } catch {
                addLog('Invalid WS message')
            }
        }

        wsRef.current = ws
    }

    const startRecording = async () => {

        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            addLog('WS not connected')
            return
        }

        try {

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                }
            })

            streamRef.current = stream

            const audioContext = new AudioContext({ sampleRate: 16000 })
            audioContextRef.current = audioContext

            await audioContext.audioWorklet.addModule('/audio-worklet.js')

            const source = audioContext.createMediaStreamSource(stream)

            const node = new AudioWorkletNode(audioContext, 'pcm-processor')

            node.port.onmessage = (event) => {

                const pcm = event.data

                if (
                    wsRef.current?.readyState === WebSocket.OPEN
                ) {
                    wsRef.current.send(pcm)
                }
            }

            source.connect(node)
            node.connect(audioContext.destination)

            setRecording(true)
            addLog('Recording started')

        } catch (e) {
            console.error(e)
            setError('Microphone access denied')
            addLog('Mic error')
        }
    }

    const stopRecording = async () => {

        streamRef.current?.getTracks().forEach(t => t.stop())
        streamRef.current = null

        await audioContextRef.current?.close()
        audioContextRef.current = null

        setRecording(false)
        addLog('Recording stopped')
    }

    useEffect(() => {
        return () => {
            stopRecording()
            wsRef.current?.close()
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="bg-white p-6 rounded-2xl shadow">

                    <h1 className="text-2xl font-bold">
                        Voice Streaming App
                    </h1>

                    <div className="flex gap-3 mt-4">

                        <button onClick={connectWS}
                                className="px-4 py-2 bg-black text-white rounded-xl">
                            Connect
                        </button>

                        <button onClick={startRecording}
                                disabled={!connected || recording}
                                className="px-4 py-2 border rounded-xl disabled:opacity-40">
                            Start
                        </button>

                        <button onClick={stopRecording}
                                disabled={!recording}
                                className="px-4 py-2 border rounded-xl">
                            Stop
                        </button>

                    </div>

                    <div className="mt-4 flex items-center gap-2">

                        <div className={`w-3 h-3 rounded-full ${
                            connected ? 'bg-green-500' : 'bg-red-500'
                        }`} />

                        <span>
                            {connected ? 'Connected' : 'Disconnected'}
                        </span>

                        {recording && (
                            <span className="text-red-500 ml-2 animate-pulse">
                                ● recording
                            </span>
                        )}

                    </div>

                    {error && (
                        <div className="mt-3 text-red-500">
                            {error}
                        </div>
                    )}

                </div>

                {/* Partial */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="font-semibold mb-2">Partial</h2>
                    <div className="text-lg min-h-[80px] bg-gray-50 p-4 rounded-xl">
                        {partialText || '...'}
                    </div>
                </div>

                {/* Final */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="font-semibold mb-2">Final</h2>
                    <div className="text-lg min-h-[150px] bg-gray-50 p-4 rounded-xl whitespace-pre-wrap">
                        {finalText || '...'}
                    </div>
                </div>

                {/* Logs */}
                <div className="bg-black text-green-400 p-4 rounded-2xl font-mono text-sm max-h-[250px] overflow-auto">
                    {logs.map((l, i) => <div key={i}>{l}</div>)}
                </div>

            </div>

            {/* AI Response */}
            <div className="bg-white p-6 rounded-2xl shadow">

                <h2 className="font-semibold mb-2 flex items-center gap-2">

                    AI Response

                    {aiStreaming && (
                        <span className="text-blue-500 animate-pulse">
                ● streaming
            </span>
                    )}

                </h2>

                <div className="text-lg min-h-[150px] bg-gray-50 p-4 rounded-xl whitespace-pre-wrap">

                    {aiMessages.length === 0
                        ? 'AI response will appear here...'
                        : aiMessages.map((m, i) => (
                            <div key={i}>{m}</div>
                        ))
                    }

                </div>

            </div>

        </div>
    )
}