import React from 'react'
import { DefaultTheme } from 'styled-components'
import { SvgProps } from '../../../components/Svg'
import Text from '../../../components/Text/Text'
import Dropdown from '../../../components/Dropdown/Dropdown'
import Button from '../../../components/Button/Button'
import * as IconModule from '../icons'
import { LangType } from '../types'

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> }
const { LanguageIcon } = Icons

interface Props {
  currentLang: string
  langs: LangType[]
  setLang: (lang: LangType) => void
  theme: DefaultTheme
}

const LangSelector: React.FC<Props> = ({ currentLang, langs, setLang, theme }) => (
  <Dropdown
    position="top-right"
    target={
      <Button variant="text" startIcon={<LanguageIcon color="textSubtle" width="24px" />}>
        <Text color="textSubtle">{currentLang?.toUpperCase()}</Text>
      </Button>
    }
  >
    {langs.map((lang) => (
      <Button
        variant="text"
        scale="sm"
        key={lang.code}
        onClick={() => setLang(lang)}
        // Safari fix
        style={{ minHeight: '32px', height: 'auto', padding: '0 8px', color: theme.colors.text }}
      >
        {lang.language}
      </Button>
    ))}
  </Dropdown>
)

export default React.memo(LangSelector, (prev, next) => prev.currentLang === next.currentLang)
