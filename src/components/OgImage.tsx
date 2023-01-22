export type OgImageColor = 'primary' | 'success' | 'info' | 'black'

export type OgImageProps = {
  title: string
  category: string
  color: OgImageColor
}

export const OgImage: React.FC<OgImageProps> = ({title, category, color = 'black'}) => {
  const headingStyles = getColor(color)

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      width: '100%', 
      height: '100%', 
      padding: '54px 74px',
      backgroundImage: `url(${dotGrid})`,
      backgroundSize: '100% 100%'
    }}>
      {category && (
        <h2 style={{
          fontSize: '48px',
          color: 'rgb(15, 23, 42)'  
        }}>
          {category}
        </h2>
      )}
      <h1 style={{
        fontSize: '84px',
        fontWeight: 900,
        ...headingStyles
      }}
      >
        {title}
      </h1>
      <h2 style={{ 
        fontSize: '64px',
        marginTop: 'auto', 
        color: 'transparent',
        backgroundImage: 'linear-gradient(to right, rgb(250, 204, 21), rgb(217, 119, 6))',
        backgroundClip: 'text'
      }} 
      >
        Chris D. MacRae
      </h2>
    </div>
  )
}

function getColor(color: OgImageColor) {
  switch (color) {
    case 'primary':
      return {
        color: 'transparent',
        backgroundImage: 'linear-gradient(to right, rgb(192, 132, 252), rgb(219, 39, 119))',
        backgroundClip: 'text'
      }
    case 'success':
      return {
        color: 'transparent',
        backgroundImage: 'linear-gradient(to right, rgb(74, 222, 128), rgb(8, 145, 178))',
        backgroundClip: 'text'
      }
    case 'info':
      return {
        color: 'transparent',
        backgroundImage: 'linear-gradient(to right, rgb(59, 130, 246), rgb(79, 70, 229))',
        backgroundClip: 'text'
      }
    default:
      return {
        color: 'transparent',
        backgroundImage: 'linear-gradient(to right, rgb(250, 204, 21), rgb(217, 119, 6))',
        backgroundClip: 'text'
      }
  }
}

