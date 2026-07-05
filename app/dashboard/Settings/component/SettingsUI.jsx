"use client"

import { FiEdit2 } from "react-icons/fi"

export function SettingsPanel({ children }) {
    return (
        <div className="flex-1 min-w-0 bg-(--main-color) rounded-r-2xl border border-(--text-color)/10 shadow-sm overflow-hidden flex flex-col">
            {children}
        </div>
    )
}

export function SettingsSectionHeader({ title, description, action }) {
    return (
        <div className="flex items-start justify-between gap-4 px-6 md:px-8 pt-7 pb-2">
            <div>
                <h2 className="text-xl font-semibold text-(--text-color)">{title}</h2>
                {description && (
                    <p className="text-sm text-(--p-color) mt-1">{description}</p>
                )}
            </div>
            {action}
        </div>
    )
}

export function SettingsRow({ label, description, children, isLast = false }) {
    return (
        <div
            className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-6 md:px-8 py-5
                ${isLast ? "" : "border-b border-(--text-color)/8"}`}
        >
            <div className="min-w-0 lg:max-w-[45%]">
                <p className="text-sm font-semibold text-(--text-color)">{label}</p>
                {description && (
                    <p className="text-sm text-(--p-color) mt-1 leading-relaxed">{description}</p>
                )}
            </div>
            <div className="flex items-center justify-start lg:justify-end gap-3 w-full lg:w-auto lg:min-w-[280px] lg:max-w-[420px]">
                {children}
            </div>
        </div>
    )
}

export function SettingsValue({ children }) {
    return (
        <span className="text-sm font-medium text-(--text-color) text-left lg:text-right break-all">
            {children}
        </span>
    )
}

export function SettingsInput({
    type = "text",
    name,
    value,
    onChange,
    className = "",
    ...props
}) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full h-10 px-3 rounded-lg border border-(--text-color)/15 bg-(--bg-color)/50 text-(--text-color) text-sm outline-none focus:border-(--second-color) focus:ring-2 focus:ring-(--second-color)/15 transition-all ${className}`}
            {...props}
        />
    )
}

export function SettingsSelect({ name, value, onChange, children }) {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full h-10 px-3 rounded-lg border border-(--text-color)/15 bg-(--bg-color)/50 text-(--text-color) text-sm outline-none focus:border-(--second-color) focus:ring-2 focus:ring-(--second-color)/15 transition-all cursor-pointer"
        >
            {children}
        </select>
    )
}

export function SettingsOutlineButton({ children, onClick, type = "button", icon: Icon = FiEdit2 }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-(--text-color)/15 bg-transparent text-sm font-medium text-(--text-color) hover:bg-(--bg-color)/60 hover:border-(--text-color)/25 transition-all cursor-pointer whitespace-nowrap"
        >
            {Icon && <Icon size={15} className="text-(--p-color)" />}
            {children}
        </button>
    )
}

export function SettingsPrimaryButton({ children, onClick, type = "button", disabled = false }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-(--second-color) text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
            {children}
        </button>
    )
}

export function SettingsToggle({ checked, onChange }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200
                ${checked ? "bg-(--second-color)" : "bg-(--bg-color) border border-(--text-color)/15"}`}
        >
            <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200
                    ${checked ? "translate-x-5" : "translate-x-0.5"} mt-0.5`}
            />
        </button>
    )
}

export function SettingsBadge({ children, variant = "default" }) {
    const styles = {
        default: "bg-(--bg-color) text-(--text-color)",
        success: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
        warning: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
        danger: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${styles[variant]}`}>
            {children}
        </span>
    )
}

export function SettingsFooter({ children }) {
    return (
        <div className="mt-auto border-t border-(--text-color)/8 px-6 md:px-8 py-4 flex justify-end bg-(--bg-color)/20">
            {children}
        </div>
    )
}
