/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

let id = 0

const SwalContext = createContext()
export const SwalProvider = ({ apiRef }) => {
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

  return (
    <SwalContext.Provider value={api}>
      <>{components.map(({ comp, domElement }) => createPortal(comp, domElement))}</>
    </SwalContext.Provider>
  )
}
