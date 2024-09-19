import { useTonAddress } from '@tonconnect/ui-react';

export const WalletAddress = () => {
  const userFriendlyAddress = useTonAddress(); // Получаем user-friendly адрес
  const rawAddress = useTonAddress(false); // Получаем raw адрес

  return (
    <div>
      {userFriendlyAddress ? (
        <div>
          <p>User-friendly address: {userFriendlyAddress}</p>
          <p>Raw address: {rawAddress}</p>
        </div>
      ) : (
        <p>Wallet not connected</p>
      )}
    </div>
  );
};
