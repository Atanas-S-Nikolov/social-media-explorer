import { RefObject } from "react";

import { useClickOutside } from "@react-hookz/web";

const useOutsideClick = (ref: RefObject<HTMLElement>, callback: EventListener, excludedRefs: RefObject<HTMLElement>[]) => {
  useClickOutside(ref, (event) => {
    excludedRefs.forEach(r => {
      const { target } = event;
      if (target && !r.current?.contains(target as Node)) {
        callback(event);
      }
    })
  })
}

export default useOutsideClick;
