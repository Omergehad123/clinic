"use client"

import { FiArrowUpRight } from "react-icons/fi"
import {
    SettingsPanel,
    SettingsSectionHeader,
    SettingsRow,
    SettingsValue,
    SettingsBadge,
    SettingsPrimaryButton,
    SettingsFooter,
} from "./SettingsUI"

const subscription = {
    currentPlan: "Professional",
    planLimits: "Up to 2,000 patients · 5 users · Advanced reports",
    renewalDate: "January 15, 2027",
    price: "399 EGP / month",
    status: "Active",
}

function SubscriptionTab() {
    return (
        <SettingsPanel>
            <SettingsSectionHeader
                title="Subscription"
                description="View your current plan, limits, and renewal details."
            />

            <SettingsRow
                label="Current plan"
                description="Your active subscription tier."
            >
                <div className="flex items-center gap-3">
                    <SettingsValue>{subscription.currentPlan}</SettingsValue>
                    <SettingsBadge variant="success">{subscription.status}</SettingsBadge>
                </div>
            </SettingsRow>

            <SettingsRow
                label="Billing"
                description="Monthly cost for your current plan."
            >
                <SettingsValue>{subscription.price}</SettingsValue>
            </SettingsRow>

            <SettingsRow
                label="Plan limits"
                description="Features and capacity included in your plan."
            >
                <SettingsValue>{subscription.planLimits}</SettingsValue>
            </SettingsRow>

            <SettingsRow
                label="Renewal date"
                description="Your subscription renews automatically on this date."
                isLast
            >
                <SettingsValue>{subscription.renewalDate}</SettingsValue>
            </SettingsRow>

            <SettingsFooter>
                <SettingsPrimaryButton>
                    <span className="inline-flex items-center gap-2">
                        Upgrade Plan
                        <FiArrowUpRight size={16} />
                    </span>
                </SettingsPrimaryButton>
            </SettingsFooter>
        </SettingsPanel>
    )
}

export default SubscriptionTab
