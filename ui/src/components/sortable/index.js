import React from 'react'
import {
  SortableContainer as sortableContainer,
  SortableElement as sortableElement,
  SortableHandle as sortableHandle,
  arrayMove
} from 'react-sortable-hoc'
import { MdDragIndicator } from 'react-icons/md'
import { Icon } from '@chakra-ui/react'

const DragHandle = sortableHandle(() => (
  <div
    className="sortable-handle"
    draggable="true"
  >
    <Icon as={ MdDragIndicator } />
  </div>
))

const SortableItemHOC = sortableElement(props => {
  const {
    className = '',
    children
  } = props
  return (
    <li className={ `sortable-item ${className}` }>
      <div className="sortable-header">
        <DragHandle />
      </div>
      { children }
    </li>
  )
})

const SortableItem = props => {
  const {
    children,
    className,
    i
  } = props
  return (
    <SortableItemHOC
      index={ i }
      i={ i }
      className={ className }
    >
      { children }
    </SortableItemHOC>
  )
}

const SortableContainerHOC = sortableContainer(({ children }) => (
  <ul className="sortable-container">{ children }</ul>
))

const SortableContainer = props => {
  const {
    children,
    onSortEnd
  } = props
  return (
    <SortableContainerHOC
      onSortStart={ () => {
        document.body.classList.add('grabbing')
      } }
      onSortEnd={ ({ oldIndex, newIndex }) => {
        document.body.classList.remove('grabbing')
        onSortEnd(oldIndex, newIndex)
      } }
      helperClass=""
      useDragHandle
      axis="xy"
    >
      { children }
    </SortableContainerHOC>
  )
}

function deleteItem(attr, index) {
  return [
    ...attr.filter((v, i) => {
      return i !== index
    })
  ]
}

function updateItem(attr, index, key, newValue) {
  return [
    ...attr.map((v, i) => {
      if (i === index) {
        v[key] = newValue
      }
      return v
    })
  ]
}

export {
  SortableContainer,
  SortableItem,
  deleteItem,
  updateItem,
  arrayMove
}
