"use client";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debounceValue = useDebounce(value, 700);

  useEffect(() => {
    const query = {
      title: debounceValue,
    };
    const url = qs.stringifyUrl({ url: "/search", query });
    router.push(url);
  }, [debounceValue, router]);

  return (
    <Input
      placeholder="What do you to want to listen to?"
      value={value}
      onChange={({ target }) => {
        setValue(target.value);
      }}
    />
  );
};

export default SearchInput;
