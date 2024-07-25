import config from '../utils/childAppConfig'
export default function SubReactApp() {
  return (
    <div>
      <micro-app name="sub-react-app" url={config['sub-react-app']}></micro-app>
    </div>
  )
}
