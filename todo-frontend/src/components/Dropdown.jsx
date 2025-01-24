import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useTheme } from "./ThemeProvider";
import style from './Dropdown.module.css';

const items = [
  {
    key: 'sub1',
    label: 'Team',
    children: [
      {
        key: '1',
        label: 'Option 1',
      },
      {
        key: '2',
        label: 'Option 2',
      },
      {
        key: '3',
        label: 'Option 3',
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Project',
    children:  [
        {
          key: '4',
          label: 'All projects',
        },
        {
          key: '5',
          label: 'Design Systems',
        },
        {
          key: '6',
          label: 'User flow',
        },
      ],
  },
  {
    key: 'sub3',
    label: 'Task',
    children:  [
        {
          key: '7',
          label: 'All task(11)',
        },
        {
          key: '8',
          label: 'Todo (2)',
        },
        {
          key: '9',
          label: 'In progress (4)',
        },
      ],
  },
  {
    key: 'sub4',
    label: 'Reminder',
    children:  [
        {
          key: '10',
          label: 'Option 1',
        },
        {
          key: '11',
          label: 'Option 2',
        },
        {
          key: '12',
          label: 'Option 3',
        },
      ],
  },
  {
    key: 'sub5',
    label: 'Messengers',
    children:  [
        {
          key: '13',
          label: 'Option 1',
        },
        {
          key: '14',
          label: 'Option 2',
        },
        {
          key: '15',
          label: 'Option 3',
        },
      ],
  },
];

const dropdown = () => {
  const { theme } = useTheme();
  const onClick = (e) => {
    console.log('click ', e);
  };

  return (
<Menu
  onClick={onClick}
  style={{
    width: '100%',
    maxHeight: '100%', 
    overflowY: 'auto', 
    background: "",
  }}
  className={theme === 'dark' ? style.darkTheme : ''}
  defaultSelectedKeys={['1']}
  defaultOpenKeys={['sub3']}
  mode="inline"
  items={items}
/>

  );
};

export default dropdown;