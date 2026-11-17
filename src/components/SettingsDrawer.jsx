import { useEffect, useRef } from 'react'
import './SettingsDrawer.css'
import sunIcon from '../assets/sun.svg'
import moonIcon from '../assets/moon.svg'
import checkIcon from '../assets/check.svg'

const options = [
  { value: 'light', label: 'Light', icon: sunIcon, iconSize: 32 },
  { value: 'dark', label: 'Dark', icon: moonIcon, iconSize: 30 },
]

/**
 * Settings drawer — Figma component "Settings drawer" (257:856).
 * Full-height panel that opens from the right with the light/dark toggle.
 * Built on <dialog> so focus trapping, Esc to close and focus return are native.
 */
export default function SettingsDrawer({ open, onClose, theme, onThemeChange }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="drawer"
      aria-labelledby="settings-drawer-title"
      onClose={onClose}
      onClick={(event) => {
        // A click on the dialog element itself is a click on the backdrop.
        if (event.target === dialogRef.current) onClose()
      }}
    >
      <div className="drawer__panel">
        <div className="drawer__header">
          <h2 id="settings-drawer-title" className="drawer__title">
            Settings
          </h2>
          <button type="button" className="drawer__close" aria-label="Close settings" onClick={onClose}>
            <span className="drawer__close-icon" aria-hidden="true" />
          </button>
        </div>

        <div className="drawer__divider" />

        <fieldset className="drawer__section">
          <legend className="drawer__label">Appearance</legend>
          <div className="drawer__tiles">
            {options.map((option) => (
              <label key={option.value} className="drawer__tile">
                <input
                  className="drawer__radio"
                  type="radio"
                  name="theme"
                  value={option.value}
                  checked={theme === option.value}
                  onChange={() => onThemeChange(option.value)}
                />
                <span className={`drawer__swatch drawer__swatch--${option.value}`}>
                  <img src={option.icon} width={option.iconSize} height={option.iconSize} alt="" />
                  <span className="drawer__check">
                    <img src={checkIcon} width="12" height="12" alt="" />
                  </span>
                </span>
                <span className="drawer__tile-label">{option.label}</span>
              </label>
            ))}
          </div>
          <p className="drawer__hint">We'll remember your choice.</p>
        </fieldset>
      </div>
    </dialog>
  )
}
