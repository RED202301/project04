import React, { MouseEventHandler, TouchEventHandler } from "react";
import{ TwStyle } from "twin.macro";


interface PropsWithChildrenAndCSS extends React.PropsWithChildren {
  css?: TwStyle[];
}

interface StickyNoteProps extends PropsWithChildrenAndCSS {
  zIndex: number;
  onMouseDown: MouseEventHandler;
  onTouchStart: TouchEventHandler;
}

interface PolaroidProps extends StickyNoteProps{
  imgUrl: string;
}

export type { PropsWithChildrenAndCSS, StickyNoteProps, PolaroidProps }