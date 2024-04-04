import { AddressItem } from './AddressItem';

export const AddressList = ({ addresses = [], defaultAddressId }) => {
  return (
    <div>
      {addresses.length > 0 &&
        addresses
          .map((address) => (
            <AddressItem
              key={address.id}
              address={address}
              isDefault={defaultAddressId === address.id}
            />
          ))
          .reverse()}
    </div>
  );
};
