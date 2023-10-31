interface MobileSizeType {
  clientWidth: number;
  clientHeight: number;
}

enum MessageType {
  Sticker,
  Text,
  Photo,
  Video
}

interface MessageGetType {
  id: number
  senderId: number
  receiverId: number
  senderName: string
  receiverName: string

  top: number
  left: number
  rotate: number
  zindex: number

  type: MessageType

  content?: string
  bgcolor: number

  sourceFileUrl: string
  thumbnailFileUrl: string
  createdAt: string
}

interface MessagePostType {
  receiverId: number
  top: number
  left: number
  rotate: number
  zindex: number

  type: number

  content?: string
  bgcolor?: number
  sourceFile?: File
  thumbnailFile?: File
}


export { MessageType }
export type { MobileSizeType, MessageGetType, MessagePostType };