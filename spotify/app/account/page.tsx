import getSongsByTitle from "@/actions/getSongsByTitle";
import AccountContent from "@/components/AccountContent";
import Header from "@/components/Header";
import SearchContent from "@/components/SearchContent";
import SearchInput from "@/components/SearchInput";

interface accountProps {
 
}

const Account: React.FC<accountProps> =  () => {
  
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
          <h1 className="text-white text-3xl font-semibold">Account</h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  );
};

export default Account;
