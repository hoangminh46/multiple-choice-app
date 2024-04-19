interface Size {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

const size: Size = {
  xs: 374, // for small screen mobile
  sm: 575, // for mobile screen
  md: 767, // for tablets
  lg: 991, // for laptops
  xl: 1199, // for desktop / monitors
  xxl: 1399, // for big screens
};

export const device = {
  xs: `(max-width: ${size.xs}px)`,
  sm: `(max-width: ${size.sm}px)`,
  md: `(max-width: ${size.md}px)`,
  lg: `(max-width: ${size.lg}px)`,
  xl: `(max-width: ${size.xxl}px)`,
  xxl: `(max-width: ${size.xxl}px)`,
};
