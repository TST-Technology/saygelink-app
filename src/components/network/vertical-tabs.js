import React from 'react'
import {
  VerticalTabContainerStyle,
  VerticalTabStyle
} from '../../style-component/network/vertical-tab'

const VerticalTab = ({ tabs, activeTab, onTabClick }) => {
  return (
    <VerticalTabContainerStyle>
      {tabs &&
        tabs.map((tab, index) => {
          return (
            <VerticalTabStyle
              activeTab={activeTab === tab.label}
              key={index}
              onClick={() => {
                onTabClick(tab.label)
              }}
            >
              <img src={tab.imageUrl} />

              <h3>{tab.label}</h3>
            </VerticalTabStyle>
          )
        })}
    </VerticalTabContainerStyle>
  )
}

export default VerticalTab
