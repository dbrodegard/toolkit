import { Component } from 'react'
import * as bridge from '@arrowhealth/bridge-sdk'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authUser: {},
      authStatus: {},
      patient: {},
    }
  }

  tileClass() {
    let cls = 'tile'
    if (this.state.patient) return this.state.patient.id % 2 ? `${cls} valid` : `${cls} invalid`
    return `${cls} none`
  }

  clickHandle() {
    alert('tile:click')
  }

  renderContent() {
    if (this.state.patient?.id) return <div>{this.state.patient.id}</div>
    return (
      <img
        width="20"
        height="20"
        src="data:image/svg+xml,%3Csvg width='25' height='32' viewBox='0 0 25 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.308 19.6925C6.8701 19.6925 2.46177 15.2841 2.46177 9.84627C2.46177 4.40833 6.87004 0 12.308 0C17.746 0 22.1543 4.40828 22.1543 9.84627C22.1543 15.284 17.746 19.6925 12.308 19.6925ZM12.308 20.9231C19.4583 20.9231 23.692 24.216 24.6034 30.5951C24.7095 31.3366 24.134 32 23.3852 32H1.23091C0.482056 32 -0.0934286 31.3366 0.0126283 30.5951C0.923998 24.2157 5.15748 20.9231 12.308 20.9231Z' fill='white'/%3E%3C/svg%3E%0A"
      ></img>
    )
  }

  componentDidMount() {
    bridge.getAuthUser().then((v) => this.setState({ authUser: v }))
    bridge.getAuthStatus().then((v) => this.setState({ authStatus: v }))
    bridge.getPatient().then((v) => this.setState({ patient: v }))
    bridge.onPatientChanged((v) => this.setState({ patient: v }))
  }

  render() {
    return (
      <div className={this.tileClass()} onClick={this.clickHandle}>
        {this.renderContent()}
      </div>
    )
  }
}

export default App
