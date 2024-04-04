import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ContentWrapper } from 'components/layout';
import { Loading } from 'components/loading';
import {
  StyledSpace,
  StyledCollapse,
  StyledCollapsePanel,
  StyledButton,
} from 'styles/overrides';
import { CollapseHeader } from 'components/collapse';
import { CodeDownloadIcon } from 'assets/icons';
import { OrderInfo } from './components/OrderInfo';
import { OrderHeading } from './components/OrderHeading';
import { useOrder } from 'api/orderApi';
import { OrderFormDrawer } from './components/OrderFormDrawer';
import { NotFound } from '../../components/layout/NotFound';
import { forceBreadcrumbs } from 'store/slices/layoutSlice';
import { OrderInfoDetail } from './components';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
import { PATH_NAME } from 'constants/routes';
import { SendSMS } from './components/SendSMS';
import { OrderLabelToPrint } from './components/OrderLabelToPrint';
import { useReactToPrint } from 'react-to-print';

import { PrintOrder } from './components/PrintOrder';

export default function ViewOrder({ isOnlyView = false }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isLoading, refetch } = useOrder({ id });
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const printRef = useRef();
  // const [isLoadingPDF, setIsLoadingPDF] = useState(false);
  const printOrderLabelRef = useRef();
  const handlePrintOrderLabel = useReactToPrint({
    pageStyle: `
      @page {
        size: 148mm 105mm;
      }

      @media print {
        @page {
          size: a6 landscape;
          margin: 0mm !important;
        }
      }
    `,
    content: () => printOrderLabelRef.current,
  });
  const handlePrintOrder = useReactToPrint({
    pageStyle: `
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }

        thead {display: table-row-group !important;}


      }

      @page {
        size: portrait;
        margin: 0mm;
      }

    `,
    content: () => printRef.current,
  });

  useEffect(() => {
    dispatch(
      forceBreadcrumbs([
        {
          key: 'orderDetail',
          label: intl.formatMessage({ id: 'views.orders.title.detail' }),
        },
      ]),
    );
  }, [dispatch, intl]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data && !isLoading) {
    return <NotFound />;
  }

  // const handleDownloadPdf = async () => {
  //   // document: https://github.com/parallax/jsPDF/issues/434

  //   setIsLoadingPDF(true);
  //   const element = printRef.current;
  //   html2canvas(element, {
  //     scale: 2,
  //     useCORS: true,
  //   }).then((canvas) => {
  //     const imgWidth = 208;
  //     const pageHeight = 295;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     let heightLeft = imgHeight;
  //     let position = 0;
  //     heightLeft -= pageHeight;
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(
  //         canvas,
  //         'PNG',
  //         0,
  //         position,
  //         imgWidth,
  //         imgHeight,
  //         '',
  //         'FAST',
  //       );
  //       heightLeft -= pageHeight;
  //     }
  //     pdf.save(`order${data.code}.pdf`);
  //   });

  //   setIsLoadingPDF(false);
  // };

  const publicLink = `${window.location.origin}${PATH_NAME.CUSTOMER_ORDER}?code=${data.code}`;

  return (
    <>
      <ContentWrapper
        title={
          !isOnlyView && intl.formatMessage({ id: 'views.orders.title.detail' })
        }
        hasBorder
        style={{ padding: isOnlyView ? 30 : 0 }}
      >
        <OrderHeading
          orderId={data.code}
          status={data.status}
          extra={
            <StyledSpace size={24}>
              <StyledButton
                size="large"
                icon={<CodeDownloadIcon />}
                onClick={handlePrintOrderLabel}
              >
                {intl.formatMessage({ id: 'common.btn.downloadLable' })}
              </StyledButton>

              <StyledButton
                size="large"
                icon={<CodeDownloadIcon />}
                onClick={handlePrintOrder}
                // loading={isLoadingPDF}
              >
                {intl.formatMessage({ id: 'common.btn.downloadPDF' })}
              </StyledButton>

              {!isOnlyView && (
                <StyledButton
                  size="large"
                  type="primary"
                  onClick={() => setIsOpenDrawer(true)}
                >
                  {intl.formatMessage({ id: 'common.btn.edit' })}
                </StyledButton>
              )}
            </StyledSpace>
          }
        />

        <ContentWrapper>
          <StyledCollapse defaultActiveKey={[1, 2]} expandIconPosition="end">
            <StyledCollapsePanel
              header={
                <CollapseHeader
                  title={intl.formatMessage({
                    id: 'views.products.title.orderInfo',
                  })}
                />
              }
              key={1}
            >
              <OrderInfo
                livestreamDate={data.livestreamDate}
                orderAddress={data.orderAddress}
                paymentStatus={data.payment_status}
                noteAdmin={data.noteAdmin}
              />
            </StyledCollapsePanel>
            <StyledCollapsePanel
              header={
                <CollapseHeader
                  title={intl.formatMessage({
                    id: 'views.products.title.orderDetails',
                  })}
                />
              }
              key={2}
            >
              <OrderInfoDetail
                products={data.items}
                totalPrice={data.subTotal}
                currency={data.currency}
                note={data.note}
                code={data.code}
              />
            </StyledCollapsePanel>
          </StyledCollapse>
        </ContentWrapper>

        {!isOnlyView && (
          <StyledSpace
            size={14}
            style={{ justifyContent: 'flex-end', marginTop: 24 }}
          >
            <CopyToClipboard text={publicLink}>
              <StyledButton size="large" danger>
                {intl.formatMessage({ id: 'common.btn.shareLink' })}
              </StyledButton>
            </CopyToClipboard>

            <SendSMS
              phone={data?.orderAddress?.phone}
              code={data?.code}
              publicLink={publicLink}
              orderId={data?.id}
            />

            <StyledButton size="large">
              {intl.formatMessage({ id: 'common.btn.cancel' })}
            </StyledButton>
          </StyledSpace>
        )}

        {!isOnlyView && (
          <OrderFormDrawer
            open={isOpenDrawer}
            onClose={() => setIsOpenDrawer(false)}
            onSuccess={refetch}
            initialValues={data}
            canEdit
            title={data.id}
            id={data.id}
          />
        )}

        <OrderLabelToPrint
          ref={printOrderLabelRef}
          code={data.code}
          orderAddress={data.orderAddress}
        />
      </ContentWrapper>

      <PrintOrder
        code={data.code}
        status={data.status}
        livestreamDate={data.livestreamDate}
        orderAddress={data.orderAddress}
        paymentStatus={data.payment_status}
        noteAdmin={data.noteAdmin}
        products={data.items}
        totalPrice={data.subTotal}
        currency={data.currency}
        ref={printRef}
      />
    </>
  );
}
