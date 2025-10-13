import { Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

type ChatMessage = {
  name: string
  message: string
  timestamp?: number
}

@WebSocketGateway({
  path: '/socket.io',
  cors: {
    origin: (origin: string | undefined, cb: (err: Error | null, allow?: boolean) => void) => {
      const cfg = (process.env.CORS_ORIGIN ?? '*')
        .split(',')
        .map((s) => s.trim())
      if (!origin || cfg.includes('*') || cfg.includes(origin) || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)) {
        cb(null, true)
      } else {
        cb(null, false)
      }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['*'],
    credentials: false,
  },
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server

  private readonly logger = new Logger(AppGateway.name)

  afterInit(server: Server) {
    // Log engine.io connection errors to help diagnose CORS/path issues
    server.engine.on('connection_error', (err: any) => {
      this.logger.error(
        `WS connection_error origin=${err?.req?.headers?.origin} code=${err?.code} message=${err?.message}`,
      )
    })
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  @SubscribeMessage('chat_message')
  handleChatMessage(
    @MessageBody() data: ChatMessage,
    @ConnectedSocket() client: Socket,
  ) {
    const payload: Required<ChatMessage> = {
      name: (data?.name ?? 'anonymous').toString().slice(0, 64),
      message: (data?.message ?? '').toString().slice(0, 2000),
      timestamp: Date.now(),
    }
    this.logger.debug(`Message from ${payload.name}: ${payload.message}`)
    this.server.emit('chat_message', payload)
  }
}
