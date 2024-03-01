
import Image from 'next/image';
import SearchIcon from './../assets/icons/SearchIcon.svg'

const SearchBar = (props) => {
  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          type="text"
          placeholder={props.placeholder}
          value={props.value}
          className="w-[50%] min-h-[36px] text-sm pl-10 bg-white border border-[#6558F5] focus:border-4 focus:border-[#6558F5]"
        />
         <Image src={SearchIcon} alt='SearchIcon' className="absolute left-2 top-2 h-5 w-5"/>
      </div>
    </div>
  );
};

export default SearchBar;