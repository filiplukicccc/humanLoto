import React, { Component } from 'react';
import MenuItem, { Menu } from 'semantic-ui-react'
import { Redirect, history } from 'kit/lib/routing';
import LoginUser from '../login/LoginUser'
import LogOut from '../login/LogOut'
import { connect } from 'react-redux';
import TokenHoc from '../../hoc/TokenHoc';


@connect(state => ({ token: state.token }))
@TokenHoc
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
    console.log('token', this.props.token)
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
            onClick={() => this.changeRoute("/kome_nagrada")}
          >
            Kome Ide Nagrada
        </Menu.Item>
          <Menu.Item
            // name='send_sms'
            // active={activeItem === 'send_sms'}
            onClick={() => this.changeRoute("/dobitnici")}
          >
            Dobitnici
        </Menu.Item>
          <Menu.Item>
            {this.props.token.token ?  <LogOut /> : <LoginUser />}
          </Menu.Item>
        </Menu>

      </div>
    )
  }
}
export default Header;