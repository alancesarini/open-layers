import React, { useEffect, useState, useContext } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import { Tile as TileLayer } from 'ol/layer'
import { OSM } from 'ol/source'
import Overlay from 'ol/Overlay'
import * as olProj from 'ol/proj'

import { UsersContext } from '../../context/UsersContext'

import './UsersMap.css'

const UsersMap = ({ mapCenter }) => {
  const [users, setUsers] = useContext(UsersContext)

  useEffect(() => {
    if (users.length) {
      const layers = [
        new TileLayer({
          source: new OSM()
        })
      ]
      const map = new Map({
        layers: layers,
        target: 'map',
        view: new View({
          center: olProj.fromLonLat([mapCenter.lng, mapCenter.lat]),
          zoom: 4
        })
      })

      users.map(user => {
        const marker = new Overlay({
          element: document.getElementById('marker')
        })
        marker.setPosition(olProj.fromLonLat([user.location.lng, user.location.lat]))
        map.addOverlay(marker)
      })
    }
  }, [users])

  return <div id='map' className='users-map'><div id='marker'><img src='https://openlayers.org/en/latest/examples/data/icon.png' alt='marker' /></div></div>
}

export default UsersMap
