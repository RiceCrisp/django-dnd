import { extendTheme, theme as baseTheme } from '@chakra-ui/react'
import { getColor } from '@chakra-ui/theme-tools'

const borderColor = getColor(baseTheme, 'gray.200', 'gray')

const theme = extendTheme({
  // fonts: {
  //   body: 'Work Sans',
  //   heading: 'Work Sans'
  // },
  borders: {
    1: `1px solid ${borderColor}`
  },
  space: {
    1: '0.125rem',
    2: '0.25rem',
    3: '0.5rem',
    4: '1rem',
    5: '2rem',
    6: '4rem',
    7: '8rem'
  },
  sizes: {
    ...baseTheme.sizes,
    icon: {
      sm: '1rem',
      md: '2rem',
      lg: '4rem'
    },
    container: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    }
  },
  fontSizes: {
    small: '0.75rem',
    p: '1rem',
    h6: '1rem',
    h5: '1.25rem',
    h4: '1.5rem',
    h3: '1.75rem',
    h2: '2rem',
    h1: '3rem',
    hero: '4rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
    none: 'none'
  },
  radii: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px'
  },
  styles: {
    global: {
      'html, body': {
        bg: 'gray.50'
      },
      h1: {
        fontSize: 'h1'
      },
      h2: {
        fontSize: 'h2'
      },
      h3: {
        fontSize: 'h3'
      },
      h4: {
        fontSize: 'h4'
      },
      h5: {
        fontSize: 'h5'
      },
      h6: {
        fontSize: 'h6'
      },
      fieldset: {
        border: '1',
        p: '4',
        borderRadius: 'md'
      },
      legend: {
        fontSize: '0.9rem',
        fontWeight: 'bold',
        opacity: '0.6',
        textTransform: 'uppercase',
        letterSpacing: '0.025rem'
      }
    }
  },
  layerStyles: {
    card: {
      bg: 'white',
      p: '8',
      boxShadow: 'md',
      borderRadius: 'md'
    }
  },
  components: {
    Alert: {
      parts: ['container'],
      baseStyle: {
        container: {
          borderRadius: 'sm'
        }
      }
    },
    Container: {
      baseStyle: {
        py: 10
      }
    },
    Heading: {
      sizes: null
    },
    Menu: {
      parts: ['item'],
      baseStyle: {
        item: {
          _hover: {
            bg: 'gray.100',
            textDecoration: 'none'
          },
          _focus: {
            bg: 'gray.100',
            boxShadow: 'none'
          }
        }
      }
    },
    Modal: {
      parts: ['header', 'body', 'footer'],
      baseStyle: {
        header: {
          pt: '5',
          px: '5',
          pb: '2',
          fontSize: 'h4'
        },
        body: {
          p: '5'
        },
        footer: {
          p: '5'
        }
      }
    }
  }
})

export default theme
