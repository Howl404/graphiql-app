export default function classnames(...args: string[]) {
  return args.filter(Boolean).join(' ');
}
