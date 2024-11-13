"use client";

import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  placeholder: string;
  className?: string;
};

const SearchInput = ({ placeholder, className }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleInputChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <Input
      type="text"
      className={className}
      placeholder={placeholder}
      defaultValue={searchParams.get("q")?.toString()}
      onChange={(e) => handleInputChange(e.target.value)}
    />
  );
};

export default SearchInput;
