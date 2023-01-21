export type FaviconColor = 'primary' | 'success' | 'warning' | 'info' | 'black'

export type FaviconProps = {
  color: FaviconColor
}

export const Favicon: React.FC<FaviconProps> = ({color = 'warning'}) => {
  const wrapperStyles = getColor(color)


  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      width: '100%',
      height: '100%',
      margin: 0,
      borderRadius: '100%',
      ...wrapperStyles
    }}>
      <h1 style={{
        fontSize: '18px',
        lineHeight: '32px',
        margin: 0,
        fontWeight: 900,
      }}
      >
        C
      </h1>
    </div>
  )
}

function getColor(color: FaviconColor) {
  switch (color) {
    case 'primary':
      return {
        color: 'white',
        backgroundImage: 'linear-gradient(to right, rgb(192, 132, 252), rgb(219, 39, 119))',
      }
    case 'success':
      return {
        color: 'white',
        backgroundImage: 'linear-gradient(to right, rgb(74, 222, 128), rgb(8, 145, 178))',
      }
    case 'warning':
      return {
        color: 'white',
        backgroundImage: 'linear-gradient(to right, rgb(250, 204, 21), rgb(217, 119, 6))',
      }
    case 'info':
      return {
        color: 'white',
        backgroundImage: 'linear-gradient(to right, rgb(59, 130, 246), rgb(79, 70, 229))',
      }
    default:
      return {
        color: 'white',
        backgroundImage: 'linear-gradient(to right, rgb(250, 204, 21), rgb(217, 119, 6))',
      }
  }
}