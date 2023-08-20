import { CollapseProps } from "@appTypes/CollapseProps";

export default function Collapse({ className, children, open }: CollapseProps) {
  return (
    <>
      {
        open
          ? <div className={`collapse ${className}`}>
              {children}
            </div>
          : null
      }
    </>
  )
}
