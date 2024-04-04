import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { CardWrapper } from 'components/layout';
import { StyledButton } from 'styles/overrides';
import { CloseIcon } from 'assets/icons';

const StyledPaymentItem = styled(CardWrapper)`
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #b5b6ba;
  height: 100%;
  cursor: pointer;
  position: relative;

  .payment-item {
    display: flex;
    align-items: center;

    .image {
      position: relative;
      max-width: 89px;
      width: 100%;

      &::before {
        content: '';
        display: block;
        padding-top: 100%;
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .info {
      padding: 0 20px;
      color: var(--gray900);
      font-size: 16px;
      flex-grow: 1;

      .account-name {
        font-weight: 700;
        text-transform: uppercase;
      }

      .bank-branch {
        font-size: 12px;
        color: var(--gray500);
      }
    }
  }

  .delete-btn {
    position: absolute;
    top: 4px;
    right: 4px;
  }
`;

export const PaymentItem = ({ item, onClickDelete, onClickEdit }) => {
  const intl = useIntl();
  const { bankAccountOwner, bankBranch, bank } = item;

  return (
    <StyledPaymentItem>
      <div className="payment-item" onClick={onClickEdit}>
        <div className="image">
          <img src={bank?.logoUrl} alt="" />
        </div>

        <div className="info">
          <div className="account-name">{bankAccountOwner}</div>
          <div className="bank-name">
            {bank?.name} - {bank?.fullName}
          </div>
          <div className="bank-branch">
            {intl.formatMessage({ id: 'components.bank.branch' })}: {bankBranch}
          </div>
        </div>
      </div>

      <StyledButton
        icon={<CloseIcon />}
        className="delete-btn"
        onClick={onClickDelete}
      />
    </StyledPaymentItem>
  );
};
