
import { useState } from 'react'

function SearchBar({
    value,
    onChange,
    label = 'Sök recept',
    activeScope,
    onScopeChange,
    placeholder = 'Sök på recept, ingrediens eller känsla',
    compact = false,
    buttonLabel = 'Sök',
    scopes = [],
    helperText = '',
}) {

    const activeScopeConfig = scopes.find((scope) => scope.label === activeScope)
    const resolvedPlaceholder = activeScopeConfig?.placeholder ?? placeholder

    return (
        <div className={`search-bar${compact ? ' search-bar--compact' : ''}`}>
            {scopes.length > 0 ? (
                <div className="search-bar__scopes" aria-label="Val för sökning">
                    {scopes.map((scope) => (
                        <button
                            key={scope.label}
                            className={`search-bar__scope${activeScope === scope.label ? ' is-active' : ''}`}
                            type="button"
                            onClick={() => onScopeChange(scope.label)}
                        >
                            {scope.label}
                        </button>
                    ))}
                </div>
            ) : null}

            <div className="search-bar__row">
                <label className="search-bar__field">
                    <span className="search-bar__label">{label}</span>
                    <div className="search-bar__input-shell">
                        <span className="search-bar__input-icon" aria-hidden="true">
                            ?
                        </span>
                        <input
                            className="search-bar__input"
                            type="search"
                            value={value}
                            onChange={(event) => onChange(event.target.value)}
                            placeholder={resolvedPlaceholder}
                        />
                    </div>
                </label>

                <button className="search-bar__button" type="button">
                    {buttonLabel}
                </button>
            </div>

            {helperText ? <p className="search-bar__hint">{helperText}</p> : null}
        </div>
    )
}

export default SearchBar
