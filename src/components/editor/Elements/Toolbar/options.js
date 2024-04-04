import {
  BoldOutlined,
  UnderlineOutlined,
  FileImageOutlined,
  YoutubeOutlined,
  LinkOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  FontColorsOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

import { CodeIcon } from 'assets/icons';

export const TOOLBAR_OPTIONS = [
  [
    {
      id: 1,
      format: 'fontSize',
      type: 'dropdown',
      options: [
        { text: '14px', value: '14px' },
        { text: '16px', value: '16px' },
        { text: '18px', value: '18px' },
      ],
    },
  ],
  [
    {
      id: 2,
      format: 'bold',
      type: 'mark',
      icon: BoldOutlined,
    },
    {
      id: 11,
      format: 'underline',
      type: 'mark',
      icon: UnderlineOutlined,
    },
    {
      id: 12,
      format: 'unorderedList',
      type: 'block',
      icon: UnorderedListOutlined,
    },
    {
      id: 3,
      format: 'color',
      type: 'color-picker',
      icon: FontColorsOutlined,
    },
  ],
  [
    {
      id: 4,
      format: 'image',
      type: 'embed',
      icon: FileImageOutlined,
    },
    {
      id: 5,
      format: 'link',
      type: 'link',
      icon: LinkOutlined,
    },
    {
      id: 6,
      format: 'video',
      type: 'embed',
      icon: YoutubeOutlined,
    },
  ],
  [
    {
      id: 7,
      format: 'left',
      type: 'block',
      icon: AlignLeftOutlined,
    },
    {
      id: 8,
      format: 'center',
      type: 'block',
      icon: AlignCenterOutlined,
    },
    {
      id: 9,
      format: 'right',
      type: 'block',
      icon: AlignRightOutlined,
    },
  ],
  [
    {
      id: 10,
      format: 'code',
      type: 'mark',
      icon: CodeIcon,
    },
  ],
];
