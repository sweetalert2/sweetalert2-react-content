import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

let id = 0

export const SwalPortal = ({ apiRef }) => {
  const [components, setComponents] = useState([])

  const api = useMemo(
    () => ({
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
    }),
    []
  )

  useEffect(() => {
    apiRef.current = api
  }, [apiRef])

  return <>{components.map(({ comp, domElement }) => createPortal(comp, domElement))}</>
}
