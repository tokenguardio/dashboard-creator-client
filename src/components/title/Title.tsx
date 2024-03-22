import React from 'react'

import Style from './Title.module.css'

type TitlePropsType = {
    text: string;
}

export const Title = ({ text }: TitlePropsType) => <h1 className={Style['title']}>{text}</h1>