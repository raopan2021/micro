import config from '../utils/childAppConfig'
export default function ViteVueApp() {
  return (
    <div>
      <micro-app name="vite-vue-app" url={config['vite-vue-app']} iframe></micro-app>
    </div>
  )
}
