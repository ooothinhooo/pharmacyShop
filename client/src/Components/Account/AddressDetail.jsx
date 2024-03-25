import React from "react";

const AddressDetail = (props) => {
  const { address } = props;
  return (
    <div className="grid gap-2 max-md:text-[16px] text-sm">
      <div className="grid grid-flow-col content-center items-center justify-start gap-2">
        <span className="break-words line-clamp-1 font-semibold">
          {address.name_user}
        </span>
        <span className="h-5 w-[1px] bg-neutral-300 max-md:hidden"></span>
        <span>{address.phone}</span>
      </div>
      <div>
        <span className="break-word mb-1 block flex-1">{address.address}</span>
        <span className="mb-1 flex space-x-2 md:mr-2">
          {address.default_address === 1 && (
            <span className="rounded-sm px-1 py-[2px] text-xs font-medium text-primaryColor bg-green-200">
              Mặc định
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default AddressDetail;
