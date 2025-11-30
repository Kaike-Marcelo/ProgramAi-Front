import { CardStyleInterface } from "./type/card.types";

export const CARD_STYLES: Record<string, CardStyleInterface> = {
    default: {
        background: 'bg-base-200',
        border: 'bg-gradient-to-br from-primary via-accent/20 to-secondary',
        text: 'text-primary',
        size: 'w-40 h-70 sm:w-50 sm:h-50',
        icon: 'bg-gradient-to-br from-secondary/50 via-secondary/60 to-secondary bg-clip-text text-transparent drop-shadow-lg',
    },
    golden: {
        background: 'bg-base-200',
        border: 'bg-gradient-to-br from-[#F2994A] via-[#FFD200]/60 to-[#F2C94C]',
        text: 'bg-gradient-to-br from-[#F2994A] via-[#FFD200] to-[#F2C94C] bg-clip-text text-transparent',
        size: 'w-40 h-70 sm:w-50 sm:h-50',
    },
    royal: {
        background: 'bg-primary',
        border: 'bg-gradient-to-br from-secondary via-secondary/20 to-secondary',
        text: 'text-base-100',
        size: 'w-40 h-70 sm:w-50 sm:h-50',
        icon: 'text-base-100',
    }
}