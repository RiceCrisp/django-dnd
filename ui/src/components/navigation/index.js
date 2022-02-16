import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Avatar,
  Button,
  chakra,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer
} from '@chakra-ui/react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { createPortal } from 'react-dom'

export function Navigation(props) {
  const {
    status,
    firstName,
    lastName
  } = useSelector(state => state.currentUser)

  return (
    <Flex
      as="nav"
      alignItems="center"
      p="4"
      bg="white"
      borderBottom="1"
    >
      <Link
        as={ RouterLink }
        to={ '/' }
        fontSize="xl"
      >
        Home
      </Link>
      <Spacer />
      <div id="navigation-portal" />
      { status === 'LOGGED_IN' ? (
        <>
          <Link
            as={ RouterLink }
            to={ '/campaigns/' }
            mr="5"
          >
            Campaigns
          </Link>
          <Menu>
            <MenuButton
              as={ Button }
              variant="link"
              rightIcon={ <Icon as={ MdKeyboardArrowDown } /> }
              p="2"
              h="auto"
            >
              <Avatar
                size="sm"
                name={ `${firstName} ${lastName}` }
              />
            </MenuButton>
            <MenuList>
              <MenuItem
                as={ RouterLink }
                to={ '/profile/' }
              >
                Profile
              </MenuItem>
              <MenuItem
                as={ RouterLink }
                to={ '/logout/' }
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          <Button
            as={ RouterLink }
            to={ '/login/' }
            colorScheme="blue"
            variant="outline"
          >
            Login
          </Button>
          <Button
            as={ RouterLink }
            to={ '/sign-up/' }
            colorScheme="blue"
            ml="4"
          >
            Sign Up
          </Button>
        </>
      ) }
    </Flex>
  )
}

export function NavigationStatus({
  status,
  ...props
}) {
  if (status) {
    return createPortal(
      <chakra.div
        mr="5"
        { ...props }
      >
        <chakra.span opacity="0.6">
          { status }
        </chakra.span>
      </chakra.div>,
      document.querySelector('#navigation-portal')
    )
  }
  return null
}
