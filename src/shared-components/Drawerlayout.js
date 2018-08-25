import React, {Fragment} from 'react'
import cn from 'classname'

export function DrawerLayout({
  className,
  children,
  header,
  footer,
  sidebar,
  debug = false,
}) {
  return (
    <Fragment>
      <div
        className={cn('flex flex-column vh-100 overflow-hidden ', className, {
          'bg-black-20': debug,
        })}
      >
        <div className={cn({ 'bg-black-20 ba bw1 b--blue': debug })}>
          {header}
        </div>
        <div className={'flex-auto flex '}>
          {sidebar && (
            <div
              className={cn('w-30 mw6 overflow-scroll', {
                'bg-black-40 ba bw1 b--pink': debug,
              })}
            >
              {sidebar}
            </div>
          )}
          <div
            className={cn('flex-auto overflow-scroll ', {
              'bg-black-50 ba bw1 b--green': debug,
            })}
          >
            {children}
          </div>
        </div>
        <div className={cn({ 'bg-black-20 ba bw1 b--red': debug })}>
          {footer}
        </div>
      </div>
    </Fragment>
  )
}
