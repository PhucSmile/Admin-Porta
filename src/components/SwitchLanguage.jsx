import { useSelector, useDispatch } from 'react-redux';

import { LOCALE } from 'constants/common';
import { ButtonStyle } from './common/button';
import { VIIcon, ENICon } from 'assets/icons';
import { doSwitchLocale } from 'store/slices/appSlice';

const FLAG = {
  [LOCALE.VIETNAMESE]: VIIcon,
  [LOCALE.ENGLISH]: ENICon,
};

export default function SwitchLanguage() {
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.app.currentLocale);

  if (![LOCALE.ENGLISH, LOCALE.VIETNAMESE].includes(locale)) {
    return null;
  }

  const Icon = FLAG[locale];

  return (
    <div>
      <ButtonStyle
        icon={<Icon style={{ fontSize: 30 }} />}
        onClick={() =>
          dispatch(
            doSwitchLocale(
              locale === LOCALE.ENGLISH ? LOCALE.VIETNAMESE : LOCALE.ENGLISH,
            ),
          )
        }
        style={{ marginRight: 0 }}
      />
    </div>
  );
}
