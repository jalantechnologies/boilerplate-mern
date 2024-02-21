interface TourProviderStyles {
  popover: (base: React.CSSProperties) => React.CSSProperties;
  maskWrapper: (base: React.CSSProperties) => React.CSSProperties;
}

export const tourProviderStyles: TourProviderStyles = {
  popover: (base) => ({
    ...base,
    backgroundColor: 'transparent',
    borderRadius: 22,
    boxShadow: 'none',
    fontFamily: 'Roboto, sans-serif',
    marginTop: 0,
    padding: 0,
  }),
  maskWrapper: (base) => ({ ...base, opacity: 0.5 }),
};

export default tourProviderStyles;
