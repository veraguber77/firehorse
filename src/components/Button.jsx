import { Link } from 'react-router'
import './Button.css'

const COLORS = ['red', 'orange', 'lightBlue', 'darkBlue', 'cinder', 'cream']

/**
 * Button — Figma "Button — Flat (Ember rise)" (414:1895). Flat fill, 8px radius, no outline
 * or shadow; on hover a glow rises from the bottom edge (see Button.css).
 *
 *   <Button color="red" href="#submit">Submit an entry</Button>
 *   <Button color="cinder" iconEnd={<ArrowDownIcon />}>View categories</Button>
 *   <Button variant="text" to="/faq">See all questions</Button>
 *
 * - `color`: red | orange | lightBlue | darkBlue | cinder | cream (solid only, default red).
 *   Primitive colours, so a button looks the same in both themes.
 * - `variant`: solid (default) | text (an underlined link-style button).
 * - `to` renders a react-router <Link> (internal routes), `href` a plain <a> (#anchors,
 *   external links), neither a <button type="button">. Native attributes pass through.
 * - `icon` / `iconEnd`: optional node before / after the label. Draw it with currentColor so it
 *   follows the label (e.g. <ArrowDownIcon /> rather than a "↓" character, which comes from
 *   another font: thin, and lower than the capitals).
 * - `disabled` also works on links: they get aria-disabled and ignore clicks.
 */
/**
 * Down arrow drawn to match the label's capitals: their height (the tip overshoots a little, as round letters do), a bold
 * stem's weight, and their vertical position (see .btn__arrow in Button.css).
 */
export function ArrowDownIcon() {
  return (
    <svg className="btn__arrow" width="10" height="10.5" viewBox="0 0 10 10.5" fill="none"
      stroke="currentColor" strokeWidth="2" focusable="false">
      <path d="M5 0v9.6M1 5.09l4 4 4-4" />
    </svg>
  )
}

export default function Button({
  color = 'red',
  variant = 'solid',
  to,
  href,
  icon,
  iconEnd,
  disabled = false,
  className,
  children,
  onClick,
  type,
  ...rest
}) {
  const classes = [
    'btn',
    `btn--${variant === 'text' ? 'text' : 'solid'}`,
    variant !== 'text' && `btn--${COLORS.includes(color) ? color : 'red'}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {icon && (
        <span className="btn__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="btn__label">{children}</span>
      {iconEnd && (
        <span className="btn__icon" aria-hidden="true">
          {iconEnd}
        </span>
      )}
    </>
  )

  if (to != null || href != null) {
    const linkProps = {
      ...rest,
      className: classes,
      'aria-disabled': disabled ? 'true' : rest['aria-disabled'],
      onClick: disabled
        ? (event) => event.preventDefault()
        : onClick,
    }
    return to != null ? (
      <Link to={to} {...linkProps}>
        {content}
      </Link>
    ) : (
      <a href={href} {...linkProps}>
        {content}
      </a>
    )
  }

  return (
    <button type={type ?? 'button'} className={classes} disabled={disabled} onClick={onClick} {...rest}>
      {content}
    </button>
  )
}
