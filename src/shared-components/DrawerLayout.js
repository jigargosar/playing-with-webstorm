import React from 'react'
import cn from 'classname'
import PropTypes from 'prop-types'

export function DrawerLayout({
  styleClass = 'bg-near-white sans-serif',
  children,
  header,
  footer,
  sidebar,
  debug = false,
  ...otherProps
}) {
  return (
    <div
      {...otherProps}
      className={cn(
        'flex flex-column vh-100 overflow-hidden ',
        styleClass,
        {
          'bg-black-20': debug,
        },
      )}
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
          className={cn('flex-auto overflow-hidden ', {
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
  )
}

DrawerLayout.propTypes = {
  styleClass: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.node,
  sidebar: PropTypes.node,
  children: PropTypes.node.isRequired,
  debug: PropTypes.bool,
}
