enum Type {
  Sticker,
  Text,
  Photo,
  Video,
}

interface SecretMessage_Position {
  top: number,
  left: number,
  rotate: number,
  zindex: number,
}


interface Res_SecretMessage extends SecretMessage_Position {
  id: number,
  senderId: number,
  receiverId: number,
  senderName: string,
  receiverName: string,

  type: Type,

  content: string,
  bgcolor: number,

  sourceFileUrl: string,
  thumbnailFileUrl: string,
  createdAt: string,
}

interface Post_Req_SecretMessages extends SecretMessage_Position {
  receiverId: number,

  type: number,

  content?: string,
  bgcolor?: number,
  sourceFile?: File,
  thumbnailFile?: File,
}

interface Put_Req_SecretMessages extends SecretMessage_Position {
  id: number,
}

export type { SecretMessage_Position, Res_SecretMessage, Post_Req_SecretMessages, Put_Req_SecretMessages }