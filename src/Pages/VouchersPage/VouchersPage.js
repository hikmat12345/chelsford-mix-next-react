//libs
import { FAETabs, FAEText } from "@findanexpert-fae/components";
import { useParams } from "react-router";
import React from "react";

//src
import UserInfoPageLayout from "../UserInfoPageLayout";
import history from "../../history";
import ServicesVouchersPage from "../ServicesVouchersPage";
import GiftVouchersPage from "../GiftVouchersPage";
import PointsVouchersPage from "../PointsVouchersPage";

//scss
import "./VouchersPage.scss";
import ServicesVouchersDetailPage from "../ServicesVouchersDetailPage";
import GiftVouchersDetailPage from "../GiftVouchersDetailPage/GiftVouchersDetailPage";
import { getFileSrcFromPublicFolder } from "../../utils";
import VoucherHistoryPage from "../VoucherHistoryPage";

const VouchersPage = () => {
  document.title = `Chelsford | Your Vouchers`;
  const { vouchertype } = useParams();
  return (
    <>
      <UserInfoPageLayout>
        <div className="fae-vouchers-page-main-container" >
          <FAEText heading className="fae-manage-voucher-text"><span> <img src={getFileSrcFromPublicFolder("gift box.svg")} /></span> Manage Vouchers</FAEText>
          <FAETabs
            tabs={[
              {
                label: "Gift Voucher",
                value: "gift-voucher",
              },
              {
                label: "Service Voucher",
                value: "service-voucher",
              },
              {
                label: "⥀ History",
                value: "history",
              }
            ]}
            tabWidth="initial"
            value={vouchertype}
            getSelectedTab={(value) => history.push(`/your-vouchers/${value}`)}
            className={vouchertype}
          />
          {vouchertype === "service-voucher" && <ServicesVouchersPage />}
          {vouchertype === "gift-voucher" && <GiftVouchersPage/>}
          {vouchertype === "service-voucher-detail" && <ServicesVouchersDetailPage />}
          {vouchertype === "gift-voucher-detail" && <GiftVouchersDetailPage />}
          {vouchertype === "history" && <VoucherHistoryPage />}
           
        </div>
      </UserInfoPageLayout>
    </>
  );
};

export default VouchersPage;
