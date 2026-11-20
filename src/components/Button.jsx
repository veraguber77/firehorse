import { Link } from 'react-router'
import './Button.css'

const COLORS = ['red', 'orange', 'lightBlue', 'darkBlue', 'cinder', 'cream']

/**
 * Button — Figma "Button — Flat (Ember rise)" (414:1895). Flat fill, 8px radius, no outline
 * or shadow; on hover a glow rises from the bottom edge (see Button.css).
 *
 *   <Button color="red" href="#submit">Submit an entry</Button>
 *   <Button color="cinder" onClick={...}>View categories ↓</Button>
 *   <Button variant="text" to="/faq">See all questions</Button>
 *
 * - `color`: red | orange | lightBlue | darkBlue | cinder | cream (solid only, default red).
 *   Primitive colours, so a button looks the same in both themes.
 * - `variant`: solid (default) | text (an underlined link-style button).
 * - `to` renders a react-router <Link> (internal routes), `href` a plain <a> (#anchors,
 *   external links), neither a <button type="button">. Native attributes pass through.
 * - `icon`: optional node before the label. Draw it with currentColor so it follows the label.
 * - `disabled` also works on links: they get aria-disabled and ignore clicks.
 */
export default function Button({
  color = 'red',
  variant = 'solid',
  to,
  href,
  icon,
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
