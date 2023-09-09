import { forwardRef, Ref } from "react";

import { CollapseProps } from "@appTypes/CollapseProps";

const Collapse = forwardRef(({ className, children, open }: CollapseProps, ref: Ref<HTMLDivElement>) => {
  return (
    <>
      {
        open
          ? <div className={`collapse ${className}`} ref={ref}>
              {children}
            </div>
          : null
      }
    </>
  )
})

Collapse.displayName = "Collapse";
export default Collapse;
