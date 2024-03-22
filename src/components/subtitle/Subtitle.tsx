import React from 'react'

import Style from './Subtitle.module.css'

type SubtitlePropsType = {
    text: string;
}

export const Subtitle = ({ text }: SubtitlePropsType) => <h2 className={Style['subtitle']}>{text}</h2>