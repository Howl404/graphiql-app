import Themes from 'enums/themes';

export default function getBrowserTheme() {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme:dark)').matches
  ) {
    return Themes.Dark;
  }
  return Themes.Light;
}
