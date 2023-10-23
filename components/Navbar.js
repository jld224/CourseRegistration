import { Menu } from 'antd';
import Link from 'next/link';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const Navbar = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
    <Menu mode="horizontal" style={{ border: 'none' }}>
      <Menu.Item key="home" icon={<MailOutlined />}>
        <Link href="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="about" icon={<AppstoreOutlined />}>
        <Link href="/about">About</Link>
      </Menu.Item>
      <Menu.Item key="courses" icon={<SettingOutlined />}>
        <Link href="/courses">Courses</Link>
      </Menu.Item>
      <Menu.Item key="contact" icon={<SettingOutlined />}>
        <Link href="/contact">Contact</Link>
      </Menu.Item>
    </Menu>
  </div>
);

export default Navbar;