import { useState } from "react"
import { useParams } from "react-router-dom"

export default () => {
  const { id } = useParams<{ id: string }>()
  const [space, setSpace] = useState<Space | null>(null)

  return (
    <div>
      <h1>ola mundo - tela de produto</h1>
      <p>id: {id}</p>
    </div>
  )
}