const COLORS = {
  background: "#f6f7fb",
  surface: "#ffffff",
  primary: "#2d6cdf",
  primaryHover: "#1f56c7",
  textPrimary: "#1e1e1e",
  textSecondary: "#666666",
  textMuted: "#777777",
  textDark: "#333333",
  textSubtle: "#888888",
  border: "#dddddd",
  divider: "#e4e7ef",
  danger: "#e74c3c",
  transparent: "transparent",
  shadowSoft: "rgba(0, 0, 0, 0.05)",
  shadowCard: "rgba(0, 0, 0, 0.08)",
  appHeader: "#282c34",
  reactLink: "#61dafb",
  googleBlue: "#4285F4",
  googleGreen: "#34A853",
  googleYellow: "#FBBC05",
  googleRed: "#EA4335",
  github: "#333333",
};

export default COLORS;

export const colorVariables = {
  "--color-background": COLORS.background,
  "--color-surface": COLORS.surface,
  "--color-primary": COLORS.primary,
  "--color-primary-hover": COLORS.primaryHover,
  "--color-text-primary": COLORS.textPrimary,
  "--color-text-secondary": COLORS.textSecondary,
  "--color-text-muted": COLORS.textMuted,
  "--color-text-dark": COLORS.textDark,
  "--color-text-subtle": COLORS.textSubtle,
  "--color-border": COLORS.border,
  "--color-divider": COLORS.divider,
  "--color-danger": COLORS.danger,
  "--color-transparent": COLORS.transparent,
  "--color-shadow-soft": COLORS.shadowSoft,
  "--color-shadow-card": COLORS.shadowCard,
  "--color-app-header": COLORS.appHeader,
  "--color-react-link": COLORS.reactLink,
  "--color-google-blue": COLORS.googleBlue,
  "--color-google-green": COLORS.googleGreen,
  "--color-google-yellow": COLORS.googleYellow,
  "--color-google-red": COLORS.googleRed,
  "--color-github": COLORS.github,
};

if (typeof document !== "undefined") {
  Object.entries(colorVariables).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value);
  });
}
