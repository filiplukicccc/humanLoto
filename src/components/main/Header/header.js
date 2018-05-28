import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import { Redirect, history } from 'kit/lib/routing';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  changeRoute = (url) => {
    history.push(url);
  }
  render() {
    // const { activeItem } = this.state
    return (
      <div>
        <Menu>
        <Menu.Item
            // name='about_us'
            // active={activeItem === 'about_us'}
            onClick={() => this.changeRoute('/')}
          >
            Pocetna
        </Menu.Item>
          <Menu.Item
            // name='about_us'
            // active={activeItem === 'about_us'}
            onClick={() => this.changeRoute('/o_nama')}
          >
            O Nama
        </Menu.Item>

          <Menu.Item
            // name='extraction'
            // active={activeItem === 'extraction'}
            onClick={() => this.changeRoute('/izvlacenja')}
          >
            Izvlacenja
        </Menu.Item>
        <Menu.Item
            // name='send_sms'
            // active={activeItem === 'send_sms'}
            onClick={() => this.changeRoute("/posalji_sms")}
          >
            Posalji SMS
        </Menu.Item>
          <Menu.Item
            // name='send_sms'
            // active={activeItem === 'send_sms'}
            onClick={() => this.changeRoute("/kreiraj_nalog")}
          >
            Kreiraj nalog
        </Menu.Item>
        <Menu.Item
            // name='send_sms'
            // active={activeItem === 'send_sms'}
            onClick={() => this.changeRoute("/nagrada")}
          >
            Nagrada
        </Menu.Item>
        <Menu.Item
            // name='send_sms'
            // active={activeItem === 'send_sms'}
            onClick={() => this.changeRoute("/dobitnici")}
          >
            Dobitnici
        </Menu.Item>
        </Menu>
      </div>
    )
  }
}
export default Header;