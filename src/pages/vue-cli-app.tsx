import config from '../utils/childAppConfig'
export default function VueCliApp() {
  return (
    <div>
      <micro-app name="vue-cli-app" url={config['vue-cli-app']}></micro-app>
    </div>
  )
}
