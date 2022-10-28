import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

let id = 0

export const SwalPortal = ({ apiRef }) => {
  const [components, setComponents] = useState([])

  useEffect(() => {
    apiRef.current = {
      render: (comp, domElement) => {
        let compId = id
        id += 1

        setComponents((curr) => {
          return [...curr, { id: compId, comp, domElement }]
        })
        return {
          unmount: () => {
            setComponents((curr) => curr.filter((comp) => comp.id !== compId))
          },
        }
      },
    }
  }, [apiRef])

  return <>{components.map(({ comp, domElement }) => createPortal(comp, domElement))}</>
}
