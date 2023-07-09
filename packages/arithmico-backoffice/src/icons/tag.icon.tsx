import { IconProps } from "./types";

export function TagIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height="48"
      width="48"
      className={className}
      aria-hidden
    >
      <path d="M559-97q-18 18-43.5 18T472-97L97-472q-10-10-13.5-21T80-516v-304q0-26 17-43t43-17h304q12 0 24 3.5t22 13.5l373 373q19 19 19 44.5T863-401L559-97Zm-41-41 304-304-378-378H140v304l378 378ZM245-664q21 0 36.5-15.5T297-716q0-21-15.5-36.5T245-768q-21 0-36.5 15.5T193-716q0 21 15.5 36.5T245-664ZM140-820Z" />
    </svg>
  );
}