const dotGrid = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAJ2CAYAAABPQHtcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAFfqSURBVHgB7d0xduM4FyZQgJR7/zurCiqobUwwwdgiOQRAmVS3jT+Cn4L7mbIA6gY8L3wHAPP/+b//b0siIiIiIiIiIiIvmimJiIiIiIiIiIi8cDSwRERERERERETkpaOBJSIiIiIiIiIiLx0NLBEREREREREReeloYImIiIiIiIiIyEtHA0tERERERERERF46GlgiIiIiIiIiIvLS0cASEREREREREZGXjgaWiIiIiIiIiIi8dDSwRERERERERETkpaOBJSIiIiIiIiIiLx0NLBEREREREREReeloYImIiIiIiIiIyEtHA0tERERERERERF46GlgiIiIiIiIiIvLS0cASEREREREREZGXjgaWiIiIiIiIiIi8dDSwRERERERERETkpaOBJSIiIiIiIiIiLx0NLBEREREREREReeloYImIiIiIiIiIyEtHA0tERERERERERF46GlgiIiIiIiIiIvLS0cASEREREREREZGXjgaWiIiIiIiIiIi8dDSwRERERERERETkpaOBJSIiIiIiIiIiLx0NLBEREREREREReeloYImIiIiIiIiIyEtHA0tERERERERERF46GlgiIiIiIiIiIvLSCW9g3W5Tmqdcx9v+95k6bPfLVx1t2+ctnud5nud5nud5nud5/gd9YMIbWNuaWqFSKcejILkVKx8F21q9tryL7ap4nud5nud5nud5nuf5H/GBid9CWIqQW2HODt9x7zHN9drpLvJV8TzP8zzP8zzP8zzP8z/iA5P/z//9f6GPcZumNO2f9/v9creUb2sFyufdMp2O354fmud5nud5nud5nud5nv8JH5HwFVjrXoVlXer4qcNX8ihObsNuR5DneZ7neZ7neZ7neZ4f5wMTvwJrntO6N7DWp6coldku3y1l1O0I8jzP8zzP8zzP8zzP80N9ROIPcS9rsLbtGG+fd//++b1/frVpbqXqdQR5nud5nud5nud5nuf5gT4w8Ye4bzndbrc6vJ5y/2zqlXqn4vM8z/M8z/M8z/M8z/MDfWDitxDeprQuW1pLt2//y5filAers/1fLkUtK7Wm3H6ov/M8z/M8z/M8z/M8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Psu01etzv2Vuhep1BHme53me53me53me5/mBPjDhDaz1vtZzwkrOghw7LPNRsFav1DsVn+d5nud5nud5nud5nh/oAxPewCpPsKxfrMDai/c5zfVK3Y4gz/M8z/M8z/M8z/M8P84H5iXeQlhq8dUZWLVA+bxbpr09mTzP8zzP8zzP8zzP8/xYH5H4LYTbku73ex0/dfhKHsXJbdjtCPI8z/M8z/M8z/M8z/PjfGDCV2D9c3trTazjIPeWUpnt8t1SRt2OIM/zPM/zPM/zPM/zPD/URyR8BdbH8p62rRXh2uH7++f3/vnVprmVqtcR5Hme53me53me53me5wf6wIQ3sOY812KVXE+5f8pWr9Q7FZ/neZ7neZ7neZ7neZ4f6AMTf4j7bU7rsqS1Fm27FKkVsc72f7n8XlZqTbn9kHie53me53me53me5/kf84EJb2CVArztTaz3f72FMKdzwdojZf7dnkye53me53me53me53l+vI9I+BbCvHf4lrUd4H6W5DE65rk1unp7Mnme53me53me53me5/mBPjDhK7Debre07Q2s+/rftxBux+iRMu+dis/zPM/zPM/zPM/zPM+P9RGJfwvh/ePLFVjl+txvmVuheh1Bnud5nud5nud5nud5fqAPTHgD622+pXluj3EW5NhhmY+CtXql3qn4PM/zPM/zPM/zPM/z/EAfmPAGVunwrV+twNqL9znN9UrdjiDP8zzP8zzP8zzP8zw/zgcm/Ays2zzXM7CW7foYpXxbK1A+75Zpb08mz/M8z/M8z/M8z/M8P9ZHJHwF1rLe9+bVFyuwSh7FyW3Y7QjyPM/zPM/zPM/zPM/z43xg4t9COM91Ndr7fbncLZXZLt8tZdTtCPI8z/M8z/M8z/M8z/NDfUTiV2BtS/pYWvPqLNOW/v75vX9+tWlupep1BHme53me53me53me5/mBPjDhDaw5z2kqS7BSKVo+7uZntNUr9U7F53me53me53me53me5wf6wIRvIZymvRh7p2+tRdsuRWpFrLP9Xy6/7y5V//id53me53me53me53me/xEfmPAG1ly6fPvnvq6Xu6VM54K1R8r8uz2ZPM/zPM/zPM/zPM/z/HgfkfAthHme0rq1UpwleYyOeW6dvt6eTJ7neZ7neZ7neZ7neX6gD8xLrMAq1VrW62OU8rUi5cvdMu+dis/zPM/zPM/z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mOfW6evtyeR5nud5nud5nud5nucH+sC8xFsIyzbCj/tyuVvK14qUL3fLvHcqPs/zPM/zPM/zPM/zPD/WRyT+EPf9CZZlreOzTFu9Pvdb5laoXkeQ53me53me53me53meH+gDE97AWu9rPSes5CzIscMyHwVr9Uq9U/F5nud5nud5nud5nuf5gT4w4Q2s8gTL+sUKrL14n9Ncr9TtCPI8z/M8z/M8z/M8z/PjfGBe4i2EpRZfnYFVC5TPu2Xa25PJ8zzP8zzP8zzP8zzPj/URid9CuC3pfr/X8VOHr+RRnNyG3Y4gz/M8z/M8z/M8z/M8P84HJnwF1j+3t9bEOg5ybymV2S7fLWXU7QjyPM/zPM/zPM/zPM/zQ31EwldgfSzvadtaEa4dvr9/fu+fX22aW6l6HUGe53me53me53me53l+oA9MeANrznMtVsn1lPunbPVKvVPxeZ7neZ7neZ7neZ7n+YE+MPGHuN/mtC5LWmvRtkuRWhHrbP+Xy+9lpdaU2w+J53me53me53me53me/zEfmPAGVinA297Eev/XWwhzOhesPVLm3+3J5Hme53me53me53me58f7iIRvIcx7h29Z2wHuZ0keo2OeW6OrtyeT53me53me53me53meH+gDE74C6+12S9vewLqv/30L4XaMHinz3qn4PM/zPM/zPM/zPM/z/Fgfkfi3EN4/vlyBVa7P/Za5FarXEeR5nud5nud5nud5nucH+sCEN7De5lua5/YYZ0GOHZb5KFirV+qdis/zPM/zPM/zPM/zPM8P9IEJ30IoIiIiIiIiIiLSS/gKLBERERERERERkV40sERERERERERE5KWjgSUiIiIiIiIiIi8dDSwREREREREREXnpaGCJiIiIiIiIiMhLRwNLREREREREREReOhpYIiIiIiIiIiLy0tHAEhERERERERGRl44GloiIiIiIiIiIvHQ0sERERERERERE5KWjgSUiIiIiIiIiIi8dDSwREREREREREXnpaGCJiIiIiIiIiMhLRwNLREREREREREReOhpYIiIiIiIiIiLy0tHAEhERERERERGRl44GloiIiIiIiIiIvHQ0sERERERERERE5KWjgSUiIiIiIiIiIi8dDSwREREREREREXnpaGCJiIiIiIiIiMhLRwNLREREREREREReOhpYIiIiIiIiIiLy0tHAEhERERERERGRl44GloiIiIiIiIiIvHQ0sERERERERERE5KWjgSUiIiIiIiIiIi8dDSwREREREREREXnpaGCJiIiIiIiIiMhLRwNLREREREREREReOhpYIiIiIiIiIiLy0vn/kBya6qWl3fgAAAAASUVORK5CYII=`