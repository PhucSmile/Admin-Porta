import { BankTable } from 'components/bank';
import { useBankSettings } from 'api/bankSettingApi';
import _ from 'lodash';

export const OrderBankSetting = ({ banks }) => {
  const { data = [], isLoading } = useBankSettings({
    options: {
      enabled: _.isNil(banks),
    },
  });

  return <BankTable data={banks ?? data} isLoading={isLoading} />;
};
