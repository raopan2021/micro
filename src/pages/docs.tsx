import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useModel } from 'umi'

export default function DocsPage() {
  const { counter, increment, decrement } = useModel('count')
  return (
    <div>
      <p>This is umi docs.</p>
      <div>
        <Button danger type="primary" icon={<MinusOutlined />} onClick={decrement} />
        <span className="mx-3">{counter}</span>
        <Button type="primary" icon={<PlusOutlined />} onClick={increment} />
      </div>
    </div>
  )
}
