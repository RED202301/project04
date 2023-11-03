enum Type {
  Sticker,
  Text,
  Photo,
  Video,
}

interface Message_Position {
  top: number,
  left: number,
  rotate: number,
  zindex: number,
}


interface Res_Message extends Message_Position {
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

interface Post_Req_Messages extends Message_Position {
  receiverId: number,

  type: number,

  content?: string,
  bgcolor?: number,
  sourceFile?: File,
  thumbnailFile?: File,
}

interface Put_Req_Messages extends Message_Position {
  id: number,
}

export type { Message_Position, Res_Message, Post_Req_Messages, Put_Req_Messages }