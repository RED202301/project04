import { PlaceableType } from "../types/types"

const Ratio = {
  fontSize: 0.03,
  padding: 0.02,
  [PlaceableType.Sticker]: {width: 0.15, height:0.15},
  [PlaceableType.StickyNote]: {width: 0.3, height:0.3} as const,
  [PlaceableType.PolaroidPhoto]: {width: 0.3, height:0} as const,
  [PlaceableType.PolaroidVideo]: {width: 0.3, height:0} as const,
  modal: {width: 0.9, height: 0.9, padding: 0.05},
} as const


export default Ratio