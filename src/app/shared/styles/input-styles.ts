export const INPUT_STYLES = {
    default: {
        background: "bg-accent disabled:bg-primary",
        text: "text-base-100 disabled:text-base-300",
        border: "disabled:border-accent",
        label: "text-base-100",
        error: "text-red-300",
    },
    golden: {
        background: "bg-base-100 disabled:bg-base-300",
        text: "text-accent",
        border: "border-primary border-1 disabled:border-primary",
        label: "text-primary",
        error: "text-error",
    },
    darkNeutral: {
        background: "bg-primary/40 disabled:bg-neutral/50",
        text: "text-neutral-content disabled:text-neutral-content/50",
        border: "border-neutral-content/30 disabled:border-neutral-content/20",
        label: "text-neutral-content/70",
        error: "text-error",
    }
}