import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchContent from "@/components/SearchContent";
import SearchInput from "@/components/SearchInput";

interface searchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0

const Search = async ({ searchParams }: searchProps) => {
  const songs = await getSongsByTitle(searchParams.title);
  return (
    <div
      className="
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-y-auto
      overflow-hidden
  "
    >
      <Header className="bg-neutral-900">
        <div className="flex mb-2 flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
